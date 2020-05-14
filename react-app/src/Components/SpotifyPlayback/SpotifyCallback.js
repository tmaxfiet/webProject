import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { dbBaseUrl } from '../../Settings/constants';

class SpotifyCallback extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        console.log('sdfsd ', window.location.search)
        console.log('Spotify Callback, token: ', window.location.search.substring(6))
        const adjToken = window.location.search.substring(6)
        const urlString = dbBaseUrl + "/spotify/callback";
        axios.post(urlString, {token: adjToken} )
            .then( (res) => {
                this.setState({token: adjToken});
            })
            .catch( (err) => {
                console.log('Error in spotify callback post: ', err);
            })
    }

    render() {
        if (this.state.token !== '') {
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { token: this.state.token }
                    }}
                />
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default SpotifyCallback; 