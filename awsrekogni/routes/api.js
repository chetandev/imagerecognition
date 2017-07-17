// var express = require('express');
// var router = express.Router();
// var AWS = require('aws-sdk');
// var s3 = new AWS.S3({ "region": "us-west-2" });
// var rekognition = new AWS.Rekognition({ "region": "us-west-2" });
// var multer = require('multer')
// var multerS3 = require('multer-s3')
// var reBl = require('../rekognition.js')
// var redis = require('../redis.js');
// var _ = require('underscore');
// var Promise = require('bluebird')




var express = require('express');
var app = express();
var uploadController = require('../controller/uploadphotoscontroller.js');
var getController = require('../controller/getphotoscontroller.js');
var tagController = require('../controller/tagphotoscontroller.js');




app.use('/upload', uploadController);
app.use('/get', getController);
app.use('/tag/image', tagController);





module.exports = app;




