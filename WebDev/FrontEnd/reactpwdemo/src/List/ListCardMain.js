import { useState } from "react";
import { Card, Col, Row, List, Space, Input } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsError, setListModified } from "../App/Features/listSlice";

import ListCard from "./ListCard/ListCard";

const selectedSortStyle = {
  color: "rgb(36, 67, 153)"
};

const { Search } = Input;

export default function ListMain() {
  const dispatch = useDispatch(); //to store edits

  //Page Loading & Error handling
  const isLoading = useSelector((state) => state.list.isLoading);
  //Person List modification (the uuid for person)
  const personListBase = useSelector((state) => state.list.personListBase);
  const personListModified = useSelector((state) => state.list.personListModified);

  /*
  Created these 4 state vars to handle sorting and switching from Asc/Desc sort
  as well as from First and Last name sorting
  */
  const [sortFirstNameAscSelected, setSortFirstNameAscSelected] = useState(
    false
  );
  const [sortFirstNameDescSelected, setSortFirstNameDescSelected] = useState(
    false
  );
  const [sortLastNameAscSelected, setSortLastNameAscSelected] = useState(false);
  const [sortLastNameDescSelected, setSortLastNameDescSelected] = useState(
    false
  );

  /**
   * data: {id: persId (uuid), email: email}
   * @param {*} data 
   */
  const editPerson = (data) => {
    //This is a multi-step process because JS
    //First create a copy of the modified list (to allow us to edit a read-only array)
    let editList = [...personListModified];

    //Dereference the data coming in, find the person in the above array, create a new object, and edit that
    let { id, email } = data;
    let selectedPerson = editList.find(({persId}) => persId === id);
    selectedPerson = {...selectedPerson, email: email};
    
    //Finally find the index of the above object and assign the value of the above object to the object in the array
    let editIndex = editList.findIndex(p => p.persId == id);
    editList[editIndex] = selectedPerson;

    //Store it in the state
    dispatch(setListModified(editList));
  };

  const editFailed = (err) => {
    dispatch(setIsError(true));
  };

  //Will hold the results if there's a personList or not
  let cardListOut = "";

  if (personListModified.length === 0) {
    //Null/empty check
    cardListOut = (
      <Card title="No Persons" description="We could not find any persons" />
    );
  }

  //AntDesign Card List, the List.Item is the ListCard.js file
  //w/ passed in unique id's and keys
  //edit functions are for lifting up state of any card edits
  cardListOut = (
    <List
      grid={{
        gutter: 16,
        column: 3,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3
      }}
      dataSource={personListModified}
      renderItem={(person) => (
        <List.Item>
          <ListCard
            key={person.persId}
            id={person.persId}
            person={person}
            loading={isLoading}
            editPersonFn={editPerson}
            editFailedFn={editFailed}
          />
        </List.Item>
      )}
    />
  );

  //Quick way to reset all the sorting variables for sorting features
  const resetAllSortSetters = () => {
    setSortFirstNameAscSelected(false);
    setSortFirstNameDescSelected(false);
    setSortLastNameAscSelected(false);
    setSortLastNameDescSelected(false);
  };

  //Ascending Sorting
  //Modfied by passing in if it's for a first name or last name (firstName var)
  const sortAscending = (firstName = true) => {
    resetAllSortSetters(); //Reset all sorting flags
    if (firstName) {
      //If firstName = true, sort Asc on the first name
      let currentPersonList = [...personListModified];
      //localeComparison on an all-lower case first name for accuracy
      let sortedNameList = currentPersonList.sort((a, b) =>
        a.name.first.toLowerCase().localeCompare(b.name.first.toLowerCase())
      );
      setSortFirstNameAscSelected(true); //Set First name Asc flag = true
      dispatch(setListModified(sortedNameList));
    } 

      //If firstName = false, sort Asc on the last name
      //See above for explination
      let currentPersonList = [...personListModified];
      let sortedNameList = currentPersonList.sort((a, b) =>
        a.name.last.toLowerCase().localeCompare(b.name.last.toLowerCase())
      );
      setSortLastNameAscSelected(true);
      dispatch(setListModified(sortedNameList));
  };

  const sortDescending = (firstName = true) => {
    resetAllSortSetters();
    if (firstName) {
      let currentPersonList = [...personListModified];
      let sortedNameList = currentPersonList.sort((a, b) =>
        b.name.first.toLowerCase().localeCompare(a.name.first.toLowerCase())
      );
      setSortFirstNameDescSelected(true);
      dispatch(setListModified(sortedNameList));
    }

    let currentPersonList = [...personListModified];
    let sortedNameList = currentPersonList.sort((a, b) =>
      b.name.last.toLowerCase().localeCompare(a.name.last.toLowerCase())
    );
    setSortLastNameDescSelected(true);
    dispatch(setListModified(sortedNameList));
  };

  //Filtering the list via user input (the search bar on the screen)
  const filterByInput = (value) => {
    resetAllSortSetters();
    //If there's a value, filter, else reset the list with the base list
    if (value) {
      let currentPersonList = [...personListModified];
      let filteredPersonList = currentPersonList.filter(
        (p) =>
          p.name.first.toLowerCase().includes(value) ||
          p.name.last.toLowerCase().includes(value)
      );
      dispatch(setListModified(filteredPersonList));
    } 
    else{
      dispatch(setListModified(personListBase));
    }
  };

  return (
    <div id="listContainer">
      <Row>
        <Col id="listOutput">
          <Row>
            <Space direction="horizontal" size="middle">
              <div id="listSortFirstName">
                {"Sort by First Name: "}
                <SortAscendingOutlined
                  className="sortListLink"
                  onClick={() => sortAscending(true)}
                  style={sortFirstNameAscSelected ? selectedSortStyle : null}
                />{" "}
                {"/"}{" "}
                <SortDescendingOutlined
                  className="sortListLink"
                  onClick={() => sortDescending(true)}
                  style={sortFirstNameDescSelected ? selectedSortStyle : null}
                />
              </div>
              <div id="listSortLastName">
                {"Sort by Last Name: "}
                <SortAscendingOutlined
                  className="sortListLink"
                  onClick={() => sortAscending(false)}
                  style={sortLastNameAscSelected ? selectedSortStyle : null}
                />{" "}
                {"/"}{" "}
                <SortDescendingOutlined
                  className="sortListLink"
                  onClick={() => sortDescending(false)}
                  style={sortLastNameDescSelected ? selectedSortStyle : null}
                />
              </div>
              <div id="listFilterName">
                <Search
                  id="filterSearchBar"
                  placeholder="Search Name By Input"
                  allowClear
                  onSearch={filterByInput}
                  style={{ width: 250 }}
                />
              </div>
            </Space>
          </Row>
          <Row>{cardListOut}</Row>
        </Col>
      </Row>
    </div>
  );
}
