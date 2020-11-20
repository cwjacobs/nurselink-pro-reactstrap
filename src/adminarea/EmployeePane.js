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
import { getSortedEmployees } from '../conn/nlFirestore'
import { HEADER, CONTENT } from '../styles/constants';

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
        let allEmployeeList = getSortedEmployees();
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
            <div className="bg-secondary" style={HEADER}>
                <Button variant="outline-light" style={HEADER.BUTTON} onClick={handleAddEmployee}>+</Button>
                <h3 style={HEADER.TEXT}>Employees</h3>
                <div style={HEADER.SELECT}>
                    <Form.Label as="h5" className="mt-1" style={HEADER.TEXT}>Enrollment Status:</Form.Label>
                    <Form.Control id='status-filter' as="select" defaultValue="Enrolled" onChange={handleStatusChange}>
                        {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                    </Form.Control>
                </div>
            </div>
            <div className="bg-dark" style={CONTENT}>
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
            </div>
        </div>
    )
}

export { EmployeePane };