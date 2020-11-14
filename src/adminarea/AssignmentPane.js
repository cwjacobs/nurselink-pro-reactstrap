import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { EmployeeAccordion } from './EmployeeAccordion';
import { PatientCard } from './PatientCard';
import { Container } from 'react-bootstrap';

import { EditEmployeeModal } from '../modals/EditEmployeeModal';
import { enrollmentStatus } from '../models/enums';
import { getAllEmployeesList, getAllPatientsList } from '../conn/nlFirestore'

const AssignmentPane = (props) => {
    // const {
    // } = props;

    const [patientList, setPatientList] = useState();
    const [employeeList, setEmployeeList] = useState();
    const [isAddingPatient, setIsAddingPatient] = useState(false);

    useEffect(() => {
        let statusElement = document.getElementById('status-filter');
        let filteredList = getFilteredEmploymentList(statusElement.value);
        setEmployeeList(filteredList);

        let allPatientsList = getAllPatientsList();
        setPatientList(allPatientsList);
    }, []);

    const dragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0)
    }

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id')

        const card = document.getElementById(card_id);
        card.style.display = 'block';

        e.target.appendChild(card);
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const getFilteredEmploymentList = (status) => {
        let allEmployeeList = getAllEmployeesList();
        if (status === 'All') {
            return (allEmployeeList);
        }
        else {
            let filteredList = allEmployeeList.filter((el) => {
                return (el.status === status);
            });
            return (filteredList);
        }
    }

    const handleStatusChange = (event) => {
        let filteredList = getFilteredEmploymentList(event.target.value);
        setEmployeeList(filteredList);
    }

    const handleEmployeeEdit = (event) => {
    }

    const handleEmployeeSave = (event) => {
    }

    const removePatientFromListOptions = (element, list) => {
        let filteredList = list.filter(el => {
            return el.email !== element.email;
        })
        return filteredList
    }

    const initializeEmployeeAssignment = (employee) => {
        let filteredList = employeeList.filter((el) => {
            return (el.email === employee.email);
        });
        setEmployeeList(filteredList);

        let employeePatientList = filteredList[0].patientList;

        filteredList = [...patientList];
        employeePatientList.forEach(element => {
            filteredList = removePatientFromListOptions(element, filteredList)
        });
        setPatientList(filteredList);
        setIsAddingPatient(true);
    }

    const addEmployeeAssignment = (patient) => {
        let employee = employeeList[0];
        employee.patientList = [...employee.patientList, patient];

        // remove old version of employee from employee list
        let filteredEmployeeList = employeeList.filter((el) => {
            return (el.email !== employee.email);
        });

        // add updated version of employee back to employee list
        let updatedEmployeeList = [...filteredEmployeeList, employee];
        setEmployeeList(updatedEmployeeList);

        let filteredPatientList = [...patientList];
        employee.patientList.forEach(element => {
            filteredPatientList = removePatientFromListOptions(element, filteredPatientList)
        });
        setPatientList(filteredPatientList);
    }

    const closeAddingPatient = () => {
        let element = document.getElementById('status-filter');
        let value = element.value;

        let filteredList = getFilteredEmploymentList(value);
        setEmployeeList(filteredList);

        let allPatients = getAllPatientsList();
        setPatientList(allPatients);

        setIsAddingPatient(false);
    }

    const removeAllPatientAssignments = (employee) => {
        employee.patientList.length = 0;

        let editiedList = employeeList.filter((el) => {
            return el.email !== el.email;
        });
        editiedList = [...employeeList, employee];
        setEmployeeList(editiedList);
    }

    const removePatientAssignment = (employee, patientId) => {
        let filteredPatientList = employee.patientList.filter((el) => {
            return el.email !== patientId;
        });
        employee.patientList = [...filteredPatientList];

        let editedEmployeeList = employeeList.filter((el) => {
            return el.email !== employee.email;
        });
        editedEmployeeList = [...editedEmployeeList, employee];
        setEmployeeList(editedEmployeeList);
    }

    return (
        <div>
            <Card bg='light'>
                <Card.Header className={'text-white bg-dark'}>
                    <Row>
                        <Col xs={5}>
                            <h3>Patient Assignment</h3>
                        </Col>
                        <Col xs={3}>
                            <Form.Label as="h5" style={{ marginTop: "1vh", textAlign: "right" }}>Patient Status</Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control id='status-filter' as="select" defaultValue="Active" onChange={handleStatusChange}>
                                {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                            </Form.Control>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{ overflowY: "scroll", height: "78vh" }}>
                    {employeeList && <div>
                        <Row>
                            {
                                employeeList.map((currentValue, index) =>
                                    <Col xs={3} style={{ marginTop: "1vw" }}>
                                        <EmployeeAccordion key={index} employee={currentValue}
                                            addEmployeeAssignment={initializeEmployeeAssignment}
                                            removePatientAssignment={removePatientAssignment}
                                            removeAllPatientAssignments={removeAllPatientAssignments}
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                        {isAddingPatient && <Row>
                            <Button onClick={closeAddingPatient}>Close</Button>
                            {patientList.map((currentValue, index) =>
                                <Col xs={3} style={{ marginTop: "1vw" }}>
                                    <PatientCard key={index} patient={currentValue} footerButtonText={`Add`} handleOnClick={addEmployeeAssignment} />
                                </Col>
                            )}
                        </Row>}
                    </div>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

{/* <Accordion defaultActiveKey="0">
    <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
            Click me!
    </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
    </Card>
    <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
    </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
    </Card>
</Accordion> */}

export { AssignmentPane };