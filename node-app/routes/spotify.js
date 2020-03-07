const express = require('express');

const router = express.Router();
    
const request = require('request'); // "Request" library

var client_id = '5c21721d72e3461dbf5ea7b48e51da7f'; // Your client id
var client_secret = '2174abe7db37474b8ad67e509fb221dc'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

router.get('/', (req, res) => {
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
            url: 'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };
            request.get(options, function(error, response, body) {
                console.log(body);
                res.send(body);
            });
        } else {
            res.send('Error at spotify base');
        }
    });
});

module.exports = router;