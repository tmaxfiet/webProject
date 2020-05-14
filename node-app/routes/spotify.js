const express = require('express');
const cors = require('cors');
const router = express.Router();
    
const request = require('request'); // "Request" library

const qs = require('querystring');

var client_id = '5c21721d72e3461dbf5ea7b48e51da7f'; // Your client id
var client_secret = '2174abe7db37474b8ad67e509fb221dc'; // Your secret
var login_access_token = '';

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

router.use(cors());

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
              res.send(body);
            });
        } else {
          res.send('Error at spotify base');
        }
    });
});

router.get('/redirectUri', cors(), (req, res) => {
  var scopes = 'streaming user-read-email user-read-private user-modify-playback-state';
  res.send('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent('http://localhost:3000/spotify/callback'))
});

router.post('/callback', express.json(), express.urlencoded({ extended: true }), (req, res) => {
  var authLoginOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'authorization_code',
      code: req.body.token,
      redirect_uri: 'http://localhost:3000/spotify/callback',
    },
    json: true
  };
  request.post(authLoginOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        // spotify returns access token, save it
        login_access_token = body.access_token;
        console.log('access_token successful! ', login_access_token);
    } else {
        console.log(`Error at spotify/callback`);
    }
  });
  res.send('ok');
});

router.get('/authToken', (req, res) => {
  res.send(login_access_token);
});

router.put('/start', express.json(), (req, res) => {
  res.send(
    new Promise((resolve, reject) => {
      // use the access token to access the Spotify Web API
      var token = login_access_token;
      var uris = req.body.uris;
      var options = {
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: {
          uris: uris,
        },
        json: true
      };
      request.put(options, function(error, response, body) {
        if (error) {
          console.error('Error spotify.js: ', error);
          reject(error);
        }
        resolve(body);
      });
    })
  );
})

router.post('/stop', (req, res) => {
  res.send(
    new Promise((resolve, reject) => {
      // use the access token to access the Spotify Web API
      var token = login_access_token;
      var options = {
        url: `https://api.spotify.com/v1/me/player/pause`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.put(options, function(error, response, body) {
        resolve(body);
      });
    })
  );
})

router.get('/playlistsBySearch', (req, res) => {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
          url: `https://api.spotify.com/v1/search?query=${req.query.keyword}&type=playlist`,
          headers: {
              'Authorization': 'Bearer ' + token
          },
          json: true
      };
      request.get(options, function (error, response, body) {
          res.send(body)
      });
    }
    else {
        res.send(`Error in get PlaylistsBySearch" ${req.query.keyword}`);
    }
  });
})

router.get('/tracksByPlaylistId', (req, res) => {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/playlists/${req.query.id}/tracks`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function (error, response, body) {
          res.send(body)
      });
    }
    else {
        res.send(`Error in get tracksByPlaylistId" ${req.query.id}`);
    }
  });
})

router.get('/audioAnalysisByTrackId', (req, res) => {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/audio-analysis/${req.query.id}`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function (error, response, body) {
          res.send(body)
      });
    }
    else {
        res.send(`Error in get tracksByPlaylistId" ${req.query.id}`);
    }
  });
})

module.exports = router;