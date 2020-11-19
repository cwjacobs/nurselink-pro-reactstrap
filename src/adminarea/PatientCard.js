import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PatientCard = (props) => {
    const {
        patient,
        handleOnClick,
        footerButtonText,
    } = props;

    const getPatientName = () => {
        return (`${patient.firstName} ${patient.lastName}`);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className={"text-primary"}>{getPatientName()}</Card.Title>
                <Card.Text style={{ marginTop: "10px" }}>
                    {/* <p>{`${employee.email}`}</p> */}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ marginTop: "-10px" }}>
                <Row>
                    <Col xs={8}>
                        <small className="text-muted">{`${patient.status}`}</small>
                    </Col>
                    <Col xs={4}>
                        <Button size="sm" id={patient.email} style={{ width: "4.5vw" }} variant={"outline-primary"} onClick={() => handleOnClick(patient)}>{footerButtonText}</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export { PatientCard }
