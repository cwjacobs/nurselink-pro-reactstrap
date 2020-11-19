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
import { getSortedAllEmployeesList, getSortedAllPatientsList } from '../conn/nlFirestore'
import { ScrollablePane } from '../components/ScrollablePane'

const AssignmentPane = (props) => {
    const {
        isAddButtonDisplayed = false,
    } = props;

    const [patientList, setPatientList] = useState(getSortedAllPatientsList());
    const [employeeList, setEmployeeList] = useState(getSortedAllEmployeesList());
    const [isAddingPatient, setIsAddingPatient] = useState(false);

    useEffect(() => {
        let statusElement = document.getElementById('status-filter');

        let filteredList = getFilteredList(statusElement.value, patientList);
        setPatientList(sortByLastName(filteredList));

        filteredList = getFilteredList(statusElement.value, employeeList);
        setEmployeeList(sortByLastName(filteredList));
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
        let filteredList = getFilteredList(event.target.value, getSortedAllEmployeesList());
        setEmployeeList(filteredList);
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
        let filteredList = employeeList.filter((el) => {
            return (el.email === employee.email);
        });
        setEmployeeList(sortByLastName(filteredList));

        let employeePatientList = filteredList[0].patientList;

        filteredList = [...patientList];
        employeePatientList.forEach(el => {
            filteredList = removeElementFromListOptions(el, filteredList)
        });
        setPatientList(sortByLastName(filteredList));
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
        setEmployeeList(sortByLastName(updatedEmployeeList));

        let filteredPatientList = [...patientList];
        employee.patientList.forEach(element => {
            filteredPatientList = removeElementFromListOptions(element, filteredPatientList)
        });
        setPatientList(sortByLastName(filteredPatientList));
    }

    const closeAddingPatient = () => {
        let element = document.getElementById('status-filter');
        let value = element.value;

        let filteredList = getFilteredList(value, getSortedAllEmployeesList());
        setEmployeeList(filteredList);

        // let allPatients = getAllPatientsList();
        filteredList = getFilteredList(value, getSortedAllPatientsList());
        setPatientList(filteredList);

        setIsAddingPatient(false);
    }

    const removeAllPatientAssignments = (employee) => {
        employee.patientList.length = 0;

        let editiedList = employeeList.filter((el) => {
            return el.email !== employee.email;
        });
        setEmployeeList(sortByLastName([...editiedList, employee]));
        setPatientList(getSortedAllPatientsList());
    }

    const removePatientAssignment = (employee, patientId) => {
        let filteredPatientList = employee.patientList.filter((el) => {
            return el.email !== patientId;
        });
        employee.patientList = [...filteredPatientList];

        let editedEmployeeList = employeeList.filter((el) => {
            return el.email !== employee.email;
        });
        setEmployeeList(sortByLastName([...editedEmployeeList, employee]));

        let patient = getSortedAllPatientsList().find((el) => {
            return el.email === patientId;
        })
        let availablePatientList = [...patientList, patient];
        setPatientList(sortByLastName(availablePatientList));
    }

    const HEADER = {
        color: "white",
        display: "flex",
        justifyContent: "flex-start",
        margin: "0px 3px",
        padding: "6px",

        // BANNER: {
        //     color: "white",
        //     display: "flex",
        //     justifyContent: "flex-start",
        //     margin: "0px 3px",
        //     padding: "6px",
        // },

        SPAN: {
            width: "0.3%",
            margin: "8px",
        },

        BUTTON: {
            width: "3%",
            fontWeight: "bolder",
            margin: "8px",
        },

        SELECT: {
            display: "flex",
            width: "50%",
            marginTop: "1vh",
        },

        TEXT: {
            width: "60%",
            fontWeight: "bolder",
            marginTop: "1vh",
            margin: "8px",
        },
    }

    const CONTENT_STYLE = {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "white",
        borderRadius: "20px",
        borderRight: "none",
        margin: "0px 3px",
        padding: "6px",
        overflowY: "scroll",
        height: "78vh"
    }

    return (
        <div>
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
            <div className="bg-dark" style={CONTENT_STYLE}>
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
                        {isAddingPatient && <Col>
                            <Button variant="outline-light" className="mt-3 mb-2 mx-2" onClick={closeAddingPatient}>Close</Button>
                            <ScrollablePane displayList={patientList} entityButtonHandler={addEmployeeAssignment}></ScrollablePane>
                        </Col>}
                    </Row>
                </div>
                }
            </div>
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