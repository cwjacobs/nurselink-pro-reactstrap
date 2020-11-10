import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './InfoPane.css';

const MedTable = (props) => {
    const {
        medicineList,
        deleteMedicine,
    } = props;

    const [isDeletingMed, setIsDeletingMed] = useState(false);
    const [deletingMedName, setDeletingMedName] = useState(false);

    const getMedInfo = () => {
        let med = medicineList.filter((el) => {
            return (el.name === deletingMedName);
        });
        let medInfo = `${med[0].name} ${med[0].formFactor} ${med[0].strength} ${med[0].strengthUnits}`;
        return medInfo;
    }

    const confirmDeleteMed = (event) => {
        let name = event.target.parentElement.parentElement.children[1].textContent;
        setDeletingMedName(name);
        setIsDeletingMed(true);
    }

    const handleCancel = () => {
        setIsDeletingMed(false);
    }

    const handleConfirm = () => {
        deleteMedicine(deletingMedName); // props.deleteMedicine
        setIsDeletingMed(false);
    }

    return (
        <>
            <div>
                {
                    isDeletingMed &&
                    <Modal.Dialog>
                        <Modal.Header show={true}>
                            <Modal.Title>Deleting {deletingMedName}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <h5>{`Delete ${getMedInfo()} ?`}</h5>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
                        </Modal.Footer>
                    </Modal.Dialog>}
            </div>
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
                                <td><Button variant="outline-danger" size="sm" onClick={(event) => confirmDeleteMed(event)}>x</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export { MedTable }


