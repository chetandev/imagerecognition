var unirest = require("unirest");

var req = unirest("GET", "http://api.imagga.com/v1/tagging");

req.query({
  "url": "https://dhei5unw3vrsx.cloudfront.net/images/skateboard_resized.jpg",
  "version": "2"
});

req.headers({
  "authorization": "Basic YWNjXzRkZGFkNTJmMGQ4ZTc0OTphODAwNzAxYTVlZmQzOWYwMzEwYzRlOWZiY2Q2ZTFkZQ==",
  "accept": "application/json"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(JSON.stringify(res.body));
});