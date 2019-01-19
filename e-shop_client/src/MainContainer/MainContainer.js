import React, { Component } from 'react'
import ProductCard from "../ProductCard/ProductCard"
import "./MainContainer.css"
import axios from "axios"
import PaginationFooter from "../PaginationFooter/PaginationFooter"

export default class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      num_records: 0
    }
  }
  
  componentWillMount() {
    axios.get("/data/catalog_all")
        .then( (response) => {
          // console.log(response);
          this.setState({data: response.data.records, num_records: response.data.num_records})
        })
        .catch((error) => {
          console.log(error)
          this.setState({data: "Error: Cannot retrieve text"})
        });
  }

  render() {
    const items = []
    console.log(this.state.data);
    for (let index = 0; index < this.state.data.length; index++) {
      items.push(<ProductCard productData={this.state.data[index]} />)
    }

    return (
      <div className="main-container">
        <div className="product-container">
        {
          this.state.data.length === 0 ? <div>Fetching the data...</div> : items
        }
        {/* <PaginationFooter num_records={this.state.num_records}/> */}
        </div>
        
        <PaginationFooter num_records={this.state.num_records} className="pagination"/>
      </div>
      
    )
  }
}
