var fs = require('fs'),
    pkgcloud = require('pkgcloud')


var https = require('https'),
    cas;


require('ssl-root-cas').inject();

cas = https.globalAgent.options.ca;

// https.globalAgent.options.checkServerIdentity = function(host, cert) {
//     return undefined;
// }

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




// client.getContainer('dev.jiocloud.photos', function(err, container) {
//     console.log(err);
//     console.log(JSON.stringify(container))
// });


var options = {
    container: 'dev.jiocloud.photos',
    remote: 'testimage.jpg',
    contentType: 'application/image'
};

var readStream = fs.createReadStream('/Users/chetandev/Desktop/testimage.jpg');
var writeStream = client.upload(options);

writeStream.on('error', function(err) {
    console.log('uploading')
});

writeStream.on('success', function(file) {
    console.log('upload successful')
});

readStream.pipe(writeStream);