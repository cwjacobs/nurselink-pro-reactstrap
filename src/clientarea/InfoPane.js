import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { Bar } from 'react-chartjs-2';

import './InfoPane.css';
import { Trends } from './Trends';
import { MedTable } from './MedTable';
import { AddMedicineModal } from '../modals/AddMedicineModal';
import { saveNurseLinkAcctData } from '../conn/nlFirestore'

import * as utils from '../utilities/utils';

const InfoPane = (props) => {
    const {
        clickedAccount,
        setsidebarBackground,
        setsidebarButtonVariant,
    } = props;

    const [date, setDate] = useState(new Date());
    const [dailyLog, setDailyLog] = useState();
    const [medicineList, setMedicineList] = useState();
    const [dateComponents, setDateComponents] = useState();
    const [infoPaneTitle, setInfoPaneTitle] = useState("Medicine Table");
    const [cardHeaderVariant, setCardHeaderVariant] = useState("bg-info");
    const [medTableButtonVariant, setMedTableButtonVariant] = useState("info");
    const [adherenceButtonVariant, setAdherenceButtonVariant] = useState("outline-primary");
    const [trendsButtonVariant, setTrendsButtonVariant] = useState("outline-success");
    const [yLower, setYLower] = useState(100);
    const [numDays, setNumDays] = useState(7);
    const [durationLabel, setDurationLabel] = useState("View Month");
    const [isAddingMed, setIsAddingMed] = useState(false);
    const [isDeletingMed, setIsDeletingMed] = useState(false);
    const [dataSets, setDataSets] = useState({
        labels: [],
        datasets: [],
    });

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
            if (dailyLog) {
                setMedicineList(dailyLog.medicineList);
            }

            const dataSets = getChartData(date, dailyLog);
            setDataSets({
                labels: dataSets.labels,
                datasets: dataSets.values,
            });
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

    // Returns requested date's daily log, or null if no matching log exists
    const getDailyLog = (selectedDate = date) => {
        let matchingDailyLog = null;
        let dc = getDateComponents(selectedDate);

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

    /// Used when "Most Recent" btn is clicked
    const getChartData = (selectedDate, selectedLog, selectedDays = numDays) => {
        let dataSets = {
            labels: [],
            datasets: [],
        }

        if (selectedLog) {
            let sortedLogs = sortDailyLogs();
            dataSets = utils.getDatasets(selectedDate, sortedLogs, selectedDays);
        }
        return dataSets;
    }

    const addMedicine = () => {
        setIsAddingMed(true);
    }

    const setLowerY = () => {
        let lower = yLower === 100 ? 0 : 100;
        setYLower(lower);
    }

    const handleDateChange = (event) => {
        let dc = getDateComponents(new Date(event.target.value)); // For some reason, if event.target.value is passed to new Date, the date returned is one day earlier
        let date = new Date(dc.year, dc.month, dc.day);
        setDate(date);
    }

    const handleMostRecentClick = () => {
        let sortedLogs = sortDailyLogs();
        let mostRecentLog = sortedLogs[sortedLogs.length - 1];
        setDailyLog(mostRecentLog);

        let date = new Date(mostRecentLog.logDate.date);
        setDate(date);

        let datePicker = document.getElementById("datePicker");
        datePicker.value = date;
    }

    const toggleDuration = () => {
        let days = numDays === 7 ? 31 : 7;
        setNumDays(days);

        let label = days === 7 ? "View Month" : "View Week";
        setDurationLabel(label);

        let chartData = getChartData(date, dailyLog, days);
        setDataSets({
            labels: chartData.labels,
            datasets: chartData.values,
        });
    }

    const displayMedicineTable = () => {
        setInfoPaneTitle("Medicine Table");
        setCardHeaderVariant("bg-info");
        setMedTableButtonVariant(medTableButtonSelected);
        setAdherenceButtonVariant(adherenceButtonUnselected);
        setTrendsButtonVariant(trendsButtonUnselected);
        setsidebarBackground("bg-info");
        setsidebarButtonVariant(medTableButtonUnselected);
    }

    const displayAdherenceChart = () => {
        setInfoPaneTitle("Adherence");
        setCardHeaderVariant("bg-primary");
        setMedTableButtonVariant(medTableButtonUnselected);
        setAdherenceButtonVariant(adherenceButtonSelected);
        setTrendsButtonVariant(trendsButtonUnselected);
        setsidebarBackground("bg-primary");
        setsidebarButtonVariant(adherenceButtonUnselected);

        let chartData = getChartData(date, dailyLog);
        setDataSets({
            labels: chartData.labels,
            datasets: chartData.values,
        });
    }

    const displayTrendsChart = () => {
        setInfoPaneTitle("Trends");
        setCardHeaderVariant("bg-success");
        setMedTableButtonVariant(medTableButtonUnselected);
        setAdherenceButtonVariant(adherenceButtonUnselected);
        setTrendsButtonVariant(trendsButtonSelected);
        setsidebarBackground("bg-success");
        setsidebarButtonVariant(trendsButtonUnselected);
    }

    const addNewMedicine = (medicineInfo) => {
        let updatedList = [...medicineList, medicineInfo];
        setMedicineList(updatedList);

        let updatedDailyLog = dailyLog;
        updatedDailyLog.medicineList = updatedList;
        setDailyLog(updatedDailyLog);
    }

    const deleteMedicine = (medicineName) => {
        setIsDeletingMed(true);

        let updatedList = medicineList.filter((el) => {
            return (el.name !== medicineName);
        });
        setMedicineList(updatedList);

        let updatedDailyLog = dailyLog;
        updatedDailyLog.medicineList = updatedList;
        setDailyLog(updatedDailyLog);

        saveNurseLinkAcctData(clickedAccount)
            .then(() => {
                setIsDeletingMed(false);
            })
    }

    return (
        <div className="infopane-content">
            {clickedAccount &&
                <div>
                    <Card bg='light'>
                        <Card.Header as="h3" className={`${cardHeaderVariant} cardheader`}>{`Patient: ${clickedAccount.acctInfo.firstName} ${clickedAccount.acctInfo.lastName}`}</Card.Header>
                        <Card.Body>
                            <Card.Title as="h4" className="cardtitle">{infoPaneTitle}</Card.Title>
                            {/* <Card.Text style={{ textAlign: "left" }}>Select a date below for corresponding list of medications and daily adherence.</Card.Text> */}
                            {/* {isDeletingMed && <Spinner variant="danger" className="signin-button" animation="border" size="lg" />} */}
                            <Row>
                                <Col xs={2}>
                                    <Form.Group>
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control id="datePicker" type="date" onChange={(event) => handleDateChange(event)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    {dateComponents && <h5 className="datedisplay">{`${dateComponents.monthName} ${dateComponents.day}, ${dateComponents.year}`}</h5>}
                                </Col>
                            </Row>
                            <Row className="medtable-container">
                                {/* property passed to Bar/Line charts must be named "data" */}
                                <Col xs={12}>
                                    {(medTableButtonVariant === medTableButtonSelected ? true : false)
                                        && <MedTable medicineList={dailyLog ? medicineList : []} deleteMedicine={deleteMedicine}></MedTable>}

                                    {isAddingMed && <AddMedicineModal setIsAddingMed={setIsAddingMed} addNewMedicine={addNewMedicine}></AddMedicineModal>}
                                    {/* {isDeletingMed && <DeleteMedicineModal setIsDeletingMed={setIsDeletingMed} addNewMedicine={addNewMedicine}></DeleteMedicineModal>} */}

                                    {(adherenceButtonVariant === adherenceButtonSelected ? true : false)
                                        && <Bar data={dataSets} options={{
                                            // responsive: true,
                                            maintainAspectRatio: false,
                                        }}>
                                        </Bar>}

                                    {(trendsButtonVariant === trendsButtonSelected ? true : false)
                                        && <Trends className="trends" chartData={dataSets} yLower={yLower}></Trends>}
                                </Col>
                            </Row>
                            <Row className="medtable-button-row">
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant="outline-secondary" onClick={handleMostRecentClick}>Most Recent</Button>
                                </Col>
                                <Col xs={3}>
                                    <Row>
                                        <Col xs={8}>
                                            <Button className="medtable-buttons" variant={medTableButtonVariant} onClick={displayMedicineTable}>Medicine Table</Button>
                                        </Col>
                                        <Col xs={5} style={{ marginLeft: "-3.8vw" }}>
                                            <Button disabled={medTableButtonVariant === medTableButtonUnselected ? true : false} variant={medTableButtonUnselected} onClick={addMedicine}> + </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant={adherenceButtonVariant} onClick={displayAdherenceChart}>Adherence</Button>
                                </Col>
                                <Col xs={3}>
                                    <Row>
                                        <Col xs={8}>
                                            <Button className="medtable-buttons" variant={trendsButtonVariant} onClick={displayTrendsChart}>Trends</Button>
                                        </Col>
                                        <Col xs={5} style={{ marginLeft: "-3.8vw" }}>
                                            <Button disabled={trendsButtonVariant === trendsButtonUnselected ? true : false} variant={trendsButtonUnselected} onClick={setLowerY}> y </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <Button className="medtable-buttons" variant={"warning"} disabled={medTableButtonVariant === medTableButtonUnselected ? true : false} onClick={toggleDuration} disabled={medTableButtonVariant === medTableButtonUnselected ? false : true} >{durationLabel}</Button>
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