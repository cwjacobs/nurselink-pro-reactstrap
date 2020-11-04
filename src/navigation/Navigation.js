import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import './Navigation.css';

const Navigation = (props) => {

    const signOutHandler = () => {
        props.setIsSignedIn(false);
    }

    return (
        <Navbar id="navbar" bg="secondary" variant="dark">
            <Navbar.Brand href="#home">Medica360</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <Button className="nav-button" variant="outline-light">Search</Button>
                <Button className="nav-button" style={{ marginRight: 0 }} variant="outline-warning" onClick={signOutHandler}>Sign Out</Button>
            </Form>
        </Navbar>
    );
}

export { Navigation }
