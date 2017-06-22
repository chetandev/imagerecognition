var redis = require('./redis.js');



redis.getSingleHvalue("paths","05370cfb-40c2-5572-a2b0-58947309ac44").then(function(result) {

    console.log(result)
})


