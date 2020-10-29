import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Sidebar } from '../sidebar/Sidebar';
import { InfoPane } from '../infopane/InfoPane'
import './ClientArea.css';

const ClientArea = (props) => {
    const { setAppHeight, signedInAccount } = props;

    const navbarPadding = 30;
    const { innerHeight } = window

    const [clickedAccount, setClickedAccount] = useState();
    const [clientAreaHeight, setClientAreaHeight] = useState();

    useEffect(() => {
        let navbarElement = document.getElementById('navbar');
        let minClientAreaHeight = innerHeight - (navbarElement.offsetHeight + navbarElement.offsetTop + navbarPadding);

        let clientAreaElement = document.getElementById('clientarea');
        let crntClientAreaHeight = clientAreaElement.clientHeight;

        let clientAreaHeight = crntClientAreaHeight < minClientAreaHeight ? minClientAreaHeight : crntClientAreaHeight;
        setClientAreaHeight(clientAreaHeight);

        let crntAppHeight = clientAreaHeight + (navbarElement.offsetHeight + navbarElement.offsetTop + navbarPadding)
        setAppHeight(crntAppHeight);
    }, [innerHeight, setAppHeight, signedInAccount]);

    return (
        <Row id="clientarea" className={"p-3"} style={{ height: clientAreaHeight }}>
            <Col xs={2} className="bg-info sidebar-layout">
                <Sidebar signedInAccount={signedInAccount} setClickedAccount={setClickedAccount}></Sidebar>
            </Col>
            <Col xs={10} className="bg-dark infopane-layout">
                <InfoPane clickedAccount={clickedAccount}></InfoPane>
            </Col>
        </Row>
    )
}

export { ClientArea };