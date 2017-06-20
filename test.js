const request = require('request')
request.post({
    url: 'http://localhost:3000/test',
    headers: { "Content-Type": "application/x-www-form-urlencoded"},
    body: { "userid": 'cris', "gameid": '12' },
    json:true

  
},function(err,res){

	console.log(res)
})