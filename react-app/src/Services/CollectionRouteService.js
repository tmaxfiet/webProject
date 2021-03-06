import React from 'react';
import { Route } from 'react-router-dom';
import PlaylistSelectorMain from '../Components/PlaylistSelector/PlaylistSelectorMain';
import * as Constants from '../Settings/constants';
import PlaylistMain from '../Components/Playlist/PlaylistMain';
import { dbBaseUrl } from '../Settings/constants';
const axios = require('axios');

class CollectionRouteService extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collectionRoutes: [''] };

        this.state = {
            error: null,
            isLoaded: false,
            collectionNames: [],
            collectionRoutes: [],
        }

        this.setCollectionRoutes = this.setCollectionRoutes.bind(this);
    }
    
    componentDidMount() {
        this.setCollectionRoutes();
    }

    setCollectionRoutes() {
        // Acquire all collection names
        const urlString = dbBaseUrl + `/${Constants.collectionNamesRoute}`;
        axios.get(urlString)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    collectionNames: res.data,
                });

                const collectionRoutes = this.state.collectionNames.map( (collectionName) =>
                    <div key={collectionName+"collectionRouteDiv"}>
                        <Route exact={true} path={"/" + collectionName.toLowerCase()} key={collectionName+"Route"}> 
                            <PlaylistSelectorMain genreName={collectionName} key={collectionName+"PlaylistSelectorMain"} />
                        </Route>
                        <Route path={"/" + collectionName.toLowerCase()+"/:playlistName/:playlistId"} component={PlaylistMain}/>
                    </div>
                );

                this.setState({collectionRoutes: collectionRoutes});
            })
            .catch( (err) => {
                console.log('Error in topic main get: ', err);
            });
    }

    render() {
        return (
            <div>
                {this.state.collectionRoutes}
            </div>
        );
    }
}

export default CollectionRouteService;