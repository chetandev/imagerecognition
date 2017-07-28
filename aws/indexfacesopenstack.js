var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
// Create an S3 client
var s3 = new AWS.S3({ "region": "us-west-2" });
var rekognition = new AWS.Rekognition({ "region": "us-west-2" });

// Create a bucket and upload something into it
var bucketName = 'mayank1';


var pkgcloud = require('pkgcloud');


var https = require('https'),
    cas;

var Stream = require('stream')
var toArray = require('stream-to-array')
require('ssl-root-cas').inject();

cas = https.globalAgent.options.ca;


cas.push(fs.readFileSync('ca.pem'));

var client = require('pkgcloud').storage.createClient({
    provider: 'openstack',
    username: 'snw_app',
    password: 'snw@1234',
    strictSSL: false,
    authUrl: 'https://10.135.165.21:5000',
    tenantName: 'ConsCloud-switchNwalk-Dev',
    tenantId: '0d4c383a4350439d913e4c6d62b7bc39',
    region: 'RegionOne',
});

var options = {

    container: 'dev.jiocloud.photos', // this can be either the name or an instance of container
    remote: 'swati.jpg', // name of the new file
};



var data = [];
var img =  client.download(options);


img.on('data', function(chunk) {
   data.push(chunk)
});

img.on('end',function(){
   
rekognition.indexFaces({
        CollectionId: "mayank",
        DetectionAttributes: [],
        ExternalImageId: "swati",
        Image:{
                   Bytes: Buffer.concat(data)
              }
    }, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(JSON.stringify(data));
    })


});
