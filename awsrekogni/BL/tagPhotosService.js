var cassandraDal = require(__base + '/dal/cassandraDal.js')
var errorConstants = require(__base + '/resources/errorconstants.js');
var Promise = require('bluebird');
var async = require('async');

const tagPhotosQuery = 'insert into unique_faces_by_users (user_id,face_id,contact_id) values (?,?,?)'

function tagPhotos(req){
    return new Promise(function(resolve, reject) {
        var userId = req.headers["x-user-id"]
        var faceId = req.headers["x-face-id"]
        var contactId = req.headers["x-contact-id"]

        params = [userId, faceId, contactId]
        query = tagPhotosQuery

        cassandraDal.executeQuery(query, params)
            .then(function(result) {
        
                resolve("success")
            })
            .catch(function(err) {
                var obj = { "errors": "Error while fetching data from cassandra", "code": errorConstants.ERROR_INTERNAL_SERVER_ERROR_FROM_CASSANDRA }
                reject(obj);
            })
    });
}

module.exports = {
    tagPhotos: tagPhotos
}
