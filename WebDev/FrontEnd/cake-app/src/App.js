import './App.css';
import { Provider } from 'react-redux';

import store from '../src/redux/store';
import CakeContainer from '../src/containers/CakeContainer';
import CakeContainerDos from './containers/CakeContainerDos';
import IceCreamContianer from './containers/IceCreamContainer';
import ShakeContainer from './containers/ShakeContainer';
import UserContainer from './containers/UserContainer';
import UserInput from './containers/UserInput';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserInput />
      </div>
    </Provider>
    
  );
}

export default App;
