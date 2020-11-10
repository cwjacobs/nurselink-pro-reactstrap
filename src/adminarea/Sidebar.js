import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { getEmployeeList } from '../conn/nlFirestore'
import { EmployeeCard } from './EmployeeCard';

import './Sidebar.css';

const Sidebar = (props) => {
    const {
        signedInAccount,
        setClickedAccount,
        sidebarButtonVariant,
    } = props;

    let sidebarFunctions = ["Employees", "Patients"];

    // const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
    //     return currentValue.acctKey;
    // })

    // useEffect(() => {
    //     sidebarFunctions = getEmployeeList(signedInAccount);
    //     setManagedAccounts([...sidebarFunctions]);
    // }, [sidebarFunctions]);

    // const getAccount = (key) => {
    //     return new Promise((resolve) => {
    //         getNurseLinkAcct(key)
    //             .then((result) => {
    //                 sidebarAccounts.push(result);
    //                 resolve();
    //             });
    //     });
    // };

    // const getAccounts = (accountKeys) => {
    //     return new Promise((resolve) => {
    //         for (const [i, value] of accountKeys.entries()) {
    //             getAccount(value).then(() => {
    //                 if (i === accountKeys.length - 1) {
    //                     resolve();
    //                 }
    //             });
    //         }
    //     });
    // };

    return (
        <Col>
            {/* <div className="sidebar-content"> */}
            {sidebarFunctions.map((currentValue, index) =>
                <Button variant="outline-dark" style={{ width: "100%", margin: "5px" }} key={index}>{currentValue}</Button>
            )}
            {/* </div> */}
        </Col>
    )
}

export { Sidebar };