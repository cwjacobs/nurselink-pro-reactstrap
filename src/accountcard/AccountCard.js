import React from 'react';
import Button from 'react-bootstrap/Button';

import './AccountCard.css';

const AccountCard = (props) => {
    const {
        text,
        account,
        setClickedAccount,
    } = props;

    const onClickHandler = () => {
        setClickedAccount(account);
    }

    return (
        <Button variant="outline-info" className="bg-dark accountbtn" onClick={onClickHandler}>{text}</Button>
    )
}

export { AccountCard }
