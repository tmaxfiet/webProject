import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as spotifyService from '../../Services/SpotifyService';
import './PlaylistMain.css';
import SpotifyLogin from '../SpotifyPlayback/SpotifyLogin';
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
        }

        this.setupAudioAnalysis = this.setupAudioAnalysis.bind(this);
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
        console.log('id ', songTrack.id);

        console.log('selectedSong ', songTrack.uri);
        spotifyService.getAudioAnalysisByTrack(`${songTrack.id}`)
            .then( (res) => {
                console.log('setupAudioAnalysis ', res)
                this.setState({
                    selectedAudioData: res,
                    selectedSong: songTrack.uri,
                });
            })
            .catch( (err) => {
                console.log('Error in PlaylisMain getting audio analysis from spotify for: ', songTrack.id, ' : ', err);
            });   
    }

    render() {
        const { error, isLoaded, songs, uris } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="playlist-main">
                    <SpotifyLogin />
                    <SpotifyPlayback uris={uris} selectedSong={this.state.selectedSong} />
                    <Container fluid>
                        {this.props.match.params.playlistName}
                        <Row>
                            <Col s={12} xs={12} md={6}>
                                <ListGroup id="song-container" variant='flush'>
                                    {songs.map( (song) => (
                                        <div className="song-div" key={song.track.id} onClick={() => {this.setupAudioAnalysis(song.track) }}> 
                                            <ListGroup.Item action className="song-div"> { song.track.name } </ListGroup.Item>
                                        </div>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col s={12} xs={12} md={6} style={{height:300}}>
                                <RadarGraph audioData={this.state.selectedAudioData} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default PlaylistMain; 