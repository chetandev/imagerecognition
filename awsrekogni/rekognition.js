var Promise = require('bluebird');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });


function searchFacesByImage(keyName) {

    return new Promise(function(resolve, reject) {
        var params = {
            CollectionId: process.env.COLLECTION,
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


function searchFaces(faceId) {

    return new Promise(function(resolve, reject) {
        rekognition.searchFaces({
            CollectionId: process.env.COLLECTION,
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


function indexFaces(keyName) {

    return new Promise(function(resolve, reject) {
        var params = {
            CollectionId: process.env.COLLECTION,
            DetectionAttributes: [],
            ExternalImageId: keyName,
            Image: {
                S3Object: {
                    Bucket: process.env.BucketName,
                    Name: keyName
                }
            }
        }
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
}





module.exports = { searchFacesByImage, indexFaces, searchFaces }
