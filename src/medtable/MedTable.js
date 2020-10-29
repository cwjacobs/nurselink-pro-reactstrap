import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import '../infopane/InfoPane.css';

const MedTable = (props) => {
    const {
        clickedAccount,
        medicineList,
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
                    {medicineList && medicineList.map((currentValue, index) =>
                        <tr key={index} className="data-row">
                            <td>{currentValue.uuid}</td>
                            <td>{currentValue.name}</td>
                            <td>{currentValue.numDailyDoses}</td>
                            <td>{currentValue.quantityPerDose}</td>
                            <td>{currentValue.formFactor}</td>
                            <td>{currentValue.strength}</td>
                            <td>{currentValue.strengthUnits}</td>
                            <td>{currentValue.numDosesTaken}</td>
                            <td>{currentValue.numDosesSkipped}</td>
                            <td>{currentValue.numDosesSnoozed}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>

    )
}

export { MedTable }


