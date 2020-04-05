import React from 'react';
import PlaylistTeaser from './PlaylistTeaser';
import * as spotifyService from '../../Services/SpotifyService';

class PlaylistSelectorMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            playlists: {},
        }
    }

    componentDidMount() {
        spotifyService.getPlaylistsBySearch(`${this.props.genreName}`)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    playlists: res.playlists.items,
                });
            })
            .catch( (err) => {
                console.log('Error in PlaylistSelectorMain get for: ', this.props.genreName, ' : ', err);
            });
    }

    render() {
        const { error, isLoaded, playlists } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="playlist-selector-main">
                    {playlists.map( (playlist) => (
                        <PlaylistTeaser playlistName={playlist.name} playlistId={playlist.id} collectionName={this.props.genreName} key={playlist.id+"Teaser"} />
                    ))}
                </div>
            );
        }
    }
}

export default PlaylistSelectorMain; 