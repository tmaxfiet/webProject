import React from 'react';
import TopicTeaser from './TopicTeaser';
const axios = require('axios'); 

class TopicMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            topicNames: [],
        }
    }

    componentDidMount() {
        const urlString = window.location.protocol + "//" + window.location.hostname + ":3001/data/collectionNames";
        axios.get(urlString)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    topicNames: res.data,
                });
            })
            .catch( (err) => {
                console.log('Error in topic main get: ', err);
            })
    }

    render() {
        const { error, isLoaded, topicNames } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="topic-main">
                    {topicNames.map( (name) => (
                        <TopicTeaser topicName={name} key={name} />
                    ))}
                </div>
            );
        }
    }
}

export default TopicMain; 