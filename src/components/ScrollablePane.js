import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Container } from 'react-bootstrap';
import { EditPatientModal } from '../modals/EditPatientModal';
import { enrollmentStatus } from '../models/enums';
import { getAllPatientsList } from '../conn/nlFirestore'
import { EntityCard } from './EntityCard';


const ScrollablePane = (props) => {
    const {
        headerText,
        isDisplayHeader,
        isDisplayAddButton,
        addButtonHandler,
        isDisplayFilter,
        filterSelectHandler,
        displayList,
    } = props;

    useEffect(() => {
    }, []);

    return (
        <div>
            <Card bg='light'>
                {isDisplayHeader && <Card.Header className={'text-white bg-dark'}>
                    <Row>
                        <Col xs={2}>
                            <h3>{headerText}</h3>
                        </Col>
                        {isDisplayAddButton && <Col xs={3}>
                            <Button variant="outline-light" style={{ fontWeight: "bolder" }} onClick={addButtonHandler}>+</Button>
                        </Col>}
                        {isDisplayFilter && <div>
                            <Col xs={3}>
                                <Form.Label as="h5" style={{ marginTop: "1vh", textAlign: "right" }}>Enrollment Status</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Control id='status-filter' as="select" defaultValue="Enrolled" onChange={filterSelectHandler}>
                                    {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                                </Form.Control>
                            </Col>
                        </div>}
                    </Row>
                </Card.Header>}
                <Card.Body style={{ overflowY: "scroll", height: "78vh" }}>
                    <Row>
                        {
                            displayList.map((currentValue, index) =>
                                <Col xs={3} style={{ marginTop: "1vw" }}>
                                    <EntityCard key={index} entity={currentValue} footerButtonText={`Edit`} handleOnClick={addButtonHandler} />
                                </Col>
                            )
                        }
                    </Row>

                </Card.Body>
            </Card>
        </div>
    )
}

export { ScrollablePane };
