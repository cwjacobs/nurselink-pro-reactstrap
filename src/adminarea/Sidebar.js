import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { getAllEmployeesList } from '../conn/nlFirestore'
import { EmployeeCard } from './EmployeeCard';

import './Sidebar.css';

const Sidebar = (props) => {
    const {
        setCurrentAdminPane,
    } = props;

    let sidebarFunctions = ["Enrollment", "Patient Assignment"];

    const handleClick = (event) => {
        let selectedPane = event.target.id.toLowerCase();
        setCurrentAdminPane(selectedPane);
    }

    return (
        <Col>
            <div className="sidebar-content">
                {sidebarFunctions.map((currentValue, index) =>
                    <Button variant="outline-secondary" id={currentValue} style={{ width: "100%", height: "60px", margin: "5px", color: "white" }} key={index} onClick={handleClick}>{currentValue}</Button>
                )}
            </div>
        </Col>
    )
}

export { Sidebar };