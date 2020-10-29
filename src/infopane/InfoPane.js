import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MedTable } from '../medtable/MedTable';

import './InfoPane.css';

const InfoPane = (props) => {
    const {
        clickedAccount,
    } = props;

    const [sortedDailyLogs, setSortedDailyLogs] = useState([]);

    const sortDailyLogs = (monthlyLogs) => {
        let sortedMonthlyLogs = [];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        months.forEach((month) => {
            let monthlyLog = monthlyLogs.dailyLogs.filter((log) => {
                return (log.logDate.monthName === month);
            });

            if (monthlyLog.length > 0) {
                sortedMonthlyLogs = sortedMonthlyLogs.concat(monthlyLog);
            }
        });
        return sortedMonthlyLogs;
    }

    useEffect(() => {
        if (clickedAccount) {
            const sortedLogs = sortDailyLogs(clickedAccount.monthlyLog);
            setSortedDailyLogs(sortedLogs);
        }
    }, [clickedAccount])

    let mostRecentDailyLog;
    if (sortedDailyLogs) {
        mostRecentDailyLog = sortedDailyLogs[sortedDailyLogs.length - 1];
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
                            <MedTable clickedAccount={clickedAccount} medicineList={mostRecentDailyLog ? mostRecentDailyLog.medicineList : []}></MedTable>
                            <Button variant="primary">Adherence</Button>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    )
}

export { InfoPane };