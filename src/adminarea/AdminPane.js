import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { EmployeeCard } from './EmployeeCard';

import { getEmployeeList } from '../conn/nlFirestore'
import { Container } from 'react-bootstrap';
import { EditEmployeeModal } from '../modals/EditEmployeeModal';

const AdminPane = (props) => {
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
        let filteredList = getFilterEmploymentStatus(statusElement.value);
        setEmployeeAccounts(filteredList);
    }, []);

    const getFilterEmploymentStatus = (status) => {
        let allEmployeeList = getEmployeeList();
        if (status === 'All') {
            return (allEmployeeList);
        }
        else {
            // alert(`Employment Status Changed: ${event.target.value}`);
            let filteredList = allEmployeeList.filter((el) => {
                return (el.status === status);
            });
            return (filteredList);
        }
    }

    const handleEmployeeEdit = (employee) => {
        setIsEditingEmployee(true);
        setCrntEmployee(employee);
    }

    const handleEmployeeSave = (employee) => {
        setIsEditingEmployee(false);
    }

    const handleStatusChange = (event) => {
        let filteredList = getFilterEmploymentStatus(event.target.value);
        setEmployeeAccounts(filteredList);
    }

    return (
        <div className="adminpane-content">
            <Card bg='light'>
                <Card.Header className={'text-white bg-dark'}>
                    <Row>
                        <Col xs={5}>
                            <h3>Employees</h3>
                        </Col>
                        <Col xs={3}>
                            <Form.Label as="h5" style={{ marginTop: "1vh", textAlign: "right" }}>Employment Status</Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control id='status-filter' as="select" defaultValue="Active" onChange={handleStatusChange}>
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Terminated">Terminated</option>
                                <option value="Short-Term-Disability">Short-Term Disability</option>
                                <option value="Lont-Term-Disability">Long-Term Disability</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row className="adminpane-content">
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

export { AdminPane };