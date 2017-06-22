// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });

// Create a bucket and upload something into it
var bucketName = 'mayank1';

// rekognition.searchFacesByImage({
//     CollectionId: "mayank",
//     FaceMatchThreshold: 50,
//     Image: {
//         S3Object: {
//             Bucket: bucketName,
//             Name: '1498037383439'
//         }
//     },
//     MaxFaces: 5
// }, function(err, data) {

//     console.log(JSON.stringify(data));
//     data.FaceMatches.forEach(function(item) {
//         var keyName = item.Face.ExternalImageId;
//         console.log(keyName)

//     });
// })


rekognition.searchFaces({
    CollectionId: "mayank",
    FaceId: "2ffac292-622c-5496-a543-7e4cc22e4960",
    FaceMatchThreshold: 60,
    MaxFaces: 5
}, function(err, data) {
    console.log(JSON.stringify(data));
    // data.FaceMatches.forEach(function(item) {
    //     var keyName = item.Face.ExternalImageId;
    //     console.log(keyName)

    // });
})
