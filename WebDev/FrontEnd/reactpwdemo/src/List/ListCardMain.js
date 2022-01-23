import { useState, useEffect } from "react";
import { Card, Col, Row, List, Space, Input } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "../app/features/listSlice";
import uuid from "react-uuid";

import ListCard from "./ListCard/ListCard";

const selectedSortStyle = {
  color: "rgb(36, 67, 153)"
};

const { Search } = Input;

export default function ListMain() {
  //Choose to keep all logic within ListMain.js
  /*
  This is because we're using Redux Toolkit there's no
  need to have the complexity of pushing up state unecessarily.
  */
  const dispatch = useDispatch(); //to store edits
  const personListSlice = useSelector((state) => state.list.personList);
  const isLoading = useSelector((state) => state.list.isLoading);
  //This is the local state variable for changes/edits & sorting/filtering
  const [personList, setPersonList] = useState([]);

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

  /*
    I realized that I need a way to handle changes, which meant that I needed
    a better 1-for-1 for an item changed and it's corresponding array obj
    so I am using a "persId" with a uuid value so that it will be a more
    direct 1-for-1 for any card edits
  */
  useEffect(() => {
    if (personListSlice) {
      let personListModified = [...personListSlice];

      for (let p = 0; p < personListModified.length; p++) {
        let person = personListModified[p];
        let newPersId = {
          persId: uuid()
        };
        personListModified[p] = { ...person, ...newPersId };
      }
      setPersonList(personListModified);
    }
  }, []); //Only run effect once

  const editPerson = (data) => {
    /*
      data = {id: persId (see above), email: new email}
      Because the persId and the data.id are a 1-for-1, the uuids 
      that match would be solid and this would avoid incorrect editing 
      of cards.
      Choose to only do email for time reasons and because if we're trying
      for phone and location editing, that would open a whole other can of 
      worms on how to implement it properly
    */
    let { id, email } = data;
    personList.forEach((p) => {
      if (p.persId === id) {
        p.email = email;
      }
    });
    //Set the updated array for 2-way card binding on page
    setPersonList(personList);
    //Redux state edits to keep the Redux state in sync with local state
    //We need to keep any updates in sync
    dispatch(setList(personList));
  };

  const editFailed = (err) => {
    console.log(err);
  };

  //Will hold the results if there's a personList or not
  let cardListOut = "";

  if (personList) {
    //AntDesign Card List, the List.Item is the ListCard.js file
    //w/ passed in unique id's and keys
    //edit functions are for lifting up state of any card edits (see above)
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
        dataSource={personList}
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
  } else {
    //Null/empty check
    cardListOut = (
      <Card title="No Persons" description="We could not find any persons" />
    );
  }

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
      let currentPersonList = [...personList];
      //localeComparison on an all-lower case first name for accuracy
      let sortedNameList = currentPersonList.sort((a, b) =>
        a.name.first.toLowerCase().localeCompare(b.name.first.toLowerCase())
      );
      setSortFirstNameAscSelected(true); //Set First name Asc flag = true
      setPersonList(sortedNameList); //Store sorted list in state
    } else {
      //If firstName = false, sort Asc on the last name
      //See above for explination
      let currentPersonList = [...personList];
      let sortedNameList = currentPersonList.sort((a, b) =>
        a.name.last.toLowerCase().localeCompare(b.name.last.toLowerCase())
      );
      setSortLastNameAscSelected(true);
      setPersonList(sortedNameList);
    }
  };

  const sortDescending = (firstName = true) => {
    resetAllSortSetters();
    if (firstName) {
      let currentPersonList = [...personList];
      let sortedNameList = currentPersonList.sort((a, b) =>
        b.name.first.toLowerCase().localeCompare(a.name.first.toLowerCase())
      );
      setSortFirstNameDescSelected(true);
      setPersonList(sortedNameList);
    } else {
      let currentPersonList = [...personList];
      let sortedNameList = currentPersonList.sort((a, b) =>
        b.name.last.toLowerCase().localeCompare(a.name.last.toLowerCase())
      );
      setSortLastNameDescSelected(true);
      setPersonList(sortedNameList);
    }
  };

  //Filtering the list via user input (the search bar on the screen)
  const filterByInput = (value) => {
    //Since we're not sorting, clear the flags
    resetAllSortSetters();
    //I've decided to filter on both the first or last names
    //Value check, if nothing typed in, push back the slice personList
    //(This will also work for resetting to original state)
    if (value) {
      //Create new var with a copu of the personList
      let currentPersonList = [...personList];
      //Quick filter first or last name of an object if it matches
      //Typed in text (since we're doing a simple iteration, we avoid
      //repeating variables)
      let filteredPersonList = currentPersonList.filter(
        (p) =>
          p.name.first.toLowerCase().includes(value) ||
          p.name.last.toLowerCase().includes(value)
      );
      setPersonList(filteredPersonList);
    } else {
      setPersonList(personListSlice);
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
