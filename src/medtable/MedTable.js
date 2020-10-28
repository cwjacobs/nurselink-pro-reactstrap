import React from 'react';
import Table from 'react-bootstrap/Table';

const MedTable = (props) => {

    const {
        clickedAccount,
    } = props;

    return (
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
    )
}

export { MedTable }


