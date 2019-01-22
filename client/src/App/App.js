import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import NavBar from "../NavBar/NavBar"
import AuthPage from "../AuthPage/AuthPage";
import CatalogPage from '../CatalogPage/CatalogPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="body-container">
            <Route path="/" exact component="" />
            <Route path="/catalog" component={CatalogPage} />
            <Route path="/cart" component="" />
            <Route path="/auth" component={AuthPage} />
            <Route path="/logout" component="" />
          </div>
          
        </div>
      </Router>
    );
  }
}

export default App;
