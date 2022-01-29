import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import {getLinkObjectList} from '../../../GlobalHelper/LinkHelper';

const { Header } = Layout;

export default function MainNavigation () {
    const linkList = getLinkObjectList();

    const LinkOutput = () => {
        return linkList.map(link => {
            return <Menu.Item key={link.id}>
                <Link to={'/' + link.toLoc}>
                    {link.title}
                </Link>
            </Menu.Item>
        });
    }

    return(
        <Header>
            <Menu theme="light" mode="horizontal">
                <LinkOutput />
            </Menu>
        </Header>
    );
}