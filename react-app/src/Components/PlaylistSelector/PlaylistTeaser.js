import React from 'react';
import { Link } from 'react-router-dom';
import './PlaylistTeaser.css';
import { Card } from 'react-bootstrap';

class PlaylistTeaser extends React.Component {
    getTeaserDescription() {
        if (this.props.description) {
            return this.props.description;
        } else {
            return 'No description found, how lame!'
        }
    }

    render() {
        return (
            <div className="prompt-teaser">
                <Link className="prompt-link" to={`/${this.props.collectionName.toLowerCase()}/${this.props.playlistName}/${this.props.playlistId}`} key={this.props.collectionName.toLowerCase()+"_"+this.props.playlistName.toLowerCase()+"Teaser"}> 
                    <Card>
                        <Card.Img className="teaser-image" variant="top" src={this.props.images[0].url} />
                        <Card.Body>
                            <Card.Title> 
                                {this.props.playlistName}
                            </Card.Title>
                            <div className="teaser-description" dangerouslySetInnerHTML={{ __html: this.getTeaserDescription() }}>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        );
    }
}

export default PlaylistTeaser; 