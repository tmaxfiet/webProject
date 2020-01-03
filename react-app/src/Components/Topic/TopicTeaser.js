import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';

class TopicTeaser extends React.Component {
    constructor(props) {
        super(props);

        this.handleJumbotronClick = this.handleJumbotronClick.bind(this);
    }

    handleJumbotronClick() {
    }

    render() {
        return (
            <Link to={"/"+this.props.topicName}>
                <Jumbotron onClick={this.handleJumbotronClick}>
                    <h2> {this.props.topicName} </h2>
                    <p>
                        Flavor Text
                    </p>
                </Jumbotron>
            </Link>
        );
    }
}

export default TopicTeaser; 