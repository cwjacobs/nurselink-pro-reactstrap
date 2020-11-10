import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Sidebar } from './Sidebar';
import { AdminPane } from './AdminPane'
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
                <Col xs={2} className="bg-info sidebar-layout">
                    <Sidebar signedInAccount={signedInAccount} setClickedAccount={setClickedAccount} sidebarButtonVariant={sidebarButtonVariant}></Sidebar>
                </Col>
                <Col xs={10} className="bg-info infopane-layout">
                    <AdminPane clickedAccount={clickedAccount} setsidebarBackground={setsidebarBackground} setsidebarButtonVariant={setsidebarButtonVariant}></AdminPane>
                </Col>
            </Row>
        </div>
    )
}

export { AdminArea };