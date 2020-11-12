import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Sidebar } from './Sidebar';
import { EmployeePane } from './EmployeePane'
import { AssignmentPane } from './AssignmentPane'
import './AdminArea.css';

const AdminArea = (props) => {
    const {
        signedInAccount,
    } = props;

    const [clickedAccount, setClickedAccount] = useState();
    const [isEmployeeAdmin, setIsEmployeeAdmin] = useState(true);
    const [isPatientAllocation, setIsPatientAllocation] = useState(false);

    const setCurrentAdminPane = (selectedPane) => {
        if (selectedPane === 'enrollment') {
            setIsEmployeeAdmin(true);
            setIsPatientAllocation(false);
        }
        else {
            setIsEmployeeAdmin(false);
            setIsPatientAllocation(true);
        }
    }

    return (
        <div>
            <Row id="adminarea" className={"p-3"}>
                <Col xs={2} className="bg-info sidebar-layout">
                    <Sidebar setCurrentAdminPane={setCurrentAdminPane}></Sidebar>
                </Col>
                <Col xs={10} className="bg-info infopane-layout">
                    {isEmployeeAdmin && <EmployeePane clickedAccount={clickedAccount}></EmployeePane>}
                    {isPatientAllocation && <AssignmentPane clickedAccount={clickedAccount}></AssignmentPane>}
                </Col>
            </Row>
        </div>
    )
}

export { AdminArea };