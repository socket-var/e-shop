import React, { Component } from 'react';
import './App.css';
import NavBar from "./NavBar"
import FetchDemo from "./FetchDemo"
import FilterSideBar from "./FilterSideBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="body-container">
          <FilterSideBar />
          <FetchDemo />
        </div>
        
      </div>
    );
  }
}

export default App;
