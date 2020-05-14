import React from 'react';
import { Route } from 'react-router-dom';
import PlaylistMain from '../Components/Playlist/PlaylistMain';
import { dbBaseUrl } from '../Settings/constants';
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
        const urlString = dbBaseUrl + `/data/${this.props.genreName.toLowerCase()}`;
        axios.get(urlString)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    documents: res.data,
                });
                const documentRoutes = this.state.documents.map((document) =>
                    <Route exact={true} path={"/" + this.props.genreName.toLowerCase() + "/" + document.name} key={this.props.genreName+document.name+"Route"}> 
                       <PlaylistMain playlist={ document } />
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
            return <div id="docoument-service-loading">Loading...</div>;
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