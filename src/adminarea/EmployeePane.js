import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { EmployeeCard } from './EmployeeCard';

import { Container } from 'react-bootstrap';
import { EditEmployeeModal } from '../modals/EditEmployeeModal';
import { enrollmentStatus } from '../models/enums';
import { getSortedAllEmployeesList } from '../conn/nlFirestore'

const EmployeePane = (props) => {
    const {
    } = props;

    const [employeeAccounts, setEmployeeAccounts] = useState([]);
    const [crntEmployee, setCrntEmployee] = useState();
    const [isEditingEmployee, setIsEditingEmployee] = useState(false);

    // const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
    //     return currentValue.acctKey;
    // })

    useEffect(() => {
        let statusElement = document.getElementById('status-filter');
        let filteredList = getFilterEmploymentList(statusElement.value);
        setEmployeeAccounts(filteredList);
    }, []);

    const getFilterEmploymentList = (status) => {
        let allEmployeeList = getSortedAllEmployeesList();
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

    const handleAddEmployee = () => {
        let employee = {
            employeeId: Math.round(Math.random() * 10000).toString(),
            acctKey: "",
            email: "",
            firstName: "",
            lastName: "",
            title: "",
            credentials: "",
            startDate: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            status: "Not Enrolled",
            patientList: [],
        }
        setCrntEmployee(employee);
        setIsEditingEmployee(true);
    }

    const handleEmployeeEdit = (employee) => {
        setIsEditingEmployee(true);
        setCrntEmployee(employee);
    }

    const handleEmployeeSave = (employee) => {
        setIsEditingEmployee(false);
    }

    const handleStatusChange = (event) => {
        let filteredList = getFilterEmploymentList(event.target.value);
        setEmployeeAccounts(filteredList);
    }

    return (
        <div>
            <Card bg='light'>
                <Card.Header className={'text-white bg-dark'}>
                    <Row>
                        <Col xs={2}>
                            <h3>Employees</h3>
                        </Col>
                        <Col xs={3}>
                            <Button variant="outline-light" style={{ fontWeight: "bolder" }} onClick={handleAddEmployee}>+</Button>
                        </Col>
                        <Col xs={3}>
                            <Form.Label as="h5" style={{ marginTop: "1vh", textAlign: "right" }}>Enrollment Status</Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control id='status-filter' as="select" defaultValue="Enrolled" onChange={handleStatusChange}>
                                {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                            </Form.Control>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{ overflowY: "scroll", height: "78vh" }}>
                    <Row>
                        {
                            employeeAccounts.map((currentValue, index) =>
                                <Col xs={3} style={{ marginTop: "1vw" }}>
                                    <EmployeeCard key={index} employee={currentValue} handleEmployeeEdit={handleEmployeeEdit} />
                                </Col>
                            )
                        }
                    </Row>
                    {isEditingEmployee
                        &&
                        <EditEmployeeModal employee={crntEmployee} handleEmployeeSave={handleEmployeeSave}></EditEmployeeModal>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export { EmployeePane };