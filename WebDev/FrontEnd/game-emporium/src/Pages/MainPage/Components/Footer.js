import { Layout } from 'antd';

const { Footer } = Layout;

export default function FooterMain() {
    return(
        <Footer>PJ's Game Emporium, ©{new Date().getFullYear()}, Created by PJ Laudun.</Footer>
    );
}