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



/**
 * @param  {[type]}
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
function validateUplaodHeaders(req) {
    return new Promise(function(resolve, reject) {
        var userId = req.headers['x-user-id'];
        var s3Key = req.headers['X-Key-Name'];
        var s3Bucket = req.headers['X-Aws-Bucket-Name'];
        var s3Ext = req.headers['X-Extention-Name'];

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
        if (!s3Ext) {
            var obj = { "errors": ["extention  header missing"], "code": errorConstants.ERROR_CODE_X_EXT }

            reject(obj)
        }
        resolve("passed");

    })
}




module.exports = {
    validateGetAllFacesHeaders,
    validateUplaodHeaders
}
