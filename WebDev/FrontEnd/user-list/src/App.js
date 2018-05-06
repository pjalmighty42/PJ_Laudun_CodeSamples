import React, { Component } from 'react';

import SearchBar from './Search Bar Area/SearchBar';

/*
  User CRM demo, created by Paul Laudun.

  
*/

class App extends Component {
  render() {
    return (
      <div id="main-container" className="container">
        {/* Searchbar Header Area - Start */}
        <SearchBar />
        {/* Searchbar Header Area - End */}
      </div>
    );
  }
}

export default App;

