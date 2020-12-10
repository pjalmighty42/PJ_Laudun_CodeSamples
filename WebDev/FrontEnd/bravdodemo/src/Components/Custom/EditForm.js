import React, { useState, useEffect } from 'react';

import { Input, InputNumber, DatePicker, TimePicker, Button } from 'antd';
import {SyncOutlined, CheckOutlined} from '@ant-design/icons'

import {EditTableData, GetItemByKey} from '../../Observables/TableData';

import StateDDItem from '../stateDropDownItem';

import moment from 'moment';

import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/date-picker/style/css';
import 'antd/es/time-picker/style/css';
import 'antd/es/input-number/style/css';

const CustomEditForm = (props) => {
    const [currState, setCurrState] = useState("");
    const [passedID, setPassedID] = useState(0);
    const [passedObj, setPassedObj] = useState({});

    const editToTable = EditTableData();
    const getItemByID = GetItemByKey();

    useEffect(()=>{
        setPassedID(props.keyIn);
        setPassedObj(props.currApp);

        console.log(passedObj);
    });
    
    const SelectStateVal = (value) => {
        console.log(value);
        setCurrState(value);
    }

    const editCurrentRow = (values) => {
        console.log("Form infO: " + values);
        //The getByKey() gets the base object (obj directly pulled from the DB), 
        //this needs to be broken down into an object the table can understand
        //I.E.- The only thing the table needs for Location is City, State, not the whole Location object
        let passedObj = passedObj;
        console.log("Passed info: " + passedObj)
        
        let itemByIDObj = getItemByID(passedID);
        console.log("DB info: " + itemByIDObj)
    };

    return(
        <form className="ant-form ant-form-vertical ant-form-large" onSubmit={editCurrentRow}>
            <label for="whom">Scheduled to See:</label>
            <Input name="whom" value={passedObj.whom} required />
            <div className="set-single-line-start">
                <label for="date">Scheduled Date:</label>
                <DatePicker name="date" defaultValue={moment(passedObj.date, "MM/DD/YYYY")} format={"MM/DD/YYYY"}  required />
                <label for="time">Scheduled Time:</label>
                <TimePicker name="time" use12Hours defaultValue={moment(passedObj.time, "HH:mm a")} format={"HH:mm a"} required />
            </div>
            <div className="location-div">
                <div className="location-input-div">
                    <label for="address1">Address 1:</label>
                    <Input name="address1" value={passedObj.address1} required />
                    <label for="address2">Address 2:</label>
                    <Input name="address2" value={passedObj.address1} />
                    <label for="city">City:</label>
                    <Input name="city" value={passedObj.city} required />
                    <label>State
                        <StateDDItem changeFn={SelectStateVal} defaultVal={passedObj.state}/>
                    </label>
                    <label for="zip">City:</label>
                    <InputNumber name="zip" min={1} max={99999} defaultValue={passedObj.zip} placeholder="Zip Code" />
                </div>
                <div className="location-map-div"></div>
            </div>
            <div class="ant-row ant-form-item">
                <div class="ant-col ant-col-24 ant-form-item-control">
                    <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                            <Button className="del-btn" htmlType="reset">
                                <SyncOutlined />  Reset
                            </Button>
                            <Button className="edit-btn" htmlType="submit">
                            <CheckOutlined />  Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CustomEditForm;