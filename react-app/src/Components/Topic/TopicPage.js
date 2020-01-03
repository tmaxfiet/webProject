import React from 'react';
import PromptList from '../Prompt/PromptList';

class TopicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {topicName: ''};
    }

    componentDidMount() {
        this.setState({topicName: 'test'});
    }

    render() {
        return (
            <div> HELLo
                <PromptList topicName={this.props.topicName} />
            </div>
        );
    }

}

export default TopicPage;