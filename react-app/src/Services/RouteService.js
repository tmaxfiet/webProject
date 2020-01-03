import React from 'react';
import { Route } from 'react-router-dom';
import TopicPage from '../Components/Topic/TopicPage';
import PromptRouteService from './PromptRouteService';
import Prompt from '../Components/Prompt/Prompt';

class RouteService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {topicPagesRoutes: [''], promptPagesRoutes: ['']};

        this.getTopicPageRoutes = this.getTopicPageRoutes.bind(this);
        this.getPromptPagesRoutes = this.getPromptPagesRoutes.bind(this);
    }
    
    componentDidMount() {
        this.getTopicPageRoutes();
    }

    // TODO replace hardcoded with pages received from backend
    getTopicPageRoutes() {
        // TODO replace hardcode
        const topicPagesList = ["History", "Science", "English"];

        const topicPagesRoutes = topicPagesList.map((topicName) =>
            <Route exact={true} path={"/" + topicName.toLowerCase()} key={topicName+"Route"}> 
                <TopicPage topicName={topicName} key={topicName} />
            </Route>
        );
        
        this.getPromptPagesRoutes(topicPagesList);
        
        this.setState({topicPagesRoutes: topicPagesRoutes});
    }

    getPromptPagesRoutes(topicPagesList) {
        let promptPagesRoutes = [];
        topicPagesList.map((topicName) => {
            //TODO fix hardcode response based on topicName
            const promptListResponse = [{title: "AwesomeRoute", prompt: "Awesome Route Prompt"},
            {title: "BetterRoute", prompt: "Better Route"}];
  
            let partialPromptPagesRoutes = promptListResponse.map((prompt) =>
                <Route exact={true} path={"/" + topicName.toLowerCase() + "/" + prompt.title} key={topicName+prompt.title+"Route"}> 
                    <Prompt title={prompt.title} prompt={prompt.prompt} key={topicName+"_"+prompt.title} />
                </Route>
            );
            promptPagesRoutes.push(partialPromptPagesRoutes);
        });

        this.setState({promptPagesRoutes: promptPagesRoutes });
    }

    render() {
        return (
            <div>
                {this.state.topicPagesRoutes}
                {this.state.promptPagesRoutes}
                
                <Route exact={true} path="/history/AwesomeRoute"> 
                    <div>hellllalsdlsad</div>
                </Route>
            </div>
        );
    }
}

export default RouteService;