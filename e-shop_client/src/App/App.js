import React, { Component } from 'react';
import './App.css';
import NavBar from "../NavBar/NavBar"
import FetchDemo from "../FetchDemo/FetchDemo"
import FilterSideBar from "../FilterSideBar/FilterSideBar"

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
