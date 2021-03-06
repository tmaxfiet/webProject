import React from 'react';
import axios from 'axios';
import { dbBaseUrl } from '../../Settings/constants';
import spotifyService from '../../Services/SpotifyService';

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
        if (spotifyService.login_access_token) {
          this.setState( {
            token: spotifyService.login_access_token
          })

          this.player = new window.Spotify.Player({
            name: "Study Noise Player",
            getOAuthToken: cb => { cb(this.state.token); },
          });
          this.createEventHandlers();

          this.player.connect();
          }
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.selectedSong !== prevProps.selectedSong) {
        // A song selection changed, switch to this song
        axios.put( dbBaseUrl + "/spotify/start", {uris: [this.props.selectedSong], device_id: this.state.deviceId, login_token: spotifyService.login_access_token } ).then( (res) => {
          console.log('New song selected: ', this.props.selectedSong);
        })
        .catch( (err) => {
          console.log('Error starting spotify: ', err);
        })
      }
    
      if (this.props.paused !== prevProps.paused) {
        if(this.props.paused) {
          this.stopPlaying();
        }
      }
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
    
    }

    startPlayingAll() {
      axios.put( dbBaseUrl + "/spotify/start", {uris: this.props.uris, device_id: this.state.device_i, login_token: spotifyService.login_access_token } ).then( (res) => {

      })
      .catch( (err) => {
        console.log('Error starting spotify: ', err);
      })
    }

    stopPlaying() {
      axios.post( dbBaseUrl + "/spotify/stop", {login_token: spotifyService.login_access_token }).then( (res) => {
        
      })
      .catch( (err) => {
        console.log('Error stopping spotify: ', err);
      })
    }

    render() {
        return (
            <div id="spotify-playback" ref={el => (this.div = el)}>
            </div>
        )
    }
}

export default SpotifyPlayback; 