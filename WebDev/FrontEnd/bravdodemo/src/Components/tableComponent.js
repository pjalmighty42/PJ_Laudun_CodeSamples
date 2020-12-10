import React, {Fragment, useState} from 'react';

import { UserTableDataOut, RemoveTableData, GetItemByKey } from '../Observables/TableData';

import { Table, Space, Button, Modal, Form, Input, InputNumber, DatePicker, TimePicker} from 'antd';

import EditFormCustom from './Custom/EditForm';

import 'antd/es/table/style/css';

const formLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
const formFooterLayout = {
    wrapperCol: {
      span: 24,
    },
  };

const TableComponent = () => {
    const [isEditOpen, setEditOpen] = useState(false); 
    const [currApp, setCurrApp] = useState({});

    let formRef = React.createRef();

    const deleteRow = RemoveTableData();
    const getByKey = GetItemByKey();

    const openMap = (rowInfo) => {
        return {
            onClick: () => {
                console.log("Map on row: " + rowInfo);
            }
        }
    };

    const editCurrentRow = (rowInfo) => {
        console.log("Edit on row: " + rowInfo);

        console.log(getByKey(rowInfo));
        //The getByKey() gets the base object (obj directly pulled from the DB), 
        //this needs to be broken down into an object the table can understand
        //I.E.- The only thing the table needs for Location is City, State, not the whole Location object
        let selEditKey = getByKey(rowInfo);

        let locOut = selEditKey.location.city + ", " + selEditKey.location.state;

        //Now that we have the parsed object, state store it for further use
        let editObjOut = {
            key: selEditKey.key,
            date: selEditKey.date,
            time: selEditKey.time,
            whom: selEditKey.whom,
            location: locOut,
            notes: ""
        }

        setCurrApp(editObjOut);
        setEditOpen(true);
    };

    const CancelClose = () => {
        setEditOpen(false);
    };

    /*
    const EditAcceptAndClose = (values) => {   
        console.log(values);

        let dateOut = moment(values.date._d).format("MM/DD/YYYY");
        let timeOut = moment(values.time._d).format("LT");

        let editApp = {
            key: currApp.key,
            date: dateOut,
            time: timeOut,
            whom: values.whom,
            location:  {
                address1: values.address1,
                address2: typeof values.address2 === 'undefined' ? "" : values.address2,
                city: values.city,
                state: currState,
                zip: values.zip
            },
            notes: values.note
        };

        console.log(editApp);
        editToTable(editApp);

        setEditOpen(false);
    }
    */

    const delCurrentRow = (rowInfo) => {
        console.log("Delete on row: " + rowInfo);
        deleteRow(rowInfo);
    };

    const openNotesCurrRow = (rowInfo) => {
        return {
            onClick: () => {
                console.log("Edit on row: " + rowInfo);
            }
        }
    }

    const columnns = [
        {
            title: 'Date',
            dataIndex: 'date',
            defaultSortOrder: ['descend', 'ascend'],
            sorter: (a, b) => a.date - b.date
        },
        {
            title: 'Time',
            dataIndex: 'time',
            defaultSortOrder: ['descend', 'ascend'],
            sorter: (a, b) => a.time - b.time
        },
        {
            title: 'With Whom',
            dataIndex: 'whom',
            defaultSortOrder: ['descend', 'ascend'],
            sorter: (a, b) => a.whom.length - b.whom.length
        },
        {
            title: 'Location',
            dataIndex: 'location',
            defaultSortOrder: ['descend', 'ascend'],
            sorter: (a, b) => a.location.length - b.location.length,
            render: text => <a onClick={openMap}>{text}</a>,
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            render: () => <a onClick={openNotesCurrRow}>See Notes</a>,
        },
        {
            title: 'Edit/Delete?',
            key: 'action',
            render: (record) => (
            <Space size="middle">
                 <div className="tbl-btn-div">
                    <Button 
                        className="edit-btn"
                        onClick={() => editCurrentRow(record.key)}>
                            Edit
                    </Button>
                    <Modal
                        className="app-Modal"
                        title="Edit Application"
                        visible={isEditOpen}
                        onCancel={CancelClose}
                        footer={null}
                        >
                          <EditFormCustom 
                            keyIn={record.key}
                            currApp={currApp}
                          />
                    </Modal>
                    <Button 
                        className="del-btn"
                        onClick={() => delCurrentRow(record.key)}>Delete</Button>
                </div>
            </Space>
            )
        }
    ];

    const tableOut = UserTableDataOut();

    return(
        <Fragment>
            <Table 
                columns={columnns}
                pagination={'bottomCenter'}
                dataSource={tableOut}
            />
        </Fragment>
    );
};

export default TableComponent;