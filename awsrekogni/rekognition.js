var Promise = require('bluebird');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });


function searchFacesByImage(keyName, collectionName) {

    return new Promise(function(resolve, reject) {
        var params = {
            CollectionId: collectionName,
            FaceMatchThreshold: 90,
            Image: {
                S3Object: {
                    Bucket: process.env.BucketName,
                    Name: keyName
                }
            }
        };
        rekognition.searchFacesByImage(params, function(err, data) {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(data)
                resolve(data)
            }
        })
    })
}


function searchFaces(faceId, collectionName) {

    return new Promise(function(resolve, reject) {
        rekognition.searchFaces({
            CollectionId: collectionName,
            FaceId: faceId,
            FaceMatchThreshold: 70
        }, function(err, data) {

            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(JSON.stringify(data));
                resolve(data)
            }
        })

    })
}


function indexFaces(headers) {

    return new Promise(function(resolve, reject) {
        var params = {
            CollectionId: headers["x-user-id"],
            DetectionAttributes: [],
            Image: {
                S3Object: {
                    Bucket: headers["x-aws-bucket-name"],
                    Name: headers["x-key-name"]
                }
            }
        }

        checkCollection(headers["x-user-id"]).then(function() {

            rekognition.indexFaces(params, function(err, data) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    console.log(data)
                    resolve(data)
                }
            })
        })
    })
}



function checkCollection(name) {
    return new Promise(function(resolve, reject) {

        rekognition.createCollection({
            CollectionId: name,
        }, function(err, data) {
            resolve("created");
        })

    })
}


module.exports = { searchFacesByImage, indexFaces, searchFaces }
