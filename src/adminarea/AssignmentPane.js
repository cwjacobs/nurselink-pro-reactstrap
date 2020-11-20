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
// import { getSortedEmployees as conn_getSortedEmployees, getSortedPatients as conn_getSortedPatients } from '../conn/nlFirestore'
import { ScrollablePane } from '../components/ScrollablePane'
import { HEADER, CONTENT } from '../styles/constants';

import * as conn from '../conn/nlFirestore';

const AssignmentPane = (props) => {
    const {
        isAddButtonDisplayed = false,
    } = props;

    const [patientList, setPatientList] = useState(conn.getSortedPatients());
    const [allEmployees, setAllEmployees] = useState(conn.getSortedEmployees());
    const [isAddingPatient, setIsAddingPatient] = useState(false);

    useEffect(() => {
        let statusElement = document.getElementById('status-filter');

        let filteredList = getFilteredList(statusElement.value, patientList);
        setPatientList(sortByLastName(filteredList));

        filteredList = getFilteredList(statusElement.value, allEmployees);
        setAllEmployees(sortByLastName(filteredList));
    }, []);

    const sortByLastName = (list) => {
        let sortedList;
        if (list) {
            sortedList = list.sort((x, y) => {
                return (x.lastName < y.lastName ? -1 : 1);
            })
        }
        return sortedList;
    }

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

    const getFilteredList = (status, list) => {
        if (status === 'All') {
            return (list);
        }
        else {
            let filteredList = list.filter((el) => {
                return (el.status === status);
            });
            return (filteredList);
        }
    }

    const handleEmployeeFilterChange = (event) => {
        let filteredList = getFilteredList(event.target.value, conn.getSortedEmployees());
        setAllEmployees(filteredList);
    }

    const handleEmployeeEdit = (event) => {
    }

    const handleEmployeeSave = (event) => {
    }

    const removeElementFromListOptions = (element, list) => {
        let filteredList = list.filter(el => {
            return el.email !== element.email;
        })
        return filteredList
    }

    const initializeEmployeeAssignment = (employee) => {
        setAllEmployees([employee]);

        let availablePatients = [...patientList];
        employee.patientList.forEach(el => {
            availablePatients = removeElementFromListOptions(el, availablePatients)
        });
        setPatientList(sortByLastName(availablePatients));
        setIsAddingPatient(true);
    }

    const addEmployeeAssignment = (patient) => {
        let employee = allEmployees[0];
        employee.patientList = [...employee.patientList, patient];

        let employeeRemovedList = allEmployees.filter((el) => {
            return (el.email !== employee.email);
        });
        setAllEmployees(sortByLastName([...employeeRemovedList, employee]));

        let patientsRemovedList = [...patientList];
        employee.patientList.forEach(el => {
            patientsRemovedList = removeElementFromListOptions(el, patientsRemovedList)
        });
        setPatientList(sortByLastName(patientsRemovedList));
    }

    const closeAddingPatient = () => {
        let selectElement = document.getElementById('status-filter');
        let filterValue = selectElement.value;

        let filteredList = getFilteredList(filterValue, conn.getSortedEmployees());
        setAllEmployees(filteredList);

        // let allPatients = getAllPatientsList();
        filteredList = getFilteredList(filterValue, conn.getSortedPatients());
        setPatientList(filteredList);

        setIsAddingPatient(false);
    }

    const removeAllPatientAssignments = (employee) => {
        employee.patientList.length = 0;

        let employeeRemovedList = allEmployees.filter((el) => {
            return el.email !== employee.email;
        });
        setAllEmployees(sortByLastName([...employeeRemovedList, employee]));
        setPatientList(conn.getSortedPatients());
    }

    const removePatientAssignment = (employee, patientId) => {
        let patientRemovedList = employee.patientList.filter((el) => {
            return el.email !== patientId;
        });
        employee.patientList = [...patientRemovedList];

        let employeeRemovedList = allEmployees.filter((el) => {
            return el.email !== employee.eamil;
        });
        setAllEmployees(sortByLastName([...employeeRemovedList, employee]));

        let patient = conn.getSortedPatients().find((el) => {
            return el.email === patientId;
        })
        let patientsAvailableList = [...patientList, patient];
        setPatientList(sortByLastName(patientsAvailableList));
    }

    return (
        <Container fluid>
            <div className="bg-secondary" style={HEADER}>
                {isAddButtonDisplayed && <Button variant="outline-light" style={HEADER.BUTTON}>+</Button>}
                <h3 style={HEADER.TEXT}>Patient Assignment</h3>
                {!isAddButtonDisplayed && <div style={HEADER.SPAN}></div>}
                <div style={HEADER.SELECT}>
                    <Form.Label as="h5" className="mt-1" style={HEADER.TEXT}>Employee Status:</Form.Label>
                    <Form.Control id='status-filter' as="select" defaultValue="Enrolled" onChange={handleEmployeeFilterChange}>
                        {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                    </Form.Control>
                </div>
            </div>
            <div className="bg-dark" style={CONTENT}>
                {allEmployees && <div>
                    <Row>
                        {
                            allEmployees.map((currentValue, index) =>
                                <Col xs={3} style={{ marginTop: "1vw" }}>
                                    <EmployeeAccordion key={index} employee={currentValue}
                                        addEmployeeAssignment={initializeEmployeeAssignment}
                                        removePatientAssignment={removePatientAssignment}
                                        removeAllPatientAssignments={removeAllPatientAssignments}
                                    />
                                </Col>
                            )
                        }
                        {isAddingPatient && <Col>
                            <Button variant="outline-light" className="mt-3 mb-2 mx-2" onClick={closeAddingPatient}>Close</Button>
                            <ScrollablePane displayList={patientList} entityButtonHandler={addEmployeeAssignment}></ScrollablePane>
                        </Col>}
                    </Row>
                </div>
                }
            </div>
        </Container>
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