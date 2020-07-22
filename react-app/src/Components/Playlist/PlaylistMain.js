import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import spotifyService from '../../Services/SpotifyService';
import './PlaylistMain.css';
import SpotifyPlayback from '../SpotifyPlayback/SpotifyPlayback';
import RadarGraph from '../RadarGraph/RadarGraph';

class PlaylistMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            songs: {},
            uris: [],
            selectedAudioData: {},
            selectedSong: '',
            selectedSongName: '',
            paused: true,
        }

        this.setupAudioAnalysis = this.setupAudioAnalysis.bind(this);
        this.stopPlaying = this.stopPlaying.bind(this);
    }

    componentDidMount() {
        spotifyService.getTracksByPlaylistId(`${this.props.match.params.playlistId}`)
            .then( (res) => {
                var uris = [];
                res.items.forEach ( (song) => {
                    uris.push(song.track.uri);
                })
                this.setState({
                    isLoaded: true,
                    songs: res.items,
                    uris: uris,
                });
            })
            .catch( (err) => {
                console.log('Error in PlaylistMain get tracks by playlistId: ', this.props.genreName, ' : ', err);
            });    
    }

    setupAudioAnalysis(songTrack) {
        spotifyService.getAudioAnalysisByTrack(`${songTrack.id}`)
            .then( (res) => {
                this.setState({
                    selectedAudioData: res,
                    selectedSong: songTrack.uri,
                    selectedSongName: songTrack.name,
                    paused: false,
                });
            })
            .catch( (err) => {
                console.log('Error in PlaylisMain getting audio analysis from spotify for: ', songTrack.id, ' : ', err);
            });   
    }

    stopPlaying() {
        this.setState( {
            paused: true,
            selectedSongName: '',
        });
    }

    render() {
        const { error, isLoaded, songs, uris } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div id="playlist-main-loading">Loading...</div>;
        } else {
            return (
                <div id="playlist-main">
                    <SpotifyPlayback uris={uris} selectedSong={this.state.selectedSong} paused={this.state.paused} />
                    <Container fluid>
                        {!this.state.selectedSongName && (
                            <h4 id="playlist-main-title">
                                {this.props.match.params.playlistName}
                            </h4>
                        )}
                        {this.state.selectedSongName && (
                            <h4 id="playlist-main-title">
                                {this.props.match.params.playlistName}  - {this.state.selectedSongName} 
                            </h4>
                        )}
                        <Row>
                            <Col s={12} xs={12} md={6}>
                                <ListGroup id="song-container" variant='flush'>
                                    {songs.map( (song) => (
                                        <div className="song-div" key={song.track.id} onClick={() => {this.setupAudioAnalysis(song.track) }}> 
                                            <ListGroup.Item action className="song-div-item"> { song.track.name } </ListGroup.Item>
                                        </div>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col s={12} xs={12} md={6} style={{height:300}} id="graph-container" onClick={this.stopPlaying}>
                                {!this.state.paused && (
                                    <div id="stop-button"> Click Graph to Stop </div>
                                )}
                                <RadarGraph audioData={this.state.selectedAudioData} paused={this.state.paused} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default PlaylistMain; 