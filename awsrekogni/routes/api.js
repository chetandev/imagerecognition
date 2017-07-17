var express = require('express');
var app = express();
var uploadController = require('../controller/uploadphotoscontroller.js');
var getController = require('../controller/getphotoscontroller.js');
var tagController = require('../controller/tagphotoscontroller.js');




app.use('/upload', uploadController);
app.use('/get', getController);
app.use('/tag/image', tagController);





module.exports = app;




