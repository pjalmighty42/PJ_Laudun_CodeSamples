import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function MainNavigation (props) {
    return(
        <Header>
            <div>PJ's Gaming Emporium!</div>
            <Menu theme="light" mode="horizontal">
                {
                    props.links.map(link => {
                        return <Link to={'/' + link.toLoc}>
                            <Menu.Item key={link.id}>
                                {link.title}
                            </Menu.Item>
                        </Link>
                    })
                }
            </Menu>
        </Header>
    );
}