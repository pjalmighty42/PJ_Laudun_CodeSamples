
import { Layout } from 'antd';

export default function MainPageContainer(props){
    return(
        <Layout>
            {props.children}
        </Layout>
    );
}