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

    const BANNER_STYLE = {
        color: "white",
        display: "flex",
        justifyContent: "flex-start",
        margin: "0px 3px",
        padding: "6px",
    }

    const CONTENT_STYLE = {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "white",
        borderRadius: "20px",
        borderRight: "none",
        margin: "0px 3px",
        padding: "6px",
        overflowY: "scroll",
        // height: "78vh"
    }

    const LABEL_STYLE = {
        width: "65%",
    }

    const FILTER_STYLE = {
        display: "flex",
        width: "35%",
    }

    return (
        <div>
            {isDisplayHeader && <div className="bg-secondary" style={BANNER_STYLE}>
                <h3 style={LABEL_STYLE}>{headerText}</h3>
                <div style={FILTER_STYLE}>
                    <Form.Label as="h5" className="mt-1" style={LABEL_STYLE}>Employee Status</Form.Label>
                    <Form.Control id='status-filter' as="select" defaultValue="Enrolled" onChange={filterSelectHandler}>
                        {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                    </Form.Control>
                </div>
            </div>}
            <div className="bg-info" style={CONTENT_STYLE}>
                <Row>
                    {
                        displayList.map((currentValue, index) =>
                            <Col xs={3} style={{ marginTop: "1vh" }}>
                                <EntityCard key={index} entity={currentValue} buttonText={`Add`} textClass={`text-primary`} buttonVariant={`outline-primary`} handleButtonClick={entityButtonHandler} />
                            </Col>
                        )
                    }
                </Row>
            </div>
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
