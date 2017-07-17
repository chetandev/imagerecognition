var express = require('express');
var router = express.Router();
var validationBl = require(__base + '/validation/validations.js');
var errorConstants = require(__base + '/resources/errorconstants.js');
var reBl = require(__base + '/rekognition.js')
var getAllPhotos = require(__base + '/bl/getPhotosService.js');
var Promise = require('bluebird')

//var logger = require('../logger.js')

router.get('/faces/by/faceid/v1', validationBl.validateGetAllFacesHeaders, function(req, res) {
    var faceMatches = [];
    reBl.searchFaces(req.headers['x-face-id'])
        .then(function(result) {
            var matchedFacesArr = result.FaceMatches;
            if (matchedFacesArr.length > 0) {

                Promise.each(matchedFacesArr, function(item) {
                        var faceId = item.Face.FaceId

                        faceMatches.push(faceId)
                    }).then(function(allItems) {
                        //console.log(faceMatches)
                        return getAllPhotos.getPhotosList(req, faceMatches)
                    })
                    .then(function(result) {
                        res.status(200).send(result);
                    })
                    .catch(function(err) {
                        res.status(500).send(err);
                    })

            } else {
                res.status(200).send({ "faces": [] })
            }

        })
        .catch(function(err) {
            console.log(err)
            var obj = { "errors": err.message, "code": errorConstants.ERROR_FROM_AWS }
            res.status(500).send(err)
        })

});

router.get('/uniquefaces/v1', validationBl.validateGetUniqueFacesHeaders, function(req, res) {
    getAllPhotos.getUniquePhotos(req)
        .then(function(result) {
            res.status(200).send(result);
        })
        .catch(function(err) {
            res.status(500).send(err);
        })
});


module.exports = router;
