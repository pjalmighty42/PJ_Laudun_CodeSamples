import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import '../src/index.css';

import NavBar from './Containers/NavbarContainer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
