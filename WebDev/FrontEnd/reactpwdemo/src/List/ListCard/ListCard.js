import { useState } from "react";
import { Card, Image, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function ListMain(props) {
  const [editPerson, setEditPerson] = useState(false);

  let { first, last } = props.person.name;
  let { large } = props.person.picture;
  let { state, city } = props.person.location;

  let fullName = first + " " + last;
  let cityState = city + ", " + state;

  let listInfoDiv = "";
  let nameSpan = "";
  if (editPerson) {
    nameSpan = <span className="listName">{fullName}</span>;
    listInfoDiv = (
      <div className="listInfo">
        <Button danger size="small" onClick={() => setEditPerson(false)}>
          Cancel
        </Button>
        <Form
          name="personLocationContactForm"
          labelCol={{ span: 16 }}
          layout="vertical"
          size="small"
          wrapperCol={{ span: 16 }}
          onFinish={(data) => {
            props.editPersonFn({ id: props.id, ...data });
            setEditPerson(false);
          }}
          onFinishFailed={(err) => {
            props.editFailedFn(err);
            setEditPerson(false);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!"
              }
            ]}
          >
            <Input
              placeholder={props.person.email}
              value={props.person.email}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } 
  else{
    nameSpan = <span className="listName">{fullName}</span>;
    listInfoDiv = (
      <div className="listInfo">
        <p>{props.person.email}</p>
        <p>{props.person.phone}</p>
        <p>{cityState}</p>
      </div>
    );
  }
  
  return (
    <Card
      className="listCard"
      hoverable
      bordered={false}
      loading={props.loading}
    >
      <div className="listHeader">
        <span className="listIcon" onClick={() => setEditPerson(!editPerson)}>
          <EditOutlined />
        </span>
        {nameSpan}
      </div>
      <div className="listImg">
        <Image src={large} alt={fullName + " image"} preview={false} />
      </div>
      {listInfoDiv}
    </Card>
  );
}

ListMain.propTypes = {
  editPersonFn: PropTypes.func,
  editFailedFn: PropTypes.func,
  person: PropTypes.object,
  loading: PropTypes.bool
};
