import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './EmployeeCard.css';

const EmployeeCard = (props) => {
    const {
        employee,
    } = props;

    const getEmployeeName = () => {
        return (`${employee.firstName} ${employee.lastName}`);
    }

    const onHandleEmployeeEdit = (event) => {
        alert(`Employee: ${event.target.id}`)
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{getEmployeeName()}</Card.Title>
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
                        <Button style={{ width: "6vw" }} onClick={onHandleEmployeeEdit}>Edit</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export { EmployeeCard }
