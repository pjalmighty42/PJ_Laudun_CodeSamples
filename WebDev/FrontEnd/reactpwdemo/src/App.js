import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setList, setListModified, setIsLoading, setIsError } from "./App/Features/listSlice";
import uuid from "react-uuid";

import LayoutContainer from "./Layout/LayoutHOC";
import ListMain from "./List/ListCardMain";
import ErrorMain from "./Error/ErrorMain";

export default function App() {
  //Redux dispatch call
  //Note: the Redux version I'm using is ReduxJS Toolkit
  const dispatch = useDispatch();

  //Error handling
  const isError = useSelector((state) => state.list.isError);

  //Base person list (to use to modify)
  const personList = useSelector((state) => state.list.personList);

  useEffect(() => {
    //Set loading to true before API call
    dispatch(setIsLoading(true));
    //Using Axios (used to it), with a catch for errors
    axios
      .get("https://randomuser.me/api/?results=25")
      .then((res) => {
        //If good, store list in Redux store, set loading to false
        dispatch(setList(res.data.results));
        dispatch(setIsLoading(false));
        dispatch(setIsError(false));

        //Then create the modified list with uuid
        if(personList){
          let personListModifiedLoad = [...personList];

          for (let p = 0; p < personListModifiedLoad.length; p++) {
            let person = personListModifiedLoad[p];
            let newPersId = {
              persId: uuid()
            };
            personListModifiedLoad[p] = { ...person, ...newPersId };
          }
          dispatch(setListModified(personListModifiedLoad));
        }
      })
      .catch((err) => {
        //If error, set state variable to true
        //Set Redux store list to empty, set loading to false
        dispatch(setIsError(true));
        dispatch(setList([]));
        dispatch(setIsLoading(false));
      });
  }, []);

  //Will output the results of above
  let contentOutput = "";
  if (isError) {
    //If error, show the error component
    contentOutput = <ErrorMain />;
  }
  
  //Else show the actual list
  contentOutput = <ListMain />;

  return (
    <div className="App">
      <LayoutContainer>{contentOutput}</LayoutContainer>
    </div>
  );
}
