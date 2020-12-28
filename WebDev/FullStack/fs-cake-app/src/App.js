import { Provider } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import store from '../src/redux/store';

import MainPage from './containers/pages/MainPage';
import DecisionPage from './containers/pages/DecisionPage';
import StorePage from './containers/pages/StorePage';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
              <Route path="/" exact component={MainPage}/>
              <Route path="/main" component={DecisionPage}/>
              <Route path="/store/:id" component={StorePage}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
