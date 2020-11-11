import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import * as utils from '../utilities/utils';

///  Modal dialog to add a medicine to current Medicine Table ***/
//
const EditEmployeeModal = (props) => {

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

        let employeeInfo = {
        }
        return employeeInfo;
    }

    const saveMedicine = () => {
        let medicineInfo = parseForm();
        if (medicineInfo) {
            props.addNewMedicine(medicineInfo);
            props.setIsAddingMed(false);
        }
    }

    const closeModal = () => {
        props.setIsEditingEmployee(false);
    }

    return (
        <div>
            <Modal size="xl" centered show={true}>
                <Modal.Header className="bg-info">
                    <Modal.Title className="text-white">Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="employeeId">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control disabled="true" value={props.employee.employeeId} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="employeeId">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control value={props.employee.firstName} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control value={props.employee.lastName} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmploymentStatus">
                                <Form.Label>Employment Status</Form.Label>
                                <Form.Control defaultValue="Active" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="employeeId">
                                <Form.Label>Title</Form.Label>
                                <Form.Control defaultValue={props.employee.title} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control defaultValue={props.employee.address} />
                        </Form.Group>
                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control defaultValue={props.employee.city} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control defaultValue={props.employee.zip} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" style={{ width: "6vw" }} onClick={(event) => props.handleEmployeeSave(event)}>Cancel</Button>
                    <Button variant="outline-info" style={{ width: "6vw" }} onClick={(event) => props.handleEmployeeSave(event)}>Save</Button>
                </Modal.Footer>
            </Modal >
        </div>
    );
}

export { EditEmployeeModal }
