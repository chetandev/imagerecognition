var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });
var multer = require('multer')
var multerS3 = require('multer-s3')
var reBl = require('../rekognition.js')
var redis = require('../redis.js');






var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BucketName,
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        },
        contentType: function(req, file, cb) {
            cb(null, 'image/jpeg')
        },
        acl: 'public-read'
    })
})



router.post('/upload', upload.any(), function(req, res, next) {

    var s3Key = req.files[0].key;
    var s3Location = req.files[0].location;
    return reBl.indexFaces(s3Key)
        .then(function(result) {
            var arr = result.FaceRecords;
            if (arr.length > 0) {
                arr.forEach(function(item) {

                    var faceId = item.Face.FaceId;
                    redis.setHobj("paths", [faceId, s3Location])
                    reBl.searchFaces(faceId)
                        .then(function(result) {
                            var matchedFacesArr = result.FaceMatches;

                            if (matchedFacesArr.length == 0) {
                                redis.setHobj("upaths", [faceId, s3Location])
                            }


                        })
                        .catch(function(err) {
                            console.log(err)
                            res.status(500).send(err)
                        })

                });
                res.send(s3Location);
            } else {
                res.status(500).send("no face was found in the image")

            }
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).send(err)
        })

});


router.get('/getsimilarimages/:faceId', function(req, res, next) {
    var faceMatches = [];
    reBl.searchFaces(req.params.faceId)
        .then(function(result) {
            var matchedFacesArr = result.FaceMatches;
            if (matchedFacesArr.length > 0) {
                matchedFacesArr.forEach(function(item) {
                    var faceId = item.Face.FaceId

                    redis.getSingleHvalue("paths", faceId)
                        .then(function(result) {
                            faceMatches.push(result);
                        });
                })
                res.send(faceMatches);
            } else {
                res.status(500).send("no similar face was found with the given faceId")
            }
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).send(err)
        })
});





// router.post('/upload', upload.any(), function(req, res, next) {

//     bl.postS3(req.files[0])
//         .then(function(result) {
//             console.log('uploaded to s3')
//             return reBl.searchFacesByImage(req.files[0].key)
//         })
//         .then(function(result) {
//             console.log('search by images to collection ')
//             var faceNum = result.FaceMatches.length;
//             console.log('length of matched faces ' + faceNum)
//             if (faceNum > 0) {
//                 result.FaceMatches.forEach(function(item) {
//                     var matcheKeyName = item.Face.ExternalImageId;
//                     return redis.sadd(matcheKeyName, req.files[0].location)
//                 });

//             } else {

//                 return reBl.indexFaces(req.files[0].key).then(function(result) {
//                     console.log('indexed to collection')
//                     return redis.sadd(req.files[0].key, req.files[0].location)
//                 })
//             }
//         })
//         .then(function(result) {

//             res.send("success")
//         })
//         .catch(function(err) {
//             console.log(err)
//             res.status(500).send(err)
//         })
// });


module.exports = router;
