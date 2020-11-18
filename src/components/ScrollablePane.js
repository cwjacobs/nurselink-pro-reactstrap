import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import { enrollmentStatus } from '../models/enums';
import { EntityCard } from './EntityCard';

const ScrollablePane = ({
    headerText,
    isDisplayHeader,
    isDisplayAddButton,
    isDisplayFilter,
    filterSelectHandler,
    addButtonHandler,
    entityButtonHandler,
    displayList,
    ...restProps
}) => {

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
                                <Col xs={3} style={{ marginTop: "1vh" }}>
                                    <EntityCard key={index} entity={currentValue} buttonText={`Add`} handleButtonClick={entityButtonHandler} />
                                </Col>
                            )
                        }
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

ScrollablePane.propTypes = {
    // avatar: PropTypes.string,
    // avatarSize: PropTypes.number,
    // title: PropTypes.string,
    // subtitle: PropTypes.string,
    // text: PropTypes.string,
    // className: PropTypes.string,
    // displayList: PropTypes.array,
};

ScrollablePane.defaultProps = {
    // displayList: [],
};

export { ScrollablePane };
