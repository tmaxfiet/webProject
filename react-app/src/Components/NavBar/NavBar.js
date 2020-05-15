import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar id="navbar-main" expand="lg" variant="light">
                <Link to="/">
                    <Navbar.Brand id="navbar-title"> {this.props.brand} </Navbar.Brand>
                </Link>
            </Navbar>
        );
    }
}

export default NavBar;