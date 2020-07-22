const express = require('express');
const cors = require('cors');
const router = express.Router();
    
const request = require('request'); // "Request" library

const qs = require('querystring');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret

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
        // spotify returns access token, send it back
        res.send(body.access_token);
    } else {
        res.send('Error Spotify Callback');
        console.log(`Error at spotify/callback`);
    }
  });
});

router.put('/start', express.json(), (req, res) => {
  res.send(
    new Promise((resolve, reject) => {
      // use the access token to access the Spotify Web API
      var token = req.body.login_token;
      var uris = req.body.uris;
      var device_id = req.body.device_id;
      var options = {
        url: `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
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
      var token = req.body.login_token;
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