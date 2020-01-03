import React from 'react';

class TopicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // Capitlize topic name
        let topicValue = event.target.value; 
        if (topicValue.length > 0) {
            topicValue = topicValue.toLowerCase();
            topicValue = topicValue.charAt(0).toUpperCase() + topicValue.slice(1);
        }
        this.setState({value: topicValue});
    }

    handleSubmit(event) {
        // TODO hookup data dump for new topic name
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Topic Name
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default TopicForm;