import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './Sidebar.css';

const Sidebar = (props) => {
    return (
        <Col xs={2} className="bg-info sidebar">
            <Row>
                <Button variant="outline-info" className="bg-dark accountbtn">Craig</Button>
                <Button variant="outline-info" className="bg-dark accountbtn">Daniel</Button>
            </Row>
        </Col>
    )
}

export { Sidebar };