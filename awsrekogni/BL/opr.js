var Promise = require('bluebird');
var redis = require('../redis.js');



function postS3(files) {
    return new Promise(function(resolve, reject) {

        var key = files.key;
        var location = files.location;
        redis.setHobj("paths", [key, location])
            .then(function(result) {
                resolve(result)

            })
            .catch(function(err) {
                reject(err)
            })

    })
}






module.exports = { postS3 }
