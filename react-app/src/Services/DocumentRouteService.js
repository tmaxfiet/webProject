import React from 'react';
import { Route } from 'react-router-dom';
const axios = require('axios');

class DocumentRouteService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            documents: [],
            documentRoutes: [],
        }

        this.setDocumentRoutes = this.setDocumentRoutes.bind(this);
    }
    
    componentDidMount() {
        this.setDocumentRoutes();
    }

    setDocumentRoutes() {
        // Get all
        const urlString = window.location.protocol + "//" + window.location.hostname + `:3001/data/${this.props.genreName.toLowerCase()}`;
        axios.get(urlString)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    documents: res.data,
                });
                const documentRoutes = this.state.documents.map((document) =>
                    <Route exact={true} path={"/" + this.props.genreName.toLowerCase() + "/" + document.name} key={this.props.genreName+document.name+"Route"}> 
                       <div> temp TODO</div>
                    </Route>
                );
                this.setState({documentRoutes: documentRoutes});
            })
            .catch( (err) => {
                console.log('Error in topic main get: ', err);
            })
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="document-service-container">
                    {this.state.documentRoutes}
                </div>
            );
        }
    }
}

export default DocumentRouteService;