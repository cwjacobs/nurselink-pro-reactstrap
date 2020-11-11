import React, { useState, useEffect } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { EmployeeCard } from './EmployeeCard';

import { getEmployeeList } from '../conn/nlFirestore'
import { Container } from 'react-bootstrap';
import { EditEmployeeModal } from '../modals/EditEmployeeModal';

const AdminPane = (props) => {
    const {
    } = props;

    const [managedAccounts, setManagedAccounts] = useState([]);
    const [crntEmployee, setCrntEmployee] = useState();
    const [isEditingEmployee, setIsEditingEmployee] = useState(false);

    // const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
    //     return currentValue.acctKey;
    // })

    useEffect(() => {
        setManagedAccounts(getEmployeeList());
    }, []);

    const handleEmployeeEdit = (employee) => {
        // alert(`editing employee ${email}`);
        setIsEditingEmployee(true);
        setCrntEmployee(employee);
    }

    const handleEmployeeSave = (employee) => {
        // alert(`saving employee ${employee.email}`);
        setIsEditingEmployee(false);
    }

    return (
        <div className="adminpane-content">
            <Row className="adminpane-content">
                {
                    managedAccounts.map((currentValue, index) =>
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
    )
}

export { AdminPane };