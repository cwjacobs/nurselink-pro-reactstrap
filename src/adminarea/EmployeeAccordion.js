import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

const EmployeeAccordion = (props) => {

    const [myEmployee, setMyEmployee] = useState(props.employee);

    useEffect(() => {
        setMyEmployee(props.employee)
    }, [props.employee])

    const getEmployeeName = () => {
        return (`${myEmployee.firstName} ${myEmployee.lastName}`);
    }

    return (
        <Accordion defaultActiveKey="1">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Card.Body>
                        <Card.Title className={"text-info"}>{getEmployeeName()}</Card.Title>
                        <Card.Subtitle>{`${myEmployee.title}`}</Card.Subtitle>
                        <Card.Text style={{ marginTop: "10px" }}>
                            <h6>{`Patient Count: ${myEmployee.patientList.length}`}</h6>
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
                                        <Button size="sm"
                                            disabled={myEmployee.patientList.length === 0 ? true : false}
                                            id={myEmployee.email}
                                            style={{ width: "100%" }}
                                            variant={"outline-primary"}
                                            onClick={() => props.removeAllPatientAssignments(myEmployee)}>Remove All</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button size="sm"
                                            id={myEmployee.email}
                                            style={{ width: "100%" }}
                                            variant={"outline-info"}
                                            onClick={() => props.addEmployeeAssignment(myEmployee)}>Add</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "1vh" }}>
                            <Col xs={12}>
                                {myEmployee.patientList.map((patient) => (
                                    <Accordion defaultActiveKey="1">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} className="text-primary" eventKey="0">{`${patient.firstName} ${patient.lastName}`}</Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Row>
                                                    <Button id={`${patient.email}`} size="sm" variant="outline-primary" style={{ borderColor: "white", width: "100%" }}
                                                        onClick={(event) => props.removePatientAssignment(myEmployee, event.target.id)}>Remove</Button>
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
