import React, { Component } from 'react'
import FilterSideBar from "../FilterSideBar/FilterSideBar"
import MainContainer from "../MainContainer/MainContainer"
import "./CatalogPage.css"

export default class CatalogPage extends Component {
  render() {
    return (
      <div className="catalog-container">
        <FilterSideBar className="filter-aside"/>
        <MainContainer  className="product-container"/>
      </div>
    )
  }
}
