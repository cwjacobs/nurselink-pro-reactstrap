import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { Bar } from 'react-chartjs-2';

import './InfoPane.css';
import { MedTable } from '../medtable/MedTable';
import { Trends } from '../trends/Trends';

import * as utils from '../utilities/utils';

const InfoPane = (props) => {
    const {
        clickedAccount,
        setsidebarBackground,
        setsidebarButtonVariant,
    } = props;

    const [date, setDate] = useState(new Date());
    const [dailyLog, setDailyLog] = useState();
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
    const [addMedFormFactor, setAddMedFormFactor] = useState();
    const [addMedStrengthUnits, setAddMedStrengthUnits] = useState();
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
        // alert(`addMedicine`);
        setIsAddingMed(true);
    }

    const closeModal = () => {
        setIsAddingMed(false);
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

        // setFocusColor();
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

    const getUUID = () => {
        let uuid = Math.round(Math.random() * 10000).toString();
        return uuid;
    }

    const saveMedicine = () => {
        let uuidNameElement = document.getElementById("addmed-uuid");
        let medicineNameElement = document.getElementById("addmed-medicineName");
        let numDailyDosesElement = document.getElementById("addmed-numDailyDoses");
        let quantityPerDoseElement = document.getElementById("addmed-quantityPerDose");
        let strengthElement = document.getElementById("addmed-strength");

        // let dosesPerDay;
        // if (!isNumeric(selectedDosesPerDay)) {
        //     alert(`Doses/Day '${selectedDosesPerDay}' is not a number, please use only digits`);
        //     return;
        // }
        // else {
        //     dosesPerDay = Number(selectedDosesPerDay);
        //     setSelectedDosesPerDay(dosesPerDay);
        // }

        // let quantityPerDose;
        // if (!isNumeric(selectedQuantityPerDose)) {
        //     alert(`Qty/Dose '${selectedQuantityPerDose}' is not a number, please use only digits`);
        //     return;
        // }
        // else {
        //     quantityPerDose = Number(selectedQuantityPerDose);
        //     setSelectedQuantityPerDose(quantityPerDose);
        // }

        // let strength;
        // if (!isNumeric(selectedStrength)) {
        //     alert(`Strength '${selectedStrength}' is not a number, please use only digits`);
        //     return;
        // }
        // else {
        //     strength = Number(selectedStrength);
        //     setSelectedStrength(strength);
        // }

        // if (!selectedFormFactor) {
        //     alert(`Please select a value for 'Form Factor'`);
        //     return;
        // }

        // if (!selectedUnits) {
        //     alert(`Please select a value for 'Units'`);
        //     return;
        // }

        let medicineInfo = {
            uuid: uuidNameElement.innerText,
            name: medicineNameElement.value,
            numDailyDoses: numDailyDosesElement.value,
            quantityPerDose: quantityPerDoseElement.value,
            formFactor: addMedFormFactor,
            strength: strengthElement.value,
            strengthUnits: addMedStrengthUnits,
            numDosesTaken: 0,
            numDosesSkipped: 0,
            numDosesSnoozed: 0,
            doseSchedule: [],
            dateAdded: utils.parseDate(new Date()),
        }
        // let updatedList = [...editedList, medicineInfo]

        // setEditedList(updatedList);
        // isAdding = true;
        setIsAddingMed(false);
    }

    const handleFormFactorChange = (event) => {
        setAddMedFormFactor(event.target.value);
    }

    const handleStrengthUnitsChange = (event) => {
        setAddMedStrengthUnits(event.target.value);
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
                                        && <MedTable medicineList={dailyLog ? dailyLog.medicineList : []}></MedTable>}

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

                            {/***  Modal dialog to add medicine to Medicine Table ***/}
                            <Modal size="xl" centered show={isAddingMed}>
                                <Modal.Header className="bg-info">
                                    <Modal.Title className="text-white">Add Medicine</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <h4>Centered Modal</h4> */}
                                    <Table className="medtable" responsive="sm" striped bordered hover size="sm" variant="light">
                                        <thead>
                                            <tr style={{ textAlign: "center" }}>
                                                <th style={{ textAlign: "center" }}>Id</th>
                                                <th style={{ textAlign: "left", paddingLeft: "14px", width: "40%" }}>Medicine</th>
                                                <th>Doses/Day</th>
                                                <th>Qty/Dose</th>
                                                <th style={{ width: "12%" }}>Form Factor</th>
                                                <th>Strength</th>
                                                <th style={{ width: "12%" }}>Units</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ textAlign: "center" }} className="data-row">
                                                <td id="addmed-uuid" style={{ textAlign: "left", paddingLeft: ".5vw", paddingTop: "10px" }}>{getUUID()}</td>
                                                <td style={{ textAlign: "left" }}>
                                                    <InputGroup><FormControl id="addmed-medicineName" placeholder="Medicine"></FormControl></InputGroup>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <InputGroup><FormControl id="addmed-numDailyDoses" placeholder="Doses/Day"></FormControl></InputGroup>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <InputGroup><FormControl id="addmed-quantityPerDose" placeholder="Qty/Dose"></FormControl></InputGroup>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <Form.Group controlId="addmed-formfactor">
                                                        {/* <Form.Label>Select</Form.Label> */}
                                                        <Form.Control as="select" onChange={handleFormFactorChange}>
                                                            <option>Select...</option>
                                                            <option>Pill</option>
                                                            <option>Powder</option>
                                                            <option>Solution</option>
                                                            <option>Drops</option>
                                                            <option>Inhaler</option>
                                                            <option>Injection</option>
                                                            <option>Other</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <InputGroup><FormControl id="addmed-strength" placeholder="Strength"></FormControl></InputGroup>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <Form.Group controlId="addmed-units">
                                                        {/* <Form.Label>Select</Form.Label> */}
                                                        <Form.Control as="select" onChange={handleStrengthUnitsChange}>
                                                            <option>Select...</option>
                                                            <option>g</option>
                                                            <option>mg</option>
                                                            <option>ml</option>
                                                            <option>iu</option>
                                                            <option>mcg</option>
                                                            <option>meq</option>
                                                            <option>mgml</option>
                                                            <option>mcgml</option>
                                                            <option>percent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant={"outline-info"} onClick={closeModal}>Cancel</Button>
                                    <Button variant={"info"} onClick={saveMedicine}>Save</Button>
                                </Modal.Footer>
                            </Modal>
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