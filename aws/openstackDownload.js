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



var options = {

    container: 'dev.jiocloud.photos', // this can be either the name or an instance of container
    remote: 'testimage.jpg', // name of the new file
};




var myFile = fs.createWriteStream('/Users/chetandev/Desktop/downloaded.jpg');

client.download(options, function(err, result) {
    console.log(JSON.stringify(result))
}).pipe(myFile);