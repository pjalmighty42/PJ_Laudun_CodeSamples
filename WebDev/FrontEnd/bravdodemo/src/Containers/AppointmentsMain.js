import React, {useContext}  from 'react';

import AddNewAppModal from '../Components/newAppModal';
import TableComponent from '../Components/tableComponent';

const AppointmentsMain = () => {

    return (
        <div id="bh-appts-main">
            <div id="top-container">
                <AddNewAppModal />
                <h1>My Current Appointments</h1>
            </div>
            <TableComponent />
        </div>
    );
};

export default AppointmentsMain;