import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import '../styles/AccountCard.css';

const AccountCard = (props) => {
    const {
        account,
        setClickedAccount,
        sidebarButtonVariant,
    } = props;

    const onClickHandler = (e) => {
        setClickedAccount(account);
    }

    const getButtonText = () => {
        return (`${account.acctInfo.firstName} ${account.acctInfo.lastName}`);
    }

    return (
        <Button id={`${account.acctInfo.firstName}-${account.acctInfo.lastName}`} variant={sidebarButtonVariant} className="accountbtn" onClick={(e) => onClickHandler(e)}>{getButtonText()}</Button>
    )
}

export { AccountCard }
