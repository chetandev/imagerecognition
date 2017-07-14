var cassandraDal = require(__base + '/dal/cassandraDal.js')
var errorConstants = require(__base + '/resources/errorconstants.js');
var Promise = require('bluebird');
var async = require('async');

const getPhotosListQuery = 'select url as "url" from all_photos_by_users where user_id=? and face_id in ?';

function getPhotosList(req, faceids) {
    return new Promise(function(resolve, reject) {
        var userId = req.headers["x-user-id"]
        params = [userId, faceids]

        var faces = [];

        cassandraDal.executeQuery(query, params)
            .then(function(result) {
                async.each(result.rows, function(row, next) {
                    faces.push({ "url": row.url });
                    next();
                }, function(err, result) {
                    resolve({ "faces": faces });
                });

            })
            .catch(function(err) {
                var obj = { "errors": "Error while fetching data from cassandra", "code": errorConstants.ERROR_INTERNAL_SERVER_ERROR_FROM_CASSANDRA }
                reject(obj);
            })
    });
}

module.exports = {
    getPhotosList: getPhotosList
}
