import React from 'react';
import * as spotifyService from '../../Services/SpotifyService';
import './PlaylistMain.css';

class PlaylistMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            songs: {},
        }
    }

    componentDidMount() {
        spotifyService.getTracksByPlaylistId(`${this.props.match.params.playlistId}`)
            .then( (res) => {
                this.setState({
                    isLoaded: true,
                    songs: res.items,
                });
                console.log(res)
            })
            .catch( (err) => {
                console.log('Error in PlaylistSelectorMain get for: ', this.props.genreName, ' : ', err);
            });
    }

    render() {
        const { error, isLoaded, songs } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="playlist-main">
                    {this.props.match.params.playlistName}
                    <div id="song-container">
                        {songs.map( (song) => (
                            <div className="song-div" key={song.track.id}> { song.track.name } </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default PlaylistMain; 