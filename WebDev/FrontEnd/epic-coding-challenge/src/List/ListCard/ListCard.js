import { useState } from "react";
import { Card, Image, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function ListMain(props) {
  const [editPerson, setEditPerson] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  let { first, last } = props.person.name;
  let { large } = props.person.picture;
  let { state, city } = props.person.location;
  let { email } = props.person.email;

  let fullName = first + " " + last;
  let cityState = city + ", " + state;

  let listInfoDiv = "";
  let nameSpan = "";

  if (editPerson) {
    nameSpan = <span className="listName">{fullName}</span>;
    listInfoDiv = (
      <div className="listInfo">
        <form
          name="personLocationContactForm">
            <label> Email:
              <input type="email" allowClear placeholder={email} onChange={(e) => setEmailInput(e.target.value)}/>
            </label>
          <Button danger size="small" onClick={() => setEditPerson(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => {
              console.log(emailInput)
              let data = {id: props.id, email: emailInput};
              props.editPersonFn(data);
              setEditPerson(false);
            }}>
              Submit
          </Button>
        </form>
      </div>
    );
  } else {
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
