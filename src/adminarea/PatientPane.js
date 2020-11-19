import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PatientCard } from './PatientCard';

import { Container } from 'react-bootstrap';
import { EditPatientModal } from '../modals/EditPatientModal';
import { enrollmentStatus } from '../models/enums';
import { getSortedAllPatientsList } from '../conn/nlFirestore'

const PatientPane = (props) => {
    const {
    } = props;

    const [patientAccounts, setPatientAccounts] = useState([]);
    const [crntPatient, setCrntPatient] = useState();
    const [isEditingPatient, setIsEditingPatient] = useState(false);

    // const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
    //     return currentValue.acctKey;
    // })

    useEffect(() => {
        let statusElement = document.getElementById('status-filter');
        let filteredList = getFilterPatientList(statusElement.value);
        setPatientAccounts(filteredList);
    }, []);

    const getFilterPatientList = (status) => {
        let allPatientsList = getSortedAllPatientsList();
        if (status === 'All') {
            return (allPatientsList);
        }
        else {
            let filteredList = allPatientsList.filter((el) => {
                return (el.status === status);
            });
            return (filteredList);
        }
    }

    const handleAddPatient = () => {
        let patient = {
            patientId: Math.round(Math.random() * 10000).toString(),
            acctKey: "",
            email: "",
            firstName: "",
            lastName: "",
            title: "",
            startDate: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            status: "Not Enrolled",
        }
        setCrntPatient(patient);
        setIsEditingPatient(true);
    }

    const handlePatientEdit = (patient) => {
        setIsEditingPatient(true);
        setCrntPatient(patient);
    }

    const handlePatientSave = (patient) => {
        setIsEditingPatient(false);
    }

    const handleStatusChange = (event) => {
        let filteredList = getFilterPatientList(event.target.value);
        setPatientAccounts(filteredList);
    }

    const BANNER_STYLE = {
        color: "white",
        display: "flex",
        justifyContent: "flex-start",
        margin: "0px 3px",
        padding: "6px",
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

    const LABEL_STYLE = {
        width: "60%",
        fontWeight: "bolder",
        marginTop: "1vh",
    }

    const BUTTON_STYLE = {
        width: "3%",
        fontWeight: "bolder",
        margin: "8px",
    }

    const FILTER_STYLE = {
        display: "flex",
        width: "50%",
        marginTop: "1vh",
    }

    return (
        <div>
            <div className="bg-secondary" style={BANNER_STYLE}>
                <Button variant="outline-light" style={BUTTON_STYLE} onClick={handleAddPatient}>+</Button>
                <h3 style={LABEL_STYLE}>Patients</h3>
                <div style={FILTER_STYLE}>
                    <Form.Label as="h5" className="mt-1" style={LABEL_STYLE}>Enrollment Status:</Form.Label>
                    <Form.Control id='status-filter' as="select" defaultValue="Enrolled" onChange={handleStatusChange}>
                        {enrollmentStatus.map(opt => (<option value={opt.value}>{opt.label}</option>))}
                    </Form.Control>
                </div>
            </div>
            <div className="bg-dark" style={CONTENT_STYLE}>
                <Row>
                    {
                        patientAccounts.map((currentValue, index) =>
                            <Col xs={3} style={{ marginTop: "1vw" }}>
                                <PatientCard key={index} patient={currentValue} footerButtonText={`Edit`} handleOnClick={handlePatientEdit} />
                            </Col>
                        )
                    }
                </Row>
                {isEditingPatient
                    &&
                    <EditPatientModal patient={crntPatient} handleEmployeeSave={handlePatientSave}></EditPatientModal>
                }
            </div>
        </div>
    )
}

export { PatientPane };