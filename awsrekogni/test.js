var redis = require('./redis.js');



redis.getHobj("test").then(function(result) {

    console.log(result)
})
