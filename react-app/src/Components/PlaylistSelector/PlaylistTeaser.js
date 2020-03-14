import React from 'react';
import { Link } from 'react-router-dom';
import './PlaylistTeaser.css';

class PlaylistTeaser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="prompt-teaser">
                <Link to={`/${this.props.collectionName.toLowerCase()}/${this.props.playlistName.toLowerCase()}`} key={this.props.collectionName.toLowerCase()+"_"+this.props.playlistName.toLowerCase()+"Teaser"}> 
                    <div>{this.props.playlistName}</div>
                </Link>
                <div>{this.props.prompt}</div>
            </div>
        );
    }
}

export default PlaylistTeaser; 