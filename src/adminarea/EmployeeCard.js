import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const EmployeeCard = (props) => {
    const {
        employee,
        handleEmployeeEdit,
    } = props;

    const getEmployeeName = () => {
        return (`${employee.firstName} ${employee.lastName}`);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className={"text-info"}>{getEmployeeName()}</Card.Title>
                <Card.Subtitle>{`${employee.title}`}</Card.Subtitle>
                <Card.Text style={{ marginTop: "10px" }}>
                    <h6>{`Patient Count: ${employee.patientList.length}`}</h6>
                    {/* <p>{`${employee.email}`}</p> */}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ marginTop: "-10px" }}>
                <Row>
                    <Col xs={8}>
                        <small className="text-muted">{`${employee.status}`}</small>
                    </Col>
                    <Col xs={4}>
                        <Button size="sm" id={employee.email} style={{ width: "4.5vw" }} variant={"outline-info"} onClick={() => handleEmployeeEdit(employee)}>Edit</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export { EmployeeCard }
