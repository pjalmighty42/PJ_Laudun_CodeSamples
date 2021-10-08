import { Card, Col, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function ErrorMain() {
  return (
    <div id="listContainer">
      <Row>
        <Col id="listOutputError" span={24}>
          <Card id="errorCard" style={{ width: 600, height:50 }}>
            <ExclamationCircleOutlined />
            <h1 type="danger">Error! No Data Found!</h1>
            <ExclamationCircleOutlined />
          </Card>
        </Col>
      </Row>
    </div>
  );
}