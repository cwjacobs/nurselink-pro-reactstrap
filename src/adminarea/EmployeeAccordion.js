import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

import './EmployeeCard.css';

const EmployeeAccordion = (props) => {
    const {
        employee,
        handleEmployeeEdit,
    } = props;

    const getEmployeeName = () => {
        return (`${employee.firstName} ${employee.lastName}`);
    }

    return (
        <Accordion defaultActiveKey="1">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Card.Body>
                        <Card.Title className={"text-info"}>{getEmployeeName()}</Card.Title>
                        <Card.Subtitle>{`${employee.title}`}</Card.Subtitle>
                        <Card.Text style={{ marginTop: "10px" }}>
                            <h6>{`Patient Count: ${employee.patientList.length}`}</h6>
                        </Card.Text>
                    </Card.Body>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Footer style={{ marginTop: "-10px" }}>
                        <Row style={{ marginTop: "1vh" }}>
                            <Row>
                                <Col xs={12}>
                                    <h6 className="text-muted">Patients</h6>
                                </Col>
                            </Row>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={6}>
                                        <Button size="sm" id={employee.email} style={{ width: "100%" }} variant={"outline-primary"} onClick={() => handleEmployeeEdit(employee)}>Remove All</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button size="sm" id={employee.email} style={{ width: "100%" }} variant={"outline-info"} onClick={() => handleEmployeeEdit(employee)}>Add</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "1vh" }}>
                            <Col xs={12}>
                                {employee.patientList.map((patient) => (
                                    <Accordion defaultActiveKey="1">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} className="text-primary" eventKey="0">{patient}</Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Row>
                                                    <Button size="sm" variant="outline-primary" style={{ borderColor: "white", width: "100%" }}>Remove</Button>
                                                </Row>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>))
                                }
                            </Col>
                        </Row>
                    </Card.Footer>
                </Accordion.Collapse>
            </Card >
        </Accordion >
    )
}
export { EmployeeAccordion }
