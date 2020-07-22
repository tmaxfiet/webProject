import { dbBaseUrl } from '../Settings/constants';

const axios = require('axios');

const SpotifyService = {
    login_access_token: '',

    getPlaylistsBySearch(searchKeyword) {
        return new Promise((resolve, reject) => {
            axios.get(`${dbBaseUrl}/spotify/playlistsBySearch?keyword=${searchKeyword}&login_token=${this.login_access_token}`)
            .then( (res) => {
                resolve(res.data);
            })
            .catch( (err) => {
                reject({});
            })
        });
    },

    getTracksByPlaylistId(playlistId) {
        return new Promise((resolve, reject) => {
            axios.get(`${dbBaseUrl}/spotify/tracksByPlaylistId?id=${playlistId}&login_token=${this.login_access_token}`)
            .then( (res) => {
                resolve(res.data);
            })
            .catch( (err) => {
                reject({});
            })
        });
    },

    getAudioAnalysisByTrack(trackId) {
        return new Promise((resolve, reject) => {
            axios.get(`${dbBaseUrl}/spotify/audioAnalysisByTrackId?id=${trackId}&login_token=${this.login_access_token}`)
            .then( (res) => {
                resolve(res.data);
            })
            .catch( (err) => {
                reject({});
            })
        });
    }
}

export default SpotifyService;