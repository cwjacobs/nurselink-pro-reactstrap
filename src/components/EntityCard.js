import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const EntityCard = (props) => {
    const {
        entity,
        handleEmployeeEdit,
    } = props;

    const getEmployeeName = () => {
        return (`${entity.firstName} ${entity.lastName}`);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className={"text-info"}>{getEmployeeName()}</Card.Title>
                <Card.Subtitle>{`${entity.title}`}</Card.Subtitle>
                {/* <Card.Text style={{ marginTop: "10px" }}>
                    <h6>{`Patient Count: ${entity.patientList.length}`}</h6>
                    <p>{`${employee.email}`}</p>
                </Card.Text> */}
            </Card.Body>
            <Card.Footer style={{ marginTop: "-10px" }}>
                <Row>
                    <Col xs={8}>
                        <small className="text-muted">{`${entity.status}`}</small>
                    </Col>
                    <Col xs={4}>
                        <Button size="sm" id={entity.email} style={{ width: "4.5vw" }} variant={"outline-info"} onClick={() => handleEmployeeEdit(entity)}>Edit</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export { EntityCard }
