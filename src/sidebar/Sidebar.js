import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { getNurseLinkAcct } from '../conn/nlFirestore'
import { AccountCard } from '../accountcard/AccountCard';

import './Sidebar.css';

const Sidebar = (props) => {
    const {
        signedInAccount,
        setClickedAccount,
    } = props;

    const sidebarAccounts = [];

    const [managedAccounts, setManagedAccounts] = useState([]);

    const accountKeys = signedInAccount.user.accountsSharedToMe.map((currentValue) => {
        return currentValue.acctKey;
    })

    useEffect(() => {
        if (managedAccounts.length < accountKeys.length) {
            getAccounts(accountKeys).then(() => {
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

    const getAccountLabel = (account) => {
        return (`${account.acctInfo.firstName} ${account.acctInfo.lastName}`);
    }

    return (
        <Row>
            <div className="sidebar-content">
                {managedAccounts.map((currentValue, index) =>
                    <AccountCard key={index} text={getAccountLabel(currentValue)} account={currentValue} setClickedAccount={setClickedAccount} />
                )}
            </div>
        </Row>
    )
}

export { Sidebar };