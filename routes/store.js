var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoURL ='mongodb://kanin1998:bergP028@ds041394.mongolab.com:41394/jzhdatabase';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('store', { title: 'Store', messageURL: process.env.MESSAGE_URL});
});

module.exports = router; 

router.route('/message')
 .post(function (req, res, next) {
 var txtMessage = (req.body.message || 'empty message');
 MongoClient.connect(mongoURL, function(err, db) {
 console.log("Connected to database");
 db.collection('messages').insert({'message': txtMessage}, {w: 1 }, function (err, item) {
 if (err) {
 console.log('Error storing message in database: ' + err);
 db.close();
 res.status(400).send('Error, unable to store message: ' + txtMessage);
 } else {
 db.close();
 console.log('Message stored ok in database: ' + txtMessage)
 res.status(200).send('Message stored: "' + txtMessage + '"');
 }
 }); }); });


/*
router.route('/message')
        .post(function(req,res,next){
          console.log('Receiving message:' + req.body.message);
          res.send('Message was:' + req.body.message);
        });*/

