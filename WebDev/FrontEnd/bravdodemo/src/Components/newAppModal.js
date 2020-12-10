import React, {Fragment, useState} from 'react';

import { Modal, Form, Button, Input, InputNumber, DatePicker, TimePicker } from 'antd';

import { RightCircleFilled } from '@ant-design/icons';

import {AddTableData, UserTableDataOut} from '../Observables/TableData';

import StateDDItem from '../Components/stateDropDownItem';

import moment from 'moment';

import 'antd/es/modal/style/css';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/date-picker/style/css';
import 'antd/es/time-picker/style/css';
import 'antd/es/input-number/style/css';

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

const NewAppModal = () => {
    const currTableData = UserTableDataOut();
    const addToTable = AddTableData();

    let formRef = React.createRef();

    const [isOpen, setIsOpen] = useState(false);
    const [currState, setCurrState] = useState("");

    const OpenModal = () => {
        if(formRef.current !== null){
            formRef.current.resetFields();
        }
        setIsOpen(true);
    }

    const CancelClose = () => {
        formRef.current.resetFields();
        setIsOpen(false);
    }
    
    const AcceptAndClose = (values) => {   
        console.log(values);

        let dateOut = moment(values.date._d).format("MM/DD/YYYY");
        let timeOut = moment(values.time._d).format("LT");

        let newItem = {
            key: currTableData.length + 1,
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
            notes: ""
        }

        console.log(newItem);
        addToTable(newItem);

        setIsOpen(false);
    }

    const SelectStateVal = (value) => {
        console.log(value);
        setCurrState(value);
    }

    return(
        <Fragment>
            <Button className="bh-btn" onClick={OpenModal}>
                <RightCircleFilled /> Add New
            </Button>
            <Modal
                className="app-Modal"
                title="Add New Application"
                visible={isOpen}
                onCancel={CancelClose}
                footer={null}
                >
                    <Form 
                        {...formLayout} 
                        ref={formRef} 
                        name="control-ref"
                        onFinish={AcceptAndClose}
                        layout="vertical"
                        size="large"
                        >
                        <Form.Item 
                                name="whom"
                                label="Scheduled to See:"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        <div className="set-single-line-start">
                            <Form.Item 
                                    name="date"
                                    label="Scheduled Date:"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                <DatePicker format={"MM/DD/YYYY"} />
                            </Form.Item>
                            <Form.Item 
                                    name="time"
                                    label="Scheduled Time:"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                            <TimePicker use12Hours format="h:mm a" />    
                            </Form.Item>
                        </div>
                        <div className="location-div">
                            <div className="location-input-div">
                                <Form.Item 
                                        name="address1"
                                        label="Location:"
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
                                    >
                                    <Input placeholder="Address 1" />
                                </Form.Item>
                                <Form.Item 
                                        name="address2"
                                    >
                                    <Input placeholder="Address 2"  />
                                </Form.Item>
                                <div className="zip-state-div">
                                    <Form.Item 
                                            name="city"
                                            rules={[
                                            {
                                                required: true,
                                            },
                                            ]}
                                        >
                                        <Input placeholder="City" />
                                    </Form.Item>
                                    <Form.Item 
                                            name="state"
                                        >
                                        <StateDDItem changeFn={SelectStateVal} />
                                    </Form.Item>
                                    <Form.Item 
                                            name="zip"
                                            rules={[
                                            {
                                                required: true,
                                            },
                                            ]}
                                        >
                                        <InputNumber min={1} max={99999}  placeholder="Zip Code" />
                                    </Form.Item>
                                    
                                </div>
                                
                            </div>
                            <div className="location-map-div"></div>
                        </div>
                        <Form.Item {...formFooterLayout}>
                            <Button className="del-btn" htmlType="button" onClick={CancelClose}>
                                Cancel
                            </Button>
                            <Button className="edit-btn" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            </Modal>
        </Fragment>
    )
};

export default NewAppModal;