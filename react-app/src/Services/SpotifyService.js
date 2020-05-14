import { dbBaseUrl } from '../Settings/constants';

const axios = require('axios');

export async function getPlaylistsBySearch(searchKeyword) {
    return new Promise((resolve, reject) => {
        axios.get(`${dbBaseUrl}/spotify/playlistsBySearch?keyword=${searchKeyword}`)
        .then( (res) => {
            resolve(res.data);
        })
        .catch( (err) => {
            reject({});
        })
    });
}

export async function getTracksByPlaylistId(playlistId) {
    return new Promise((resolve, reject) => {
        axios.get(`${dbBaseUrl}/spotify/tracksByPlaylistId?id=${playlistId}`)
        .then( (res) => {
            resolve(res.data);
        })
        .catch( (err) => {
            reject({});
        })
    });
}

export async function getAudioAnalysisByTrack(trackId) {
    return new Promise((resolve, reject) => {
        axios.get(`${dbBaseUrl}/spotify/audioAnalysisByTrackId?id=${trackId}`)
        .then( (res) => {
            resolve(res.data);
        })
        .catch( (err) => {
            reject({});
        })
    });
}
