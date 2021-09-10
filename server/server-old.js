//Server setup
// import express from 'express';
// import devBundle from './devBundle'; //only meant for development mode; should be commented for production
// import path from 'path';
// import { MongoClient } from 'mongodb';
// import template from '../template';

// const app = express();

// devBundle.compile(app); //only meant for development mode; should be commented for production

// const CURRENT_WORKING_DIR = process.cwd();
// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));


// app.get('/', (req, res) => {
//     res.status(200).send(template());
// })


// let port = process.env.PORT || 5000;
// app.listen(port, function onStart(err) {
//     if (err) {
//     console.log(err);
//     }
//     console.info('Server started on port %s.', port);
// })


// //To connect your Node server to MongoDB
// const url = process.env.MONGODB_URI ||
//     'mongodb://localhost:27017/Bachat-app' 
//     MongoClient.connect(url, (err, db)=>{
//     console.log("Connected successfully to mongodb server");
//     db.close();        // - gives error
// })
