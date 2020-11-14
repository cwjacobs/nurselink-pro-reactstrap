import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Navigation = (props) => {

    const signOutHandler = () => {
        props.setIsSignedIn(false);
    }

    return (
        // <Row>
        <Navbar id="navbar" bg="secondary" variant="dark" sticky="top" role="navigation" style={{ width: "100%" }}>
            <Col xs={1}>
                <Navbar.Brand href="#home">NurseLink</Navbar.Brand>
            </Col>
            <Col xs={5}>
                <Nav className="mr-auto">
                    <Nav.Link href="#home" onClick={props.setIsHome}>Home</Nav.Link>
                    <Nav.Link href="#admin" onClick={props.setIsAdmin}>Admin</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Col>
            <Row style={{ borderStyle: 'solid', borderWidth: '0px', borderColor: 'red', width: "60%" }}>
                <Col xs={12}>
                    <Form inline>
                        <Col xs={8}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter Search Term" style={{ width: '100%' }} />
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Button variant="outline-light" style={{ marginLeft: '-1vw', marginRight: '2vw', width: '6vw' }}>Search</Button>
                            <Button variant="outline-warning" style={{ width: '6vw' }} onClick={signOutHandler}>Sign Out</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Navbar>
        // </Row>
    );
}

export { Navigation }
