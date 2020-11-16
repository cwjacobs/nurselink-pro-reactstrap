import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Collapse } from 'react-bootstrap';

const EntityCard = (props) => {
    const {
        entity,
        buttonText,
        handleButtonClick,
    } = props;

    const getEntityName = () => {
        return (`${entity.firstName} ${entity.lastName}`);
    }

    return (
        <Card className="d-flex justify-content-left align-items-left flex-column">
            <Card.Body>
                <Card.Title className={"text-info"}>{getEntityName()}</Card.Title>
                {entity.title && <Card.Subtitle>{`${entity.title}`}</Card.Subtitle>}
                {entity.patientList && <Card.Text style={{ marginTop: "10px" }}>
                    <h6>{`Patient Count: ${entity.patientList.length}`}</h6>
                    <p>{`${entity.email}`}</p>
                </Card.Text>}
            </Card.Body>
            <Card.Footer style={{ marginTop: "-10px" }}>
                <Row>
                    <Col xs={6}>
                        <small className="text-muted">{`${entity.status}`}</small>
                    </Col>
                    <Col xs={6}>
                        <Button size="sm" id={entity.email} variant={"outline-info"} style={{ marginLeft: "1vw" }} onClick={() => handleButtonClick(entity)}>{buttonText}</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export { EntityCard }
