import React, { Component } from 'react';
import axios from "axios";

export default class ProductCard extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      data: "",
    };
  }
  
  componentWillMount() {
    axios.get("/data")
        .then( (response) => {
          console.log(response);
          this.setState({data: response.data})
        })
        .catch((error) => {
          console.log(error)
          this.setState({data: "Error: Cannot retrieve text"})
        });
  }

  render() {
    return (
      <div>
        {
          !this.state.data ? "Error: Data not received" : (
            <div>
            <p>{this.state.data.product_name}</p>
            <img src={this.state.data.image[0]} alt="flipkart"/>
            </div>
          )
        }
      </div>
    )
  }
}
