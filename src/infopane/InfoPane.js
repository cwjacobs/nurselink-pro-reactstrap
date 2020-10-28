import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MedTable } from '../medtable/MedTable';

import './InfoPane.css';

const InfoPane = (props) => {
    const {
        clickedAccount,
    } = props;

    return (
        <div className="infopane-content">
            {clickedAccount &&
                <div>
                    <Card bg='light'>
                        <Card.Header as="h5" className='bg-info cardheader'>{`Patient: ${clickedAccount.acctInfo.firstName} ${clickedAccount.acctInfo.lastName}`}</Card.Header>
                        <Card.Body>
                            <Card.Title>Drug Regimin</Card.Title>
                            <Card.Text>Select a date below for corresponding list of medications and daily adherence.</Card.Text>
                            <MedTable clickedAccount={clickedAccount}></MedTable>
                            <Button variant="primary">Adherence</Button>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    )
}

export { InfoPane };