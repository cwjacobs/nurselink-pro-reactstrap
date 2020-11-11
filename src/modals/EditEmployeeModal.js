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

    const stateAbbreviations = [
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
        'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
        'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
        'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
        'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];


    const stateLabelValues = [
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'District of Columbia', value: 'DC' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Guam', value: 'GU' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Puerto Rico', value: 'PR' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virgin Islands', value: 'VI' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' },
    ];
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
                            <Form.Group as={Col} controlId="employeeFN">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control value={props.employee.firstName} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="employeeMN">
                                <Form.Label>Middle Initial</Form.Label>
                                <Form.Control value={props.employee.middle} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control value={props.employee.lastName} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmploymentStatus">
                                <Form.Label>Employment Status</Form.Label>
                                <Form.Control as="select" defaultValue="Active">
                                    <option value="Active">Active</option>
                                    <option value="Terminated">Terminated</option>
                                    <option value="Short-Term-Disability">Short-Term Disability</option>
                                    <option value="Lont-Term-Disability">Long-Term Disability</option>
                                </Form.Control>
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
                                <Form.Control as="select" defaultValue="Select...">
                                    <option>Select...</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">Dist of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
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
