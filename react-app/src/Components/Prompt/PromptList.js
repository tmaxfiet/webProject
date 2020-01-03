import React from 'react';
import PromptTeaser from './PromptTeaser.js';

class PromptList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {promptList: ['']};

        this.getPrompts = this.getPrompts.bind(this);
    }

    componentDidMount() {
        this.getPrompts();
    }

    getPrompts() {
        //TODO get prompts from backend, 
        // Prompt consists of structure {title: '', prompt: ''}
        const promptListResponse = [{title: "AwesomeRoute", prompt: "Awesome Route Prompt"},
        {title: "BetterRoute", prompt: "Better Route"}];

        const promptList = promptListResponse.map((prompt) =>
            <PromptTeaser topicName={this.props.topicName} title={prompt.title} prompt={prompt.prompt} key={this.props.topicName+"_"+prompt.title} />
        );

        this.setState({promptList: promptList});
    }

    render() {
        return (
            <div>
                {this.state.promptList}
            </div>
        );
    }
}

export default PromptList; 