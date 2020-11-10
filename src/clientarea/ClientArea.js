import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Sidebar } from './Sidebar';
import { InfoPane } from './InfoPane'
import './ClientArea.css';

const ClientArea = (props) => {
    const {
        signedInAccount,
    } = props;

    const [clickedAccount, setClickedAccount] = useState();
    const [sidebarBackground, setsidebarBackground] = useState("bg-info");
    const [sidebarButtonVariant, setsidebarButtonVariant] = useState("outline-info");

    return (
        <div className="clientArea">
            <Row id="clientarea" className={"p-3"}>
                <Col xs={2} className="bg-dark sidebar-layout">
                    <Sidebar signedInAccount={signedInAccount} setClickedAccount={setClickedAccount} sidebarButtonVariant={sidebarButtonVariant}></Sidebar>
                </Col>
                <Col xs={10} className="bg-dark infopane-layout">
                    <InfoPane clickedAccount={clickedAccount} setsidebarBackground={setsidebarBackground} setsidebarButtonVariant={setsidebarButtonVariant}></InfoPane>
                </Col>
            </Row>
        </div>
    )
}

export { ClientArea };