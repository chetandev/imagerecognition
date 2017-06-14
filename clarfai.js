var Clarifai = require('clarifai');
var app = new Clarifai.App(
    'ZJCgykjFtvow3K6yxlo1B_WIOd66cGx5DRIRs36f',
    'CE8GYqber9I6grnhoaby0Ztxzoqf7K8LZ6RECHar'
);

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://static.pexels.com/photos/7823/selfie.jpg').then(
    function(response) {
        console.log(JSON.stringify(response));
    },
    function(err) {
        console.error(err);
    }
);
