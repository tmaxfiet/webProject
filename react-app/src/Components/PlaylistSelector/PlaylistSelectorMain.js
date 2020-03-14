import React from 'react';
import PlaylistTeaser from './PlaylistTeaser';
const axios = require('axios');

class PlaylistSelectorMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            playlists: [],
        }
    }

    componentDidMount() {
        const urlString = window.location.protocol + "//" + window.location.hostname + `:3001/data/${this.props.genreName}`;
        axios.get(urlString)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    playlists: res.data,
                });
            })
            .catch( (err) => {
                console.log('Error in PlaylistMain get for: ', this.props.genreName, ' : ', err);
            })
    }

    render() {
        const { error, isLoaded, playlists } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="playlist-main">
                    {playlists.map( (playlist) => (
                        <PlaylistTeaser playlistName={playlist.name} collectionName={this.props.genreName} key={playlist.name+"Teaser"} />
                    ))}
                </div>
            );
        }
    }
}

export default PlaylistSelectorMain; 