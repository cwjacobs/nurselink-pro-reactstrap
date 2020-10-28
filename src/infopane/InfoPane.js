import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
                            <Table striped bordered hover size="sm" variant="light">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Medicine</th>
                                        <th>Doses/Day</th>
                                        <th>Qty/Dose</th>
                                        <th>Form Factor</th>
                                        <th>Strength</th>
                                        <th>Units</th>
                                        <th>Taken</th>
                                        <th>Skipped</th>
                                        <th>Snoozed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Atorvastatin</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>Pill</td>
                                        <td>20</td>
                                        <td>mg</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Lisinopril</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>Pill</td>
                                        <td>10</td>
                                        <td>mg</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Garlic</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>Capsule</td>
                                        <td>200</td>
                                        <td>iu</td>
                                        <td>3</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    )
}

export { InfoPane };