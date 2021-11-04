import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">TripleS</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            <NavLink to="/products">Products</NavLink>
        </Nav>
        <Nav>
            <NavLink to="/signup">Sign Up</NavLink>
        </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
);

export default Header;