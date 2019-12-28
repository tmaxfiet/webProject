import React from 'react';

class Greeting extends React.Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        if (isLoggedIn) {
            return this.UserGreeting();
        }
        return this.GuestGreeting();
    }

    UserGreeting() {
        return <h1>Welcome back {this.props.userName}!</h1>;
    }
      
    GuestGreeting() {
        return <h1>Please sign up.</h1>;
    }
}

export default Greeting; 