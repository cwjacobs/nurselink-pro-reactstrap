import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import * as utils from '../utilities/utils';

///  Modal dialog to add a medicine to current Medicine Table ***/
//
const AddMedicineModal = (props) => {

    const [formFactor, setFormFactor] = useState();
    const [strengthUnits, setStrengthUnits] = useState();

    const getUUID = () => {
        let uuid = Math.round(Math.random() * 10000).toString();
        return uuid;
    }

    const handleFormFactorChange = (event) => {
        setFormFactor(event.target.value);
    }

    const handleStrengthUnitsChange = (event) => {
        setStrengthUnits(event.target.value);
    }

    // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    // ...and ensure strings of whitespace fail
    const isPositiveNumeric = (str) => {
        let number;
        let isNumber = !isNaN(str) && !isNaN(parseFloat(str));
        if (isNumber) {
            number = Number(str);
        }

        if (!isNumber || (number <= 0)) {
            return false;
        }
        return true;
    }

    const parseForm = () => {
        let medicineInfo;
        let uuid = document.getElementById("addmed-uuid").innerText;
        let medicineName = document.getElementById("addmed-medicineName").value;
        let numDailyDoses = document.getElementById("addmed-numDailyDoses").value;
        let quantityPerDose = document.getElementById("addmed-quantityPerDose").value;
        let strength = document.getElementById("addmed-strength").value;

        if (medicineName.length === 0) {
            alert(`Please enter a medicine name`);
            return;
        }
        else {
            medicineName = medicineName.trim();
        }

        if (!isPositiveNumeric(numDailyDoses)) {
            alert(`Doses/Day '${numDailyDoses}' - Please enter a number greater than zero`);
            return;
        }
        else {
            numDailyDoses = Number(numDailyDoses);
        }

        if (!isPositiveNumeric(quantityPerDose)) {
            alert(`Qty/Dose '${quantityPerDose}' - Please enter a number greater than zero`);
            return;
        }
        else {
            quantityPerDose = Number(quantityPerDose);
        }

        if (!isPositiveNumeric(strength)) {
            alert(`Strength '${strength}' - Please enter a number greater than zero`);
            return;
        }
        else {
            strength = Number(strength);
        }

        if (!formFactor || formFactor === 'Select...') {
            alert(`Please select a value for 'Form Factor'`);
            return;
        }

        if (!strengthUnits || strengthUnits === 'Select...') {
            alert(`Please select a value for 'Units'`);
            return;
        }

        medicineInfo = {
            uuid: uuid,
            name: medicineName,
            numDailyDoses: numDailyDoses,
            quantityPerDose: quantityPerDose,
            formFactor: formFactor,
            strength: strength,
            strengthUnits: strengthUnits,
            numDosesTaken: 0,
            numDosesSkipped: 0,
            numDosesSnoozed: 0,
            doseSchedule: [],
            dateAdded: utils.parseDate(new Date()),
        }
        return medicineInfo;
    }

    const saveMedicine = () => {
        let medicineInfo = parseForm();
        if (medicineInfo) {
            props.addNewMedicine(medicineInfo);
            props.setIsAddingMed(false);
        }
    }

    const closeModal = () => {
        props.setIsAddingMed(false);
    }

    return (
        <Modal size="xl" centered show={true}>
            <Modal.Header className="bg-info">
                <Modal.Title className="text-white">Add Medicine</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                <Table className="medtable" responsive="sm" striped bordered hover size="sm" variant="light">
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th style={{ textAlign: "left", paddingLeft: "14px", width: "8%" }}>Id</th>
                            <th style={{ textAlign: "left", paddingLeft: "14px", width: "40%" }}>Medicine</th>
                            <th style={{ width: "8%" }}>Doses/Day</th>
                            <th style={{ width: "8%" }}>Qty/Dose</th>
                            <th style={{ width: "12%" }}>Form Factor</th>
                            <th style={{ width: "8%" }}>Strength</th>
                            <th style={{ width: "12%" }}>Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ textAlign: "center" }} className="data-row">
                            <td id="addmed-uuid" style={{ textAlign: "left", paddingLeft: ".5vw", paddingTop: "10px" }}>{getUUID()}</td>
                            <td style={{ textAlign: "left" }}>
                                <InputGroup><FormControl id="addmed-medicineName" placeholder="Medicine"></FormControl></InputGroup>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <InputGroup><FormControl id="addmed-numDailyDoses" type="number" min="0"></FormControl></InputGroup>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <InputGroup><FormControl id="addmed-quantityPerDose" type="number" min="0"></FormControl></InputGroup>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Form.Group controlId="addmed-formfactor">
                                    {/* <Form.Label>Select</Form.Label> */}
                                    <Form.Control as="select" onChange={handleFormFactorChange}>
                                        <option>Select...</option>
                                        <option>pill</option>
                                        <option>powder</option>
                                        <option>solution</option>
                                        <option>drops</option>
                                        <option>inhaler</option>
                                        <option>injection</option>
                                        <option>other</option>
                                    </Form.Control>
                                </Form.Group>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <InputGroup><FormControl id="addmed-strength" type="number" min="0"></FormControl></InputGroup>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Form.Group controlId="addmed-units">
                                    {/* <Form.Label>Select</Form.Label> */}
                                    <Form.Control as="select" onChange={handleStrengthUnitsChange}>
                                        <option>Select...</option>
                                        <option>g</option>
                                        <option>mg</option>
                                        <option>ml</option>
                                        <option>iu</option>
                                        <option>mcg</option>
                                        <option>meq</option>
                                        <option>mgml</option>
                                        <option>mcgml</option>
                                        <option>percent</option>
                                    </Form.Control>
                                </Form.Group>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-info"} onClick={closeModal}>Cancel</Button>
                <Button variant={"info"} onClick={saveMedicine}>Save</Button>
            </Modal.Footer>
        </Modal >
    );
}

export { AddMedicineModal }
