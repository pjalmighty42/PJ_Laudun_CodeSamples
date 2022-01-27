import {React} from 'react';

import { Layout } from "antd";

const { Content } = Layout;

export default function HomePage (props){
    return(
        <Content id="home">
            {props.children}
        </Content>
    );
}