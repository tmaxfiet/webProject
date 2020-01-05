import React from 'react';
import { Link } from 'react-router-dom';
import './PromptTeaser.css';

class PromptTeaser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="prompt-teaser">
                <Link to={`/${this.props.topicName.toLowerCase()}/${this.props.title}`} key={this.props.topicName+"_"+this.props.title}> 
                    <div>{this.props.title}</div>
                </Link>
                <div>{this.props.prompt}</div>
            </div>
        );
    }
}

export default PromptTeaser; 