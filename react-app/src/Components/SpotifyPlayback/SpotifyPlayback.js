import React from 'react';
import axios from 'axios';

class SpotifyPlayback extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          token: ''
        }

        this.startPlayingAll = this.startPlayingAll.bind(this);
        this.stopPlaying = this.stopPlaying.bind(this);
        this.createEventHandlers = this.createEventHandlers.bind(this);
    }

    componentDidMount() {
      if (window.Spotify !== null) {
        const urlString = window.location.protocol + "//" + window.location.hostname + ":3001/spotify/authToken";
        axios.get(urlString)
          .then( (res) => {
              if (res.data !== '') {
                this.setState( {
                  token: res.data
                })
                this.player = new window.Spotify.Player({
                  name: "New Spotify Player",
                  getOAuthToken: cb => { cb(this.state.token); },
                });
                this.createEventHandlers();

                this.player.connect();
              }
          })
          .catch( (err) => {
              console.log('Error in spotify playback get: ', err);
          });
      }
    }

    componentDidUpdate() {
      // A song selection changed, switch to this song
      axios.put( window.location.protocol + "//" + window.location.hostname + ":3001/spotify/start", {uris: [this.props.selectedSong]} ).then( (res) => {

      })
      .catch( (err) => {
        console.log('Error starting spotify: ', err);
      })
    }

    createEventHandlers() {
      // problem setting up the player
      this.player.on('initialization_error', e => { console.error(e); });
      // problem authenticating the user.
      // either the token was invalid in the first place,
      // or it expired (it lasts one hour)
      this.player.on('authentication_error', e => {
        console.error(e);
      });
      // currently only premium accounts can use the API
      this.player.on('account_error', e => { console.error(e); });
      // loading/playing the track failed for some reason
      this.player.on('playback_error', e => { console.error(e); });
    
      // Playback status updates
      this.player.on('player_state_changed', state => this.onStateChanged(state));
    
      // Ready
      this.player.on('ready', async data => {
        let { device_id } = data;
        console.log("Spotify Player Loaded Succesfully! Yeaaa baby!");
        // set the deviceId variable, then let's try
        // to swap music playback to *our* player!
        await this.setState({ deviceId: device_id });
      });
    }

    onStateChanged(state) {
      console.log('onStateChanged from spotifyPlayback: ', state);
    }

    startPlayingAll() {
      console.log('all ', this.props.uris);
      axios.put( window.location.protocol + "//" + window.location.hostname + ":3001/spotify/start", {uris: this.props.uris} ).then( (res) => {

      })
      .catch( (err) => {
        console.log('Error starting spotify: ', err);
      })
    }

    stopPlaying() {
      axios.post( window.location.protocol + "//" + window.location.hostname + ":3001/spotify/stop").then( (res) => {
        
      })
      .catch( (err) => {
        console.log('Error stopping spotify: ', err);
      })
    }

    render() {
        return (
            <div id="spotify-playback" ref={el => (this.div = el)}>
                <button onClick={this.startPlayingAll}> CLICK TO START </button>
                <button onClick={this.stopPlaying}> CLICK TO PAUSE </button>
            </div>
        )
    }
}

export default SpotifyPlayback; 