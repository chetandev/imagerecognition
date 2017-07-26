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



client.getFile('dev.jiocloud.photos', 'testimage.jpg', function(err, file) {

    rekognition.indexFaces({
        CollectionId: "mayank",
        DetectionAttributes: [],
        ExternalImageId: "mayank",
        Byte: new Buffer(JSON.stringify(file))
    }, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(JSON.stringify(data));
    })
})