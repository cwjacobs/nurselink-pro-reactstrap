import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';

import { getNurseLinkAcct } from '../conn/nlFirestore'
import { AccountCard } from './AccountCard';

import './Sidebar.css';

const Sidebar = (props) => {
    const {
        signedInAccount,
        setClickedAccount,
        sidebarButtonVariant,
    } = props;

    const sidebarAccounts = [];

    const [managedAccounts, setManagedAccounts] = useState([]);

    const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
        return currentValue.acctKey;
    })

    useEffect(() => {
        if (managedAccounts.length < accountKeys.length) {
            getAccounts(accountKeys).then(() => {
                // let accounts = sidebarAccounts.concat(sidebarAccounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                // accounts = sidebarAccounts.concat(accounts);
                setManagedAccounts([...sidebarAccounts]);

            });
        }
    });

    const getAccount = (key) => {
        return new Promise((resolve) => {
            getNurseLinkAcct(key)
                .then((result) => {
                    sidebarAccounts.push(result);
                    resolve();
                });
        });
    };

    const getAccounts = (accountKeys) => {
        return new Promise((resolve) => {
            for (const [i, value] of accountKeys.entries()) {
                getAccount(value).then(() => {
                    if (i === accountKeys.length - 1) {
                        resolve();
                    }
                });
            }
        });
    };

    return (
        <Row>
            <div className="sidebar-content">
                {managedAccounts.map((currentValue, index) =>
                    <AccountCard key={index} account={currentValue} setClickedAccount={setClickedAccount} sidebarButtonVariant={sidebarButtonVariant} />
                )}
            </div>
        </Row>
    )
}

export { Sidebar };