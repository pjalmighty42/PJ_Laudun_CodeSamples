import { Card, Col, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function ErrorMain() {
  return (
    <div id="listContainer">
      <Row>
        <Col id="listOutput" span={24}>
          <Card style={{ width: 600 }}>
            <ExclamationCircleOutlined />
            <h1 type="danger">Error! No Data Found!</h1>
            <ExclamationCircleOutlined />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
