var cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
var Promise = require('bluebird');
var client = new cassandra.Client({
    contactPoints: __config.CASSANDRA.ContactPoints,
    keyspace: __config.CASSANDRA.Keyspace,
    pooling: {
        coreConnectionsPerHost: {
            [distance.local]: __config.CASSANDRA.Pooling.Local,
            [distance.remote]: __config.CASSANDRA.Pooling.Remote
        }
    }
});



function executeQuery(query, args) {

    return new Promise(function(resolve, reject) {
        client.execute(query, args, { prepare: true }, function(err, result) {
            if (err) {
                reject(err); //internal server error 500
            } else {
                resolve(result);
            }
        });
    })

}


function put_in_cass(queries) {

    return new Promise(function(resolve, reject) {
        client.batch(queries, { prepare: true }, function(err, result) {
            if (err) {
                reject(err); //internal server error 500
            } else {
                resolve('batch success');
            }
        });
    })
}


function executeStremQuery(query, args) {

    return new Promise(function(resolve, reject) {
        var messages = [];
        client.eachRow(query, args, { prepare: true }, function(n, row) {
            messages.push(row);
        }, function(err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(messages)

            }
        })
    });
}


module.exports = {
    executeQuery: executeQuery,
    executeStremQuery: executeStremQuery,
    put_in_cass: put_in_cass
}
