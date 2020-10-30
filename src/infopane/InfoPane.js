import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import './InfoPane.css';
import { MedTable } from '../medtable/MedTable';

const InfoPane = (props) => {
    const {
        clickedAccount,
    } = props;

    const [date, setDate] = useState(new Date());
    const [dailyLog, setDailyLog] = useState();
    const [dateComponents, setDateComponents] = useState();
    const [infoPaneTitle, setInfoPaneTitle] = useState("Medicine Table");
    const [cardHeaderVariant, setCardHeaderVariant] = useState("bg-info");
    const [medTableButtonVariant, setMedTableButtonVariant] = useState("info");
    const [adherenceButtonVariant, setAdherenceButtonVariant] = useState("outline-primary");
    const [trendsButtonVariant, setTrendsButtonVariant] = useState("outline-success");

    const medTableButtonSelected = "info";
    const medTableButtonUnselected = "outline-info";
    const adherenceButtonSelected = "primary";
    const adherenceButtonUnselected = "outline-primary";
    const trendsButtonSelected = "success";
    const trendsButtonUnselected = "outline-success";

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        setDateComponents(getDateComponents(date));

        let datePicker = document.getElementById('datePicker');
        if (datePicker) {
            datePicker.valueAsDate = date;
        }

        if (clickedAccount) {
            const dailyLog = getDailyLog(date);
            setDailyLog(dailyLog);
        }
    }, [clickedAccount, date]);

    const sortDailyLogs = () => {
        let sortedDailyLogs = [];

        months.forEach((month) => {
            let dailyLog = clickedAccount.monthlyLog.dailyLogs.filter((log) => {
                return (log.logDate.monthName === month);
            });

            if (dailyLog.length > 0) {
                sortedDailyLogs = sortedDailyLogs.concat(dailyLog);
            }
        });
        return sortedDailyLogs;
    }

    const getDailyLog = (date) => {
        let matchingDailyLog = null;
        let dc = getDateComponents(date);

        for (let dailyLog of clickedAccount.monthlyLog.dailyLogs) {
            if (dailyLog.logDate.day === dc.day
                && dailyLog.logDate.month === dc.month
                && Number(dailyLog.logDate.year) === dc.year) {
                matchingDailyLog = dailyLog;
                break;
            }
        }
        return matchingDailyLog;
    }

    const getDateComponents = (date) => {
        let dateComponents = {
            day: date.getUTCDate(),
            year: date.getUTCFullYear(),
            month: date.getMonth(),
            monthName: months[date.getMonth()],
        }
        return dateComponents;
    }

    const handleDateChange = (e) => {
        let date = new Date(e.target.value);
        setDate(date);
    }

    const handleMostRecentClick = () => {
        let sortedLogs = sortDailyLogs();
        let mostRecentLog = sortedLogs[sortedLogs.length - 1];
        setDailyLog(mostRecentLog);

        let date = new Date(mostRecentLog.logDate.date);
        setDate(date);
    }

    const displayMedicineTable = () => {
        setInfoPaneTitle("Medicine Table");
        setCardHeaderVariant("bg-info");
        setMedTableButtonVariant(medTableButtonSelected);
        setAdherenceButtonVariant(adherenceButtonUnselected);
        setTrendsButtonVariant(trendsButtonUnselected);
    }

    const displayAdherenceChart = () => {
        setInfoPaneTitle("Adherence");
        setCardHeaderVariant("bg-primary");
        setMedTableButtonVariant(medTableButtonUnselected);
        setAdherenceButtonVariant(adherenceButtonSelected);
        setTrendsButtonVariant(trendsButtonUnselected);
    }

    const displayTrendsChart = () => {
        setInfoPaneTitle("Trends");
        setCardHeaderVariant("bg-success");
        setMedTableButtonVariant(medTableButtonUnselected);
        setAdherenceButtonVariant(adherenceButtonUnselected);
        setTrendsButtonVariant(trendsButtonSelected);
    }

    return (
        <div className="infopane-content">
            {clickedAccount &&
                <div>
                    <Card bg='light'>
                        <Card.Header as="h5" className={`${cardHeaderVariant} cardheader`}>{`Patient: ${clickedAccount.acctInfo.firstName} ${clickedAccount.acctInfo.lastName}`}</Card.Header>
                        <Card.Body>
                            <Card.Title as="h4" className="cardtitle">{infoPaneTitle}</Card.Title>
                            <Card.Text style={{ textAlign: "left" }}>Select a date below for corresponding list of medications and daily adherence.</Card.Text>
                            <Row>
                                <Col xs={2}>
                                    <Form.Group controlId="medListDate">
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control id="datePicker" type="date" onChange={(e) => handleDateChange(e)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    {dateComponents && <h5 className="datedisplay">{`${dateComponents.monthName} ${dateComponents.day}, ${dateComponents.year}`}</h5>}
                                </Col>
                            </Row>
                            <Row className="medtable-container">
                                <Col xs={12}>
                                    <MedTable medicineList={dailyLog ? dailyLog.medicineList : []}></MedTable>
                                </Col>
                            </Row>
                            <Row className="medtable-button-row">
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant="outline-secondary" onClick={handleMostRecentClick}>Most Recent</Button>
                                </Col>
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant={medTableButtonVariant} onClick={displayMedicineTable}>Medicine Table</Button>
                                </Col>
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant={adherenceButtonVariant} onClick={displayAdherenceChart}>Adherence</Button>
                                </Col>
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant={trendsButtonVariant} onClick={displayTrendsChart}>Trends</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    )
}

export { InfoPane };