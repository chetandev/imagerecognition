var Promise = require('bluebird');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });
var cassandraDal = require(__base + '/dal/cassandraDal.js');
var reBl = require(_base + '/rekognition.js');

const queryAll = `insert  into unique_faces_by_users (user_id,face_id,bounding_box,url)
values (?,?,?,?);
`
const queryUnique = `insert  into unique_faces_by_users (user_id,face_id,bounding_box,url)
values (?,?,?,?);
`


function processIndexResult(result, headers, s3url) {

    return new Promise(function(resolve, reject) {
        var _queries = [];
        var arr = result.FaceRecords;

        if (arr.length > 0) {
            Promise.each(arr, function(item) {
                    var faceId = item.Face.FaceId;
                    var boundingBox = item.Face.BoundingBox;
                    var allqueryParams = [headers["x-user-id"], faceId, boundingBox, s3url];
                    _queries.push({ query: queryAll, params: allqueryParams });
                    return reBl.searchFaces(faceId)
                        .then(function(result) {
                            var matchedFacesArr = result.FaceMatches;

                            if (matchedFacesArr.length == 0) {
                                var uniqueQueryParams = [headers["x-user-id"], faceId, boundingBox, s3url]
                                _queries.push({ query: queryUnique, params: uniqueQueryParams });
                            }
                        })
                        .catch(function(err) {
                            reject(err)
                        })

                })
                .then(function() {
                    return cassandraDal.put_in_cass(_queries)

                }).then(funciton(result) {
                    resolve("success")
                })
                .catch(function(err) {
                    reject(err)
                })

        } else {
            reject(new Error("no face was found in the image"))

        }
    })
}


module.exports = { processIndexResult }
