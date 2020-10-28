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
                            <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                            <MedTable></MedTable>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    )
}

export { InfoPane };