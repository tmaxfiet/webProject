import React from 'react';
import TopicTeaser from './TopicTeaser';

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
        console.log('mounted ', `${this.props.baseUrl}`);
        fetch("http://localhost:3001/data/collectionInfos")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                isLoaded: true,
                items: result.items
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }

    render() {
        return (
            <div id="topic-main">
                <TopicTeaser topicName="History" />
                <TopicTeaser topicName="Science" />
                <TopicTeaser topicName="English" />
            </div>
        );
    }
}

export default TopicMain; 