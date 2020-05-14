import React from 'react';
import TopicTeaser from './TopicTeaser';
import SpotifyLogin from '../SpotifyPlayback/SpotifyLogin';
import { dbBaseUrl } from '../../Settings/constants';
const axios = require('axios'); 

class TopicMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            topicNames: [],
            token: '',
        }
    }

    componentDidMount() {
        const urlString = dbBaseUrl + "/data/collectionNames";
        axios.get(urlString)
            .then( (res) => {
                var newToken = '';
                if(this.props.location && this.props.location.state) {
                    newToken = this.props.location.state.token;
                }
                this.setState({
                    isLoaded: true,
                    topicNames: res.data,
                    token: newToken,
                });
            })
            .catch( (err) => {
                console.log('Error in topic main get: ', err);
            })
    }

    render() {
        const { error, isLoaded, topicNames, token } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div id="topic-main-loading">Loading...</div>;
        } else {
            return (
                <div id="topic-main">
                    <SpotifyLogin token={token} />
                    {topicNames.map( (name) => (
                        <TopicTeaser topicName={name} key={name} />
                    ))}
                </div>
            );
        }
    }
}

export default TopicMain; 