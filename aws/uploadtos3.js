var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });


var bucketName = 'mayank1';


var mayank = fs.createReadStream('/Users/chetandev/Desktop/mayank/IMG_0349.jpg');

var swati = fs.createReadStream('/Users/chetandev/Desktop/swati/DSC01415.jpg');


var targetSwati = fs.createReadStream('/Users/chetandev/Desktop/swati/IMG_0438.jpg');

var targetMayank = fs.createReadStream('/Users/chetandev/Desktop/mayank/IMG_0384.jpg');


s3.createBucket({ Bucket: bucketName }, function() {
    var params = {
        Bucket: bucketName,
        Key: 'mayank.jpg',
        Body: mayank,
        Metadata: {
            'Content-Type': 'image/jpeg'
        }
    };
    s3.putObject(params, function(err, data) {
        if (err)
            console.log(err)
        else {

            console.log('mayank image uploaded successfully')

        }
    });
});


s3.createBucket({ Bucket: bucketName }, function() {
    var params = {
        Bucket: bucketName,
        Key: 'swati.jpg',
        Body: swati,
        Metadata: {
            'Content-Type': 'image/jpeg'
        }
    };
    s3.putObject(params, function(err, data) {
        if (err)
            console.log(err)
        else {

            console.log('swati image uploaded successfully')

        }
    });
});


s3.createBucket({ Bucket: bucketName }, function() {
    var params = {
        Bucket: bucketName,
        Key: 'targetSwati.jpg',
        Body: targetSwati,
        Metadata: {
            'Content-Type': 'image/jpeg'
        }
    };
    s3.putObject(params, function(err, data) {
        if (err)
            console.log(err)
        else {

            console.log('swati image uploaded successfully')

        }
    });
});

s3.createBucket({ Bucket: bucketName }, function() {
    var params = {
        Bucket: bucketName,
        Key: 'targetMayank.jpg',
        Body: targetMayank,
        Metadata: {
            'Content-Type': 'image/jpeg'
        }
    };
    s3.putObject(params, function(err, data) {
        if (err)
            console.log(err)
        else {

            console.log('swati image uploaded successfully')

        }
    });
});