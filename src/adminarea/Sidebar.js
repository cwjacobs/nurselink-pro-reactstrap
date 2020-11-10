import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';

import { getEmployeeList } from '../conn/nlFirestore'
import { EmployeeCard } from './EmployeeCard';

import './Sidebar.css';

const Sidebar = (props) => {
    const {
        signedInAccount,
        setClickedAccount,
        sidebarButtonVariant,
    } = props;

    let sidebarAccounts = [];
    const [managedAccounts, setManagedAccounts] = useState([]);

    // const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
    //     return currentValue.acctKey;
    // })

    useEffect(() => {
        sidebarAccounts = getEmployeeList(signedInAccount);
        setManagedAccounts([...sidebarAccounts]);
    }, [sidebarAccounts]);

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
        <Row>
            <div className="sidebar-content">
                {managedAccounts.map((currentValue, index) =>
                    <EmployeeCard key={index} employee={currentValue} />
                )}
            </div>
        </Row>
    )
}

export { Sidebar };