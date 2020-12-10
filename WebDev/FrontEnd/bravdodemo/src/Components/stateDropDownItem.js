import React, {Fragment} from 'react';

import { Select } from 'antd';

import states from '../JSONfiles/statelist.json';

const { Option } = Select;

const stateDropDownItem = (props) => {

    const stateList = states.map(s => {
        return {
            abbr: s.abbreviation
        };
    });

    return(
        <Select
            style={{ width: 200 }}
            placeholder="Select a State"
            onChange={props.changeFn}
            defaultValue={typeof props.defaultVal !== 'undefined' ? props.defaultVal : ""}
        >
            { 
                stateList.map((l, i) => {
                    return <Select.Option key={i} value={l.abbr} >{l.abbr}</Select.Option>;
                })
            }
        </Select>
    );
};

export default stateDropDownItem;
