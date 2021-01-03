import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AppNavbar from '../src/components/Navbar';
import ShoppingList from '../src/components/ShoppingList';
import ItemModal from '../src/components/ItemModal';

import { Provider } from 'react-redux';
import stateStore from './redux/store';

import { Container } from 'reactstrap';

const headerStyle ={
  marginTop: '1em'
};

function App() {
  return (
    <Provider
      store={stateStore}
    >
      <div className="App">
        <AppNavbar></AppNavbar>
        
        <Container>
          <h1 style={headerStyle}>Current Shopping List: </h1>
          <hr/>
          <ItemModal></ItemModal>
          <ShoppingList></ShoppingList>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
