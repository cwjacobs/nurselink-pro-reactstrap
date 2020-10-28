import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import '../infopane/InfoPane.css';

const MedTable = (props) => {

    const {
        clickedAccount,
    } = props;

    const [date, setDate] = useState(new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        // alert(`date: ${date} - clickedAccount: ${clickedAccount.monthlyLog.month}`);
    })

    const handleDateChange = (e) => {
        let date = new Date(e.target.value);
        setDate(date);
    }

    return (
        <div>
            <Row>
                <Col xs={2}>
                    <Form.Group controlId="medListDate">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control variant="info" type="date" onChange={(e) => handleDateChange(e)} />
                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <h5 className="datedisplay">{`${months[date.getMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`}</h5>
                </Col>
            </Row>
            <Table striped bordered hover size="sm" variant="light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Medicine</th>
                        <th>Doses/Day</th>
                        <th>Qty/Dose</th>
                        <th>Form Factor</th>
                        <th>Strength</th>
                        <th>Units</th>
                        <th>Taken</th>
                        <th>Skipped</th>
                        <th>Snoozed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Atorvastatin</td>
                        <td>1</td>
                        <td>1</td>
                        <td>Pill</td>
                        <td>20</td>
                        <td>mg</td>
                        <td>1</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Lisinopril</td>
                        <td>1</td>
                        <td>1</td>
                        <td>Pill</td>
                        <td>10</td>
                        <td>mg</td>
                        <td>1</td>
                        <td>0</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Garlic</td>
                        <td>2</td>
                        <td>3</td>
                        <td>Capsule</td>
                        <td>200</td>
                        <td>iu</td>
                        <td>3</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    )
}

export { MedTable }


