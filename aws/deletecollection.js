var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });

// Create a bucket and upload something into it
// var bucketName = 'mayank1';
// var keyName = 'mayank1.jpg';
// var bodystream = fs.createReadStream('/Users/chetandev/Desktop/mayank.jpeg');




 rekognition.deleteCollection({
  
  CollectionId: "mayank"
 }, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   /*
   data = {
    StatusCode: 200
   }
   */
 });

 // rekognition.deleteCollection({
 //  CollectionId: "swati"
 // }, function(err, data) {
 //   if (err) console.log(err, err.stack); // an error occurred
 //   else     console.log(data);           // successful response
 //   /*
 //   data = {
 //    StatusCode: 200
 //   }
 //   */
 // });