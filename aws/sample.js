/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });

// Create a bucket and upload something into it
var bucketName = 'mayank1';
var keyName = 'mayank1.jpg';
var bodystream = fs.createReadStream('/Users/chetandev/Desktop/mayank.jpeg');


// s3.createBucket({ Bucket: bucketName }, function() {
//     var params = {
//         Bucket: bucketName,
//         Key: keyName,
//         Body: bodystream,
//         Metadata: {
//             'Content-Type': 'image/jpeg'
//         }
//     };
//     s3.putObject(params, function(err, data) {
//         if (err)
//             console.log(err)
//         else {

//             console.log('image uploaded successfully')

//         }
//     });
// });


var rekParams = {

    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: keyName,
        },

    },

    //MaxLabels: 123,
    MinConfidence: 0

};

//objects
// rekognition.detectLabels(rekParams, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response

// });

//adult 
// rekognition.detectModerationLabels(rekParams, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response

// });




// var params = {
//     CollectionId: "mayank",
//     DetectionAttributes: [],
//     ExternalImageId: "mayank",
//     Image: {
//         S3Object: {
//             Bucket: bucketName,
//             Name: keyName
//         }
//     }
// };
// rekognition.indexFaces(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data);
// })

// rekognition.listCollections({}, function(err, data) {
//             if (err) console.log(err, err.stack); // an error occurred
//             else console.log(data); // successful response

//  });
//  
//  
// var params = {
//     CollectionId: "mayank",
//     MaxResults: 20
// };
// rekognition.listFaces(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data);
// });



var params = {
    CollectionId: "mayank",
    FaceMatchThreshold: 95,
    Image: {
        S3Object: {
            Bucket: bucketName,
            Name: keyName
        }
    },
    MaxFaces: 5
};
rekognition.searchFacesByImage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);
})
