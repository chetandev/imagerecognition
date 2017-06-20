var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });

// Create a bucket and upload something into it
var bucketName = 'mayank1';



rekognition.indexFaces({
    CollectionId: "mayank",
    DetectionAttributes: [],
    ExternalImageId: "mayank",
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: 'mayank.jpg'
        }
    }
}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);
})


rekognition.indexFaces({
    CollectionId: "swati",
    DetectionAttributes: [],
    ExternalImageId: "swati",
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: 'swati.jpg'
        }
    }
}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);
})
