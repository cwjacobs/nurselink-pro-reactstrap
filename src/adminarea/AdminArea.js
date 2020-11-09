import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Sidebar } from '../sidebar/Sidebar';
import { InfoPane } from '../infopane/InfoPane'
import './AdminArea.css';

const AdminArea = (props) => {
    const {
        signedInAccount,
    } = props;

    const [clickedAccount, setClickedAccount] = useState();
    const [sidebarBackground, setsidebarBackground] = useState("bg-info");
    const [sidebarButtonVariant, setsidebarButtonVariant] = useState("outline-info");

    return (
        <div>
            <Row id="adminarea" className={"p-3"}>
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

export { AdminArea };