import { Card, Col } from 'antd';

export default function LinkCellCard(props){

    return(
        <Col span={8}>
            <Card title="Card title" bordered={false}>
            Card content
            </Card>
        </Col>
    );
}