// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });

// Create a bucket and upload something into it
var bucketName = 'mayank1';







rekognition.searchFacesByImage({
    CollectionId: "mayank",
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: 'targetSwati.jpg'
        }
    },
    MaxFaces: 5
}, function(err, data) {

     console.log('swati in mayank collection')
     console.log(JSON.stringify(data));
})


rekognition.searchFacesByImage({
    CollectionId: "swati",
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: 'targetSwati.jpg'
        }
    },
    MaxFaces: 5
}, function(err, data) {
    console.log('swati in swati collection')
     console.log(JSON.stringify(data));
})


rekognition.searchFacesByImage({
    CollectionId: "mayank",
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: 'targetMayank.jpg'
        }
    },
    MaxFaces: 5
}, function(err, data) {
   console.log('mayank in mayank collection')
     console.log(JSON.stringify(data));
})


rekognition.searchFacesByImage({
    CollectionId: "swati",
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: 'targetMayank.jpg'
        }
    },
    MaxFaces: 5
}, function(err, data) {
   console.log('mayank in swati collection')
     console.log(JSON.stringify(data));
})

