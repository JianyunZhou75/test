var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoURL ='mongodb://kanin1998:bergP028@ds041394.mongolab.com:41394/jzhdatabase';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('store', { title: 'Store', searchURL: process.env.SEARCH_URL, messageURL: process.env.MESSAGE_URL});
});




router.route('/message')
 .post(function (req, res, next) {
 txtMessage = (req.body.message || 'empty message');
 MongoClient.connect(mongoURL, function(err, db) {
 collection = db.collection('messages');

   
 console.log("Connected to database")
 
 collection.insert({'message': txtMessage}, {w: 1 }, function (err, item) {
 if (err) {
 console.log('Error storing message in database: ' + err);
 db.close();
 res.status(400).send('Error, unable to store message: ' + txtMessage);
 } else {
 db.close();
 console.log('Message stored ok in database: ' + txtMessage)
 res.status(200).send('Message stored: "' + txtMessage + '"');
 }
 db.close();
 }); 
 
 });
 
 });
 
 router.route('/search')
 .post(function (req, res, next) {
   
 reqMessage = (req.body.message || 'empty message');
 MongoClient.connect(mongoURL, function(err, db) {
 collection = db.collection('messages');
   
 console.log("Connected to database")
  
 collection.find({message: reqMessage}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
        res.status(200).send('Message found:"'+ reqMessage +'"' + 'Number: ' + result.length);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
        res.status(200).send('No Message found:"'+ reqMessage + '"');
        
      }
      db.close();
     
 
 }); 
 
 
 
 });
 
 });
 
 module.exports = router; 
 
 

/*
router.route('/message')
        .post(function(req,res,next){
          console.log('Receiving message:' + req.body.message);
          res.send('Message was:' + req.body.message);
        });*/

