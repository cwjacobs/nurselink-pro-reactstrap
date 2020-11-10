import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import './EmployeeCard.css';

const EmployeeCard = (props) => {
    const {
        employee,
    } = props;

    const getEmployeeName = () => {
        return (`${employee.firstName} ${employee.lastName}`);
    }

    const onClickHandler = (event) => {

    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{getEmployeeName()}</Card.Title>
                <Card.Text>
                    {`
                    Title: ${employee.credentials}
                    Email: ${employee.email}
                    `}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{`Start Date: ${employee.startDate}`}</small>
            </Card.Footer>
        </Card>
    )
}

export { EmployeeCard }
