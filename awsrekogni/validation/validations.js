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
    return new Promise(function(resolve, reject) {
        var userId = req.headers['x-user-id'];
        var faceId = req.headers['x-face-id'];
        var contactId = req.headers['x-contact-id'];

        if (userId && faceId && contactId) {
            resolve('passed');
        } else {
            if (!userId) {
                var obj = { "errors": ["user-id header missing"], "code": errorConstants.ERROR_CODE_X_USER_ID }
                reject(obj);
            }
            if (!faceId) {
                var obj = { "errors": ["face-id header missing"], "code": errorConstants.ERROR_CODE_X_FACE_ID }
                reject(obj);
            }
            if (!contactId) {
                var obj = { "errors": ["contact-id header missing"], "code": errorConstants.ERROR_CODE_X_CONTACT_ID }
                reject(obj);
            }
        }
    })
}



/**
 * @param  {[type]}
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
function validateUplaodHeaders(req) {
    return new Promise(function(resolve, reject) {

        var userId = req.headers['x-user-id'];
        var s3Key = req.headers['x-key-name'];
        var s3Bucket = req.headers['x-aws-bucket-name'];
        var s3Ext = req.headers['x-Extention-Name'];
        //console.log(userId + " " + s3Key + " " + s3Bucket)

        if (!userId) {
            var obj = { "errors": ["userId  header missing"], "code": errorConstants.ERROR_CODE_X_USER_ID }
            reject(obj)
        }

        if (!s3Key) {
            var obj = { "errors": ["s3 key  header missing"], "code": errorConstants.ERROR_CODE_X_S3_KEY }

            reject(obj)
        }
        if (!s3Bucket) {
            var obj = { "errors": ["s3 bucket  header missing"], "code": errorConstants.ERROR_CODE_X_S3_BUCKET }

            reject(obj)
        }
        // if (!s3Ext) {
        //     var obj = { "errors": ["extention  header missing"], "code": errorConstants.ERROR_CODE_X_EXT }

        //     reject(obj)
        // }
        resolve("passed");

    })
}




module.exports = {
    validateGetAllFacesHeaders,
    validateGetUniqueFacesHeaders,
    validateTagFacesHeaders,
    validateUplaodHeaders
}
