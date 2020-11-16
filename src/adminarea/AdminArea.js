import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Sidebar } from './Sidebar';
import { EmployeePane } from './EmployeePane'
import { PatientPane } from './PatientPane'
import { AssignmentPane } from './AssignmentPane'
import { ScrollablePane } from '../components/ScrollablePane'
import { getSortedAllPatientsList, getSortedAllEmployeesList } from '../conn/nlFirestore'

import '../styles/WorkArea.css';

const AdminArea = (props) => {
    const {
        signedInAccount,
    } = props;

    const [clickedAccount, setClickedAccount] = useState();
    const [isEmployeeEnrollment, setIsEmployeeEnrollment] = useState(true);
    const [isPatientEnrollment, setIsPatientEnrollment] = useState(false);
    const [isPatientAssignment, setIsPatientAssignment] = useState(false);
    const [isSettings, setIsSettings] = useState(false);

    const setCurrentAdminPane = (selectedPane) => {

        switch (selectedPane) {
            case 'employee-enrollment':
                setIsEmployeeEnrollment(true);
                setIsPatientEnrollment(false);
                setIsPatientAssignment(false);
                setIsSettings(false);
                break;

            case 'patient-enrollment':
                setIsEmployeeEnrollment(false);
                setIsPatientEnrollment(true);
                setIsPatientAssignment(false);
                setIsSettings(false);
                break;

            case 'patient-assignment':
                setIsEmployeeEnrollment(false);
                setIsPatientEnrollment(false);
                setIsPatientAssignment(true);
                setIsSettings(false);
                break;

            case 'settings':
                setIsEmployeeEnrollment(false);
                setIsPatientEnrollment(false);
                setIsPatientAssignment(false);
                setIsSettings(true);
                break;
        }
    }

    return (
        <div className="workarea">
            <Row id="adminarea" className="workarea p-3">
                <Col xs={2} className="bg-info sidebar-layout">
                    <Sidebar setCurrentAdminPane={setCurrentAdminPane}></Sidebar>
                </Col>
                <Col xs={10} className="bg-secondary infopane-layout">
                    {isEmployeeEnrollment && <EmployeePane clickedAccount={clickedAccount}></EmployeePane>}
                    {isPatientEnrollment && <PatientPane clickedAccount={clickedAccount}></PatientPane>}
                    {isPatientAssignment && <AssignmentPane></AssignmentPane>}
                    {isSettings && <ScrollablePane displayList={getSortedAllPatientsList()}></ScrollablePane>}
                </Col>
            </Row>
        </div>
    )
}

export { AdminArea };