import React from 'react';
import logo from '../warehouse.png'
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { isAuthorized, getToken } from '../Utils/Common';

function Header() {
    const isLoggedIn: boolean = isAuthorized()
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="TripleS logo"
            />
            <Navbar.Brand href="/">TripleS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn && (
                            <NavLink to="/products">Products</NavLink>
                        )}
                    </Nav>
                <Nav>
                    {isLoggedIn ?
                        (<NavLink to="/logout">Log Out</NavLink>) :
                        (
                            <div>
                                <NavLink to="/signin">Sign In</NavLink>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </div>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    );
}

export default Header;