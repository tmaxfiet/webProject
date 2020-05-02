import React from 'react';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../Assets/Spotify_Logo_RGB_Green.png';
import './SpotifyLogin.css';

class SpotifyLogin extends React.Component {
    constructor(props) {
        super(props);

        this.loginRedirect = this.loginRedirect.bind(this);
    }

    componentDidMount() {
        console.log('spotifylogin ', this.props.token)
    }

    loginRedirect() {
        const urlString = window.location.protocol + "//" + window.location.hostname + ":3001/spotify/redirectUri";
        axios.get(urlString, {
            params: {
                currUri: window.location.pathname,
            }
            }).then( (res) => {
                window.location = res.data;
            })
            .catch( (err) => {
                console.log('Error in playlist main get: ', err);
            })
    }

    render() {
        if(!this.props.token) {
            return (
                <Row className="justify-content-md-center" id="spotify-login-container">
                    <Col xs={12} sm={6} lg={3}>
                        <Figure onClick={this.loginRedirect} id="spotify-login" bsPrefix="spotify-login-figure">
                            <Figure.Image
                                id="spotify-login-img"
                                width={171}
                                height={180}
                                alt="Spotify Login"
                                src={logo}
                            />
                            <Figure.Caption>
                                Login to hear audio through browser
                            </Figure.Caption>
                        </Figure>
                    </Col>
                </Row>
            )
        } else {
            return (
                <div> Logged In </div>
            )
        }
    }
}

export default SpotifyLogin; 