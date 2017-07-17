var express = require('express');
var router = express.Router();
var validationBl = require(__base + '/validation/validations.js');
var errorConstants = require(__base + '/resources/errorconstants.js');
var reBl = require(__base + '/rekognition.js')
var uploadBl = require(__base + '/BL/uploadservice.js')



router.post('/v1', function(req, res, next) {

    validationBl.validateUplaodHeaders(req)
        .then(function() { //returns nothing 
            return reBl.indexFaces(req.headers) //indexes the faces in s3 image
        })
        .then(function(result) {
            var url = process.env.S3_HOST + '/' + req.headers["x-aws-bucket-name"] + '/' + req.headers["x-key-name"];
            return uploadBl.processIndexResult(result, req.headers, url)
        })
        .then(function() {
            res.send("success")
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).send(err)
        })
});


module.exports = router;
