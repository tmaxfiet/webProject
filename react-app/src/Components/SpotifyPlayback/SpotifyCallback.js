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
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);
        const adjToken = parsed.code;
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