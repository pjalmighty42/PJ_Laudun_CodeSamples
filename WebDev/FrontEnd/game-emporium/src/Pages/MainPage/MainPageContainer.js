
import { Layout } from 'antd';

export default function MainPageContainer(props){
    return(
        <Layout className="layout">
            <div id="titleheader">
                <h1>PJ's Game Emporium!</h1>
            </div>
            {props.children}
        </Layout>
    );
}