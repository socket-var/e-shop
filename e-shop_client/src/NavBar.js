import React from 'react'
import logo from './logo.svg';
import "./NavBar.css";

const NavBar = () => {
    return(
        <header className="App-header">
          <nav>
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
              <li><a href="/#">Categories</a></li>
              <li><a href="/#">Login or Register</a></li>
              <li>
                <select id="filter_search">
                  <option value="">All</option>
                  <option value="">Foo</option>
                  <option value="">Bar</option>
                </select>
                <input type="text" id="top_search" />
                <input type="submit" id="submit_search" value="Search"/>
              </li>
            </ul>
          </nav>
          
        </header>
    )
}

export default NavBar;