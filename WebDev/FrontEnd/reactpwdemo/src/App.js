import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setList, setIsLoading } from "./app/Features/listSlice";

import LayoutContainer from "./Layout/LayoutHOC";
import ListMain from "./List/ListCardMain";
import ErrorMain from "./Error/ErrorMain";

export default function App() {
  //Redux dispatch call
  //Note: the Redux version I'm using is ReduxJS Toolkit
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
        dispatch(setList(res.data.results));
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
