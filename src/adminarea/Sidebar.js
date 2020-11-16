import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { getAllEmployeesList } from '../conn/nlFirestore'
import { EmployeeCard } from './EmployeeCard';

import '../styles/WorkArea.css';
import { Accordion } from 'react-bootstrap';

const Sidebar = (props) => {
    const {
        setCurrentAdminPane,
    } = props;

    const handleClick = (event) => {
        let selectedPane = event.target.id.toLowerCase();
        setCurrentAdminPane(selectedPane);
    }

    return (
        <Col>
            <div className="sidebar-content">
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="bg-info" style={{ fontSize: "1.5em", color: "white" }} eventKey="0">Enrollment</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Row style={{ alignContent: "left" }}>
                                <Button size="lg" id={"employee-enrollment"} variant="outline-secondary" style={{ width: "100%", textAlign: "left", paddingLeft: "1.5vw" }} onClick={handleClick}>Employees</Button>
                                <Button size="lg" id={"patient-enrollment"} variant="outline-secondary" style={{ width: "100%", textAlign: "left", paddingLeft: "1.5vw" }} onClick={handleClick}>Patients</Button>
                            </Row>
                        </Accordion.Collapse>
                    </Card>
                </Accordion >
                <Accordion style={{ marginTop: "10px" }}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} id={"patient-assignment"} className="bg-info" style={{ fontSize: "1.5em", color: "white" }} eventKey="0" onClick={handleClick}>{`Assignment`}</Accordion.Toggle>
                    </Card>
                </Accordion >
                <Accordion style={{ marginTop: "10px" }}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} id={"settings"} className="bg-info" style={{ fontSize: "1.5em", color: "white" }} eventKey="0" onClick={handleClick}>{`Settings`}</Accordion.Toggle>
                    </Card>
                </Accordion >
            </div>
        </Col>
    )
}

export { Sidebar };