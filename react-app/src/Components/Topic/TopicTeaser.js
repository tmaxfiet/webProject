import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './TopicTeaser.css';
import popBackground from '../../Assets/pop-banner-1.jpg'
import countryBackground from '../../Assets/country-banner-1.jpg'
import hipHopBackground from '../../Assets/hipHop-banner-1.jpg'
import rockBackground from '../../Assets/rock-banner-1.jpg'
import studyingBackground from '../../Assets/studying-banner-1.jpg'
import gamingBackground from '../../Assets/gaming-banner-1.jpg'
import indieBackground from '../../Assets/indie-banner-1.jpg'

class TopicTeaser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state ={
            backgroundUrl: '../../Assets/graybackground.jpg',
        };
    }

    componentDidMount() {
        if (this.props.topicName === 'Pop') {
            this.setState({
                backgroundUrl: popBackground,
            });
        }
        else if (this.props.topicName === 'Country') {
            this.setState({
                backgroundUrl: countryBackground,
            });
        }
        else if (this.props.topicName === 'Hip Hop') {
            this.setState({
                backgroundUrl: hipHopBackground,
            });
        }
        else if (this.props.topicName === 'Rock') {
            this.setState({
                backgroundUrl: rockBackground,
            });
        }
        else if (this.props.topicName === 'Studying') {
            this.setState({
                backgroundUrl: studyingBackground,
            });
        }
        else if (this.props.topicName === 'Gaming') {
            this.setState({
                backgroundUrl: gamingBackground,
            });
        }
        else if (this.props.topicName === 'Indie') {
            this.setState({
                backgroundUrl: indieBackground,
            });
        }
    }

    render() {
        return (
            <Link className="jumbotron-link" to={"/"+this.props.topicName.toLowerCase()}>
                <Jumbotron className="jumbotron-container" style={{backgroundImage: 
                    `url(${this.state.backgroundUrl})`}}>
                    <h2 className="jumbotron-title"> {this.props.topicName} </h2>
                </Jumbotron>
            </Link>
        );
    }
}

export default TopicTeaser; 