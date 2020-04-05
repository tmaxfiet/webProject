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

export async function getPlaylistsBySearch(searchKeyword) {
    return new Promise((resolve, reject) => {
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // use the access token to access the Spotify Web API
                var token = body.access_token;
                var options = {
                    url: `https://api.spotify.com/v1/search?query=${searchKeyword}&type=playlist`,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                };
                request.get(options, function (error, response, body) {
                    resolve(body);
                });
            }
            else {
                reject(`Error in getPlaylistsBySearch" ${searchKeyword}`);
            }
        });
    });
}

export async function getTracksByPlaylistId(playlistId) {
    return new Promise((resolve, reject) => {
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // use the access token to access the Spotify Web API
                var token = body.access_token;
                var options = {
                    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                };
                request.get(options, function (error, response, body) {
                    resolve(body);
                });
            }
            else {
                reject(`Error in getTracksByPlaylistID: ${playlistId}`);
            }
        });
    });
}
