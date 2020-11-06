import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import '../infopane/InfoPane.css';

const MedTable = (props) => {
    const {
        medicineList,
    } = props;

    const deleteMed = (event) => {
        let name = event.target.parentElement.parentElement.children[1].textContent;
        alert(`Deleting Medicine: ${name}`)

        // let list = editedList.filter((el) => {
        //     return (el.name !== name);
        // });
        // setEditedList(list);
    }

    return (
        <div>
            <Table className="medtable" responsive="sm" striped bordered hover size="sm" variant="light">
                <thead>
                    <tr style={{}}>
                        <th style={{ paddingLeft: "9px" }}>Id</th>
                        <th style={{ textAlign: "left", paddingLeft: "9px", width: "20%" }}>Medicine</th>
                        <th>Doses/Day</th>
                        <th>Qty/Dose</th>
                        <th>Form Factor</th>
                        <th>Strength</th>
                        <th>Units</th>
                        <th>Taken</th>
                        <th>Skipped</th>
                        <th>Snoozed</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {medicineList && medicineList.map((currentValue, index) =>
                        <tr style={{ textAlign: "center" }} key={index} className="data-row">
                            <td style={{ textAlign: "left", paddingLeft: "9px" }}>{currentValue.uuid}</td>
                            <td style={{ textAlign: "left", paddingLeft: "9px" }}>{currentValue.name}</td>
                            <td style={{ textAlign: "center", paddingLeft: "0px" }}>{currentValue.numDailyDoses}</td>
                            <td>{currentValue.quantityPerDose}</td>
                            <td>{currentValue.formFactor}</td>
                            <td>{currentValue.strength}</td>
                            <td>{currentValue.strengthUnits}</td>
                            <td>{currentValue.numDosesTaken}</td>
                            <td>{currentValue.numDosesSkipped}</td>
                            <td>{currentValue.numDosesSnoozed}</td>
                            <td><Button variant="outline-danger" size="sm" onClick={(event) => deleteMed(event)}>x</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export { MedTable }


