'use strict'

var redis = require("redis");
var client = redis.createClient({ db: process.env.REDIS_DATABASE });
var Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);


client.on("error", function(err) {
    console.log("Error on redis connection" + err);
});


client.on('connect', function() {
    console.log('redis connected');
});


function obj() {

    //strings start ////////////////////////////////////////////////////////////////////////
    //set object in string 
    this.setSobj = function(key, elem, expire) {
        if (elem) {
            client.setAsync(key, elem)
                .then(function(result) {
                    console.log(result);
                })
                .then(function() {
                    if (expire) {
                        client.expire(key, expire);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };

    //get item from string 
    this.getSobj = function(key) {
        return new Promise(function(resolve, reject) {
            client.getAsync(key)
                .then(function(result) {
                    console.log(result);
                    resolve(result);
                })
                .catch(function(err) {
                    console.log(err);
                    reject(err);
                });
        });
    };

    //get Multiple object from string 
    this.getMSobj = function(args) {
        return new Promise(function(resolve, reject) {
            client.mgetAsync(args)
                .then(function(result) {
                    resolve(result);
                })
                .catch(function(err) {
                    console.log(err);
                    reject(err);
                });
        });
    };


    //strings End////////////////////////////////////////////////////////////////////////


    //hash start ////////////////////////////////////////////////////////////////////////
    //set hash 
    this.setHobj = function(key, elem) {
        return new Promise(function(resolve, reject) {
            if (elem) {
                client.HMSETAsync(key, elem)
                    .then(function(result) {
                        console.log(result)
                        resolve(result);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            }
        })
    };

    //get hash 
    this.getHobj = function(key) {
        return new Promise(function(resolve, reject) {
            client.hgetallAsync(key)
                .then(function(result) {
                    resolve(result);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };




    //get multiple hash // 
    this.getMHobj = function(args, prefix) {
        return new Promise(function(resolve, reject) {

            multi = client.multi();
            args.forEach(function(item) {
                console.log(item);
                var key = prefix + item;
                multi.hgetall(key);
            });
            // drains multi queue and runs atomically
            multi.exec(function(err, replies) {
                if (err)
                    reject(err);
                resolve(replies);
            });
        });
    };

    //hash end ////////////////////////////////////////////////////////////////////////



    //list start  ////////////////////////////////////////////////////////////////////////
    //push in a list 
    this.lpush = function(listname, listitem) {
        client.lpush([listname, listitem], function(err, reply) {
            console.log(reply);
        });
    };

    //get all item from list 
    this.lrange = function(listname) {
        client.lrange(listname, 0, -1, function(err, reply) {
            console.log(reply);
        });
    };
    //list end ////////////////////////////////////////////////////////////////////////




    //sets Start ////////////////////////////////////////////////////////////////////////
    //operation related to sets 

    this.sadd = function(key, elem) {
        if (elem) {

            client.sadd(key, elem, function(err, reply) {
                console.log(reply);
            });
        }
    };

    this.srem = function(key, value) {
        client.SREM(key, value, function(er, reply) {
            console.log(reply);
        });
    };



    this.smembers = function(key) {


        client.smembers(key, function(err, reply) {
            console.log(reply);
        });

    };

    this.sinter = function(args) {
        return new Promise(function(resolve, reject) {
            console.log(args);
            client.sinterAsync(args)
                .then(function(results) {
                    resolve(results);
                })
                .catch(function(err) {
                    console.log(err);
                    reject(err);
                });
        });
    };

    //sets end  ////////////////////////////////////////////////////////////////////////



    //sorted sets start ////////////////////////////////////////////////////////////////////////

    this.zadd = function(key, elem, score) {
        if (elem) {

            client.zadd(key, score, elem, function(err, reply) {
                console.log(reply);
            });
        }
    };

    this.zrevrangebyscore = function(key) {

        client.zrevrangebyscore(key, '+inf', '-inf', function(err, reply) {
            console.log(reply);
        });

    };

    this.zrange = function(key, startIndex, endIndex) {

        return new Promise(function(resolve, reject) {
            client.zrangeAsync(key, startIndex, endIndex)
                .then(function(result) {
                    resolve(result);
                })
                .catch(function(err) {
                    reject(err);
                });
        });


    };

    this.zinterstore = function(args) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var tempKey = "tmp_finalResult" + Date.now();
            var cmd = [tempKey, args.length];
            client.zinterstoreAsync(cmd.concat(args).concat(['AGGREGATE', 'MAX']))
                .then(function(result) {
                    resolve(tempKey);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    this.zrangebyscore = function(args) {
        return new Promise(function(resolve, reject) {
            var startScore = args[1];
            var endScore = args[2];
            if (startScore == '-inf' && endScore == '+inf') {
                resolve(null);

            } else {

                client.zrangebyscoreAsync(args)
                    .then(function(result) {
                        //console.log(result);
                        resolve(result);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            }
        });

    };


    //sorted set end  ////////////////////////////////////////////////////////////////////////



    //pubsub  start  ////////////////////////////////////////////////////////////////////////

    //publish to pub in a channel
    this.publish = function(channel, message) {
        client.publish(channel, message);
    };

    //subscriber  to pub in a channel
    this.subscribe = function(channel) {

        client.subscript(channel);
    };

    //pubsub  end  ////////////////////////////////////////////////////////////////////////



    //delete key 
    this.deleteKey = function(key) {
        client.del(key);
    };

    //expire a key 
    this.expireKey = function(key, time) {
        client.expire(key, time);
    };


    this.notify = function(channel, message) {
        this.lpush('notificationsList', message);
        this.publish(channel, message);
    };



    this.getClient = function() {
        return client;
    };


}

module.exports = new obj();
