import React from 'react'
import logo from './logo.svg';
import "./NavBar.css";

const NavBar = () => {
    return(
        <header className="App-header">
          <nav>
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
              <li><a href="/#">Catalog</a></li>
              <li><a href="/#">Cart</a></li>
              <li><a href="/#">Login or Register</a></li>
              <li><a href="/#">Logout</a></li>
            </ul>
          </nav>
          
        </header>
    )
}

export default NavBar;