import Transaction from '../models/transaction.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import mongoose from 'mongoose'


const create = async (req, res) => {
  try {
    req.body.recorded_by = req.auth._id;
    const transaction = new Transaction(req.body);
    await transaction.save()
    return res.status(200).json({
      message: "Transaction recorded!"
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

const transactionByID = async (req, res, next, id) => {
    try {
      let transaction = await Transaction.findById(id).populate('recorded_by', '_id name').exec();
      if (!transaction)
        return res.status('400').json({
          error: "Transaction record not found"
        });
      req.transaction = transaction;
      next();
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
}

const read = (req, res) => {
    return res.json(req.transaction);
}

const listByUser = async (req, res) => {
  let firstDay = req.query.firstDay;
  let lastDay = req.query.lastDay;
  try {
    let transactions = await Transaction.find({'$and':[{'incurred_on':{'$gte': firstDay, '$lte':lastDay}}, {'recorded_by': req.auth._id}]}).sort('incurred_on').populate('recorded_by', '_id name');
    res.json(transactions);
  } catch (err){
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

//1.
const currentMonthPreview = async (req, res) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  const typeOfTransaction = req.query.type ;

  const today = new Date();
  today.setUTCHours(0,0,0,0);
  
  const tomorrow = new Date();
  tomorrow.setUTCHours(0,0,0,0);
  tomorrow.setDate(tomorrow.getDate()+1);
  
  const yesterday = new Date();
  yesterday.setUTCHours(0,0,0,0);
  yesterday.setDate(yesterday.getDate()-1);
  
  try {
    let currentPreview = await Transaction.aggregate([
      {
          $facet: { month: [
                              { $match : { transactionType: typeOfTransaction, incurred_on : { $gte : firstDay, $lt: lastDay }, recorded_by: mongoose.Types.ObjectId(req.auth._id)}},
                              { $group : { _id : "currentMonth" , total:  {$sum: "$amount"} } },
                            ],
                    today: [
                      { $match : { incurred_on : { $gte : today, $lt: tomorrow }, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
                      { $group : { _id : "today" , total:  {$sum: "$amount"} } },
                    ],
                    yesterday: [
                      { $match : { incurred_on : { $gte : yesterday, $lt: today }, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
                      { $group : { _id : "yesterday" , total:  {$sum: "$amount"} } },
                    ]
                  }
      }])
    let transactionPreview = {month: currentPreview[0].month[0], today: currentPreview[0].today[0], yesterday: currentPreview[0].yesterday[0] };
    res.json(transactionPreview);
  } catch (err){
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

// 2.
const transactionByCategory = async (req, res) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  const typeOfTransaction = req.query.type;

  try {
    let categoryMonthlyAvg = await Transaction.aggregate([
      {
        $facet: {
            average: [
              { $match : { transactionType: typeOfTransaction, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
              { $group : { _id : {category: "$category", month: {$month: "$incurred_on"}}, totalSpent:  {$sum: "$amount"} } },
              { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent"}}},
              {
                  $project: {
                    _id: "$_id", value: {average: "$avgSpent"},
                  }
              }
            ],
            total: [
              { $match : { transactionType: typeOfTransaction, incurred_on : { $gte : firstDay, $lte: lastDay }, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
              { $group : { _id : "$category", totalSpent:  {$sum: "$amount"} } },
              {
                $project: {
                  _id: "$_id", value: {total: "$totalSpent"},
                }
              }
            ]
        }
      },
      {
        $project: {
          overview: { $setUnion:['$average','$total'] },
        }
      },
      {$unwind: '$overview'},
      {$replaceRoot: { newRoot: "$overview" }},
      { $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" } } }
    ]).exec();
    res.json(categoryMonthlyAvg);
  } catch (err){
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

// 3.a
const averageCategories = async (req, res) => {
  const firstDay = new Date(req.query.firstDay);
  const lastDay = new Date(req.query.lastDay);
  const typeOfTransaction = req.query.type;

  try {
    let categoryMonthlyAvg = await Transaction.aggregate([
      { $match : { transactionType: typeOfTransaction, incurred_on : { $gte : firstDay, $lte: lastDay }, recorded_by: mongoose.Types.ObjectId(req.auth._id)}},
      { $group : { _id : {category: "$category"}, totalSpent:  {$sum: "$amount"} } },
      { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent"}}},
      { $project: {x: '$_id', y: '$avgSpent'}}
    ]).exec();
    res.json({monthAVG:categoryMonthlyAvg});
  } catch (err){
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

// 3.b
const yearlyTransactions = async (req, res) => {
  const y = req.query.year;
  const typeOfTransaction = req.query.type;
  const firstDay = new Date(y, 0, 1);
  const lastDay = new Date(y, 12, 0);
  //console.log("type - "+typeOfTransaction)
  try {
    let totalMonthly = await Transaction.aggregate([
      { $match: { transactionType: typeOfTransaction, incurred_on: { $gte : firstDay, $lt: lastDay } , recorded_by: mongoose.Types.ObjectId(req.auth._id) } },
      { $group: { _id: {$month: "$incurred_on"}, totalSpent:  {$sum: "$amount"} } },
      { $project: {x: '$_id', y: '$totalSpent'}}
    ]).exec();
    //console.log(totalMonthly)
    res.json({monthTotal:totalMonthly});
  } catch (err){
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

//3.c
const plotTransactions = async (req, res) => {
  const date = new Date(req.query.month), y = date.getFullYear(), m = date.getMonth();
  const typeOfTransaction = req.query.type;
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  try {
    let totalMonthly = await Transaction.aggregate([
      { $match: { transactionType: typeOfTransaction, incurred_on: { $gte : firstDay, $lt: lastDay }, recorded_by: mongoose.Types.ObjectId(req.auth._id) }},
      { $project: {x: {$dayOfMonth: '$incurred_on'}, y: '$amount'}}
    ]).exec();
    res.json(totalMonthly);
  } catch (err){
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

  const update = async (req, res) => {
    try {
      let transaction = req.transaction;
      transaction = extend(transaction, req.body);
      transaction.updated = Date.now();
      await transaction.save();
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  }
  
const remove = async (req, res) => {
  try {
    let transaction = req.transaction;
    let deletedTransaction = await transaction.remove();
    res.json(deletedTransaction);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

const hasAuthorization = (req, res, next) => {
  const authorized = req.transaction && req.auth && req.transaction.recorded_by._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    });
  }
  next();
}

export default {
  create,
  transactionByID,
  read,
  currentMonthPreview,
  transactionByCategory,
  averageCategories,
  yearlyTransactions,
  plotTransactions,
  listByUser,
  remove,
  update,
  hasAuthorization
}