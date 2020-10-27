import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';

import { Sidebar } from '../sidebar/Sidebar';
import { InfoPane } from '../infopane/InfoPane'
import './ClientArea.css';

const ClientArea = (props) => {
    const navbarPadding = 60;
    const { innerHeight } = window
    const [clientAreaHeight, setClientAreaHeight] = useState();

    useEffect(() => {
        let navbarElement = document.getElementById('navbar');
        let clientAreaHeight = innerHeight - (navbarElement.offsetHeight + navbarElement.offsetTop + navbarPadding);
        setClientAreaHeight(clientAreaHeight);
    }, [innerHeight]);

    return (
        <Row className={"p-3"} style={{ height: clientAreaHeight }}>
            <Sidebar></Sidebar>
            <InfoPane></InfoPane>
        </Row>
    )
}

export { ClientArea };