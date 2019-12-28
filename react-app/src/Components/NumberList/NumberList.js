import React from 'react';

class NumberList extends React.Component {
    constructor(props) {
        super(props);
        const numbers = this.props.numbers;
        const listItems = numbers.map((number) => 
            <li key={number.toString()}>
                {number}
            </li>
        );
        this.state = {listItems: listItems};
    }

    render() {
        return <ul>{this.state.listItems}</ul>;
    }
}

export default NumberList;