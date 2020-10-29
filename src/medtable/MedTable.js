import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import '../infopane/InfoPane.css';

const MedTable = (props) => {
    const {
        medicineList,
    } = props;

    useEffect(() => {
    })

    return (
        <div>
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
                    {medicineList && medicineList.map((currentValue, index) =>
                        <tr key={index} className="data-row">
                            <td>{currentValue.uuid}</td>
                            <td>{currentValue.name}</td>
                            <td>{currentValue.numDailyDoses}</td>
                            <td>{currentValue.quantityPerDose}</td>
                            <td>{currentValue.formFactor}</td>
                            <td>{currentValue.strength}</td>
                            <td>{currentValue.strengthUnits}</td>
                            <td>{currentValue.numDosesTaken}</td>
                            <td>{currentValue.numDosesSkipped}</td>
                            <td>{currentValue.numDosesSnoozed}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export { MedTable }


