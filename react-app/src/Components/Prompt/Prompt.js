import React from 'react';

class Prompt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div> ProptHello
                <div>{this.props.title}</div>
                <div>{this.props.prompt}</div>
            </div>
        );
    }
}

export default Prompt; 