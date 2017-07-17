var Promise = require('bluebird');
var errorConstants = require(__base + '/resources/errorconstants.js');
var async = require('async');


/**
 * @param  {[type]}
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
function validateGetAllFacesHeaders(req, res, next) {
    var userId = req.headers['x-user-id'];
    var faceId = req.headers['x-face-id'];

    if (userId && faceId) {
        next();
    } else {
        if (!userId)
            var obj = { "errors": ["user-id header missing"], "code": errorConstants.ERROR_CODE_X_USER_ID }
        if (!faceId)
            var obj = { "errors": ["face-id header missing"], "code": errorConstants.ERROR_CODE_X_FACE_ID }
        res.status(400).send(obj);
    }
}

function validateGetUniqueFacesHeaders(req, res, next) {
    var userId = req.headers['x-user-id'];

    if (userId) {
        next();
    } else {
        var obj = { "errors": ["user-id header missing"], "code": errorConstants.ERROR_CODE_X_USER_ID }
        res.status(400).send(obj);
    }
}

function validateTagFacesHeaders(req) {
    var userId = req.headers['x-user-id'];
    var faceId = req.headers['x-face-id'];
    var contactId = req.headers['x-contact-id'];

    if (userId && faceId && contactId) {
        resolve();
    } else {
        if (!userId) {
            var obj = { "errors": ["user-id header missing"], "code": errorConstants.ERROR_CODE_X_USER_ID }
            reject(obj);
        }
        if (!faceId){
            var obj = { "errors": ["face-id header missing"], "code": errorConstants.ERROR_CODE_X_FACE_ID }
            reject(obj);
        }
        if (!contactId){
            var obj = { "errors": ["contact-id header missing"], "code": errorConstants.ERROR_CODE_X_CONTACT_ID }
            reject(obj);
        }
    }
}



module.exports = {
    validateGetAllFacesHeaders
    validateGetUniqueFacesHeaders
    validateTagFacesHeaders
}