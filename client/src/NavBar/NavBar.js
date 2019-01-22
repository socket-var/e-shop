import React from 'react'
import logo from '../logo.svg';
import "./NavBar.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


const NavBar = () => {
    return(
      <header className="App-header">
        <nav>
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
          <ul>
            <li><Link to="/catalog">Catalog</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/auth">Login or Register</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>

      </header>
    )
}

export default NavBar;