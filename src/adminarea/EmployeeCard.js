import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './EmployeeCard.css';

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
                <Card.Text style={{ marginTop: "20px" }}>
                    <h6>{`Patient Count: 8`}</h6>
                    <p>{`${employee.email}`}</p>
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ marginTop: "-30px" }}>
                <Row>
                    <Col xs={7}>
                        <small className="text-muted">{`Start Date: ${employee.startDate}`}</small>
                    </Col>
                    <Col xs={5}>
                        <Button id={employee.email} style={{ width: "6vw" }} variant={"outline-info"} onClick={() => handleEmployeeEdit(employee)}>Edit</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export { EmployeeCard }
