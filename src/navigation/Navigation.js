import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

const Navigation = (props) => {

    const signOutHandler = () => {
        props.setIsSignedIn(false);
    }

    return (
        <Navbar id="navbar" bg="secondary" variant="dark" sticky="top" role="navigation">
            <Navbar.Brand href="#home">NurseLink</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home" onClick={props.setIsHome}>Home</Nav.Link>
                <Nav.Link href="#admin" onClick={props.setIsAdmin}>Admin</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <Button style={{ paddingLeft: "2vw", paddingRight: "2vw", marginRight: "2vw" }} variant="outline-light">Search</Button>
                <Button style={{ paddingLeft: "1.5vw", paddingRight: "1.5vw" }} variant="outline-warning" onClick={signOutHandler}>Sign Out</Button>
            </Form>
        </Navbar>
    );
}

export { Navigation }
