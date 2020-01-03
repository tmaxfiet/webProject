import React from 'react';
import { Route } from 'react-router-dom';
import Prompt from '../Components/Prompt/Prompt';

class PromptRouteService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {promptListRoutes: ['']};

        this.getPromptRoutes = this.getPromptRoutes.bind(this);
    }
    
    componentDidMount() {
        this.getPromptRoutes();
    }

    // TODO replace hardcoded with prompts received from backend
    getPromptRoutes() {
        // TODO replace hardcode
        // Prompt consists of structure {title: '', prompt: ''}
        const promptListResponse = [{title: "AwesomeRoute", prompt: "Awesome Route Prompt"},
          {title: "BetterRoute", prompt: "Better Route"}];

        const promptListRoutes = promptListResponse.map((prompt) =>
            <Route exact={true} path={"/" + this.props.topicName.toLowerCase() + "/" + prompt.title} key={this.props.topicName+prompt.title+"Route"}> 
                <Prompt title={prompt.title} prompt={prompt.prompt} key={this.props.topicName+"_"+prompt.title} />
            </Route>
        );

        this.setState({promptListRoutes: promptListRoutes});
    }

    render() {
        return (
            <div>
                {this.state.promptListRoutes}
            </div>
        );
    }
}

export default PromptRouteService;