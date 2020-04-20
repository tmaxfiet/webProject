import React from 'react';
import axios from 'axios';

class SpotifyLogin extends React.Component {
    constructor(props) {
        super(props);

        this.loginRedirect = this.loginRedirect.bind(this);
    }

    componentDidMount() {
        console.log('spotifylogin ', this.props.token)
    }

    loginRedirect() {
        const urlString = window.location.protocol + "//" + window.location.hostname + ":3001/spotify/redirectUri";
        axios.get(urlString, {
            params: {
                currUri: window.location.pathname,
            }
            }).then( (res) => {
                window.location = res.data;
            })
            .catch( (err) => {
                console.log('Error in playlist main get: ', err);
            })
    }

    render() {
        if(!this.props.token) {
            return (
                <div id="spotify-playback" ref={el => (this.div = el)}> 
                    <button onClick={this.loginRedirect}>Login for the full experience!</button>
                </div>
            )
        } else {
            return (
                <div>{this.props.token}</div>
            )
        }
    }
}

export default SpotifyLogin; 