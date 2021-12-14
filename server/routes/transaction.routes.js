import express from 'express'
import transactionCtrl from '../controllers/transaction.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/transactions/current/preview')
  .get(authCtrl.requireSignin, transactionCtrl.currentMonthPreview);

router.route('/api/transactions/by/category')
  .get(authCtrl.requireSignin, transactionCtrl.transactionByCategory);

router.route('/api/transactions')
  .post(authCtrl.requireSignin, transactionCtrl.create)
  .get(authCtrl.requireSignin, transactionCtrl.listByUser);

router.route('/api/transactions/:transactionId')
  .put(authCtrl.requireSignin, transactionCtrl.hasAuthorization, transactionCtrl.update)
  .delete(authCtrl.requireSignin, transactionCtrl.hasAuthorization, transactionCtrl.remove);

router.param('transactionId', transactionCtrl.transactionByID);

//reports
router.route('/api/transactions/plot')
  .get(authCtrl.requireSignin, transactionCtrl.plotTransactions);

router.route('/api/transactions/category/averages')
  .get(authCtrl.requireSignin, transactionCtrl.averageCategories);

router.route('/api/transactions/yearly')
  .get(authCtrl.requireSignin, transactionCtrl.yearlyTransactions);


export default router;