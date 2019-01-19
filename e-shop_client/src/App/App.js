import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from "../NavBar/NavBar"
import FetchDemo from "../FetchDemo/FetchDemo"

import AuthForm from "../AuthForm/AuthForm";
import CatalogPage from '../CatalogPage/CatalogPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="body-container">
            {/* <FilterSideBar />
            <FetchDemo />
            <ProductCard /> */}
            <Route path="/" exact component="" />
            <Route path="/catalog" component={CatalogPage} />
            <Route path="/cart" component="" />
            <Route path="/auth" component={AuthForm} />
            <Route path="/logout" component={FetchDemo} />
          </div>
          
        </div>
      </Router>
    );
  }
}

export default App;
