import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import store from '../src/redux/store';

import MainPage from './containers/pages/MainPage';
import DecisionPage from './containers/pages/DecisionPage';
import StorePage from './containers/pages/StorePage';

const App = () => {
  /** 
   * <Router>
        <div className="App">
          <Switch>
              <Route path="/" exact component={MainPage}/>
              <Route path="/main" component={DecisionPage}/>
              <Route path="/store/:id" component={StorePage}/>
          </Switch>
        </div>
      </Router>
  */
      if (process.env.REACT_APP_STAGE === 'PROD')
      console.log = function no_console() {};
      
  return (
    <Provider store={store}>
      <DecisionPage />
    </Provider>
  );
}

export default App;
