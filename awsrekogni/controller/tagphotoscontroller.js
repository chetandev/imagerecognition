var express = require('express');
var router = express.Router();
var validationBl = require(__base + '/validation/validations.js');
var errorConstants = require(__base + '/resources/errorconstants.js');
var validationBl = require(__base + '/validation/validations.js');
var reBl = require(__base + '/rekognition.js')
var tagPhoto = require(__base + '/bl/tagPhotosService.js');


//var logger = require('../logger.js')

router.post('/v1', function(req, res) {
    validationBl.validateTagFacesHeaders(req)
        .then(function(result) {
            return tagPhoto.tagPhotos(req)
                .then(function(result) {
                    res.status(200).send(result)
                })
                .catch(function(err) {
                    res.status(500).send(err);
                })
        })
        .catch(function(err) {
            res.status(400).send(err);
        })
});


module.exports = router;
