import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setList, setIsLoading } from "./app/features/listSlice";
import uuid from "react-uuid";

import LayoutContainer from "./Layout/LayoutContainer";
import ListMain from "./List/ListMain";
import ErrorMain from "./Error/ErrorMain";

export default function App() {
  //Redux dispatch call
  //Note: the Redux I vers I'm using is ReduxJS Toolkit
  //(A LOT less overhead and easier to use) (check App folder for implementation)
  const dispatch = useDispatch();

  //State-level error handling
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    //Set loading to true before API call
    dispatch(setIsLoading(true));
    //Using Axios (used to it), with a catch for errors
    axios
      .get("https://randomuser.me/api/?results=25")
      .then((res) => {
        //If good, store list in Redux store, set loading to false
        let personListModified = [...res.data.results];

        for (let p = 0; p < personListModified.length; p++) {
          let person = personListModified[p];
          let newPersId = {
            persId: uuid()
          };
          personListModified[p] = { ...person, ...newPersId };
        }

        dispatch(setList(personListModified));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        //If error, set state variable to true
        //Set Redux store list to empty, set loading to false
        setIsError(true);
        dispatch(setList([]));
        dispatch(setIsLoading(false));
      });
  }, []);

  const personListSlice = useSelector((state) => state.list.personList);

  //Will output the results of above
  let contentOutput = "";
  if (isError) {
    //If error, show the error component
    contentOutput = <ErrorMain />;
  } else {
    //Else show the actual list
    contentOutput = <ListMain />;
  }

  return (
    <div className="App">
      <LayoutContainer>{contentOutput}</LayoutContainer>
    </div>
  );
}
