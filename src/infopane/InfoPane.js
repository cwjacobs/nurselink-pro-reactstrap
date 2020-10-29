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

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        setDateComponents(getDateComponents(date));

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

        let datePicker = document.getElementById('datePicker');
        datePicker.valueAsDate = date;
    }

    return (
        <div className="infopane-content">
            {clickedAccount &&
                <div>
                    <Card bg='light'>
                        <Card.Header as="h5" className='bg-info cardheader'>{`Patient: ${clickedAccount.acctInfo.firstName} ${clickedAccount.acctInfo.lastName}`}</Card.Header>
                        <Card.Body>
                            <Card.Title>Drug Regimin</Card.Title>
                            <Card.Text>Select a date below for corresponding list of medications and daily adherence.</Card.Text>
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
                            <MedTable medicineList={dailyLog ? dailyLog.medicineList : []}></MedTable>
                            <Button variant="primary" onClick={handleMostRecentClick}>Most Recent</Button>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    )
}

export { InfoPane };