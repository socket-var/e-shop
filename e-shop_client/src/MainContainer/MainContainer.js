import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./MainContainer.css";
import axios from "axios";
import PaginationFooter from "../PaginationFooter/PaginationFooter";

export default class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      recordsPerPage: 20,
      buttons: [1, 2, 3, 4],
      numRecords: 0,
      lastKnownId: null,
      lastPageNumber: 0,
      activePageNumber: 1
    };

    this.state.limitRecords =
      this.state.recordsPerPage * this.state.buttons.length;

    this.state.numberOfPages = Math.ceil(
      this.state.numRecords / this.state.recordsPerPage
    );

    this.onSliderClick = this.onSliderClick.bind(this);
    this.onPaginationButtonClick = this.onPaginationButtonClick.bind(this);
  }
  
  onPaginationButtonClick(evt) {
    const buttonEvt = evt.target.value
    const start = (buttonEvt - 1) * this.state.recordsPerPage;

    if (this.state.data) {

      if (start >= this.state.data.length) {
        const lastPageNumber =
          this.state.data.length / this.state.recordsPerPage;
        const limitRecords =
          (buttonEvt - lastPageNumber) * this.state.recordsPerPage;

        // get new data using lastknownid and limitRecords
        axios
          .post("/data/catalog", {
            limitRecords,
            lastKnownId: this.state.lastKnownId
          })
          .then((response) => {
            this.setState({ data: [...this.state.data, ...response.data.records], lastKnownId: response.data.lastKnownId, activePageNumber: buttonEvt });
          });
      } else {
        this.setState({activePageNumber: buttonEvt})
      }
    }
  }

  onSliderClick(evt) {
    // get the current page and go to before page
    if (evt.target.value === "<<") {
      this.setState({
        buttons: this.state.buttons.map(num => (num === 1 ? num : num - 1))
      });
    } else {
      this.setState({
        buttons: this.state.buttons.map(num => (num === 1 ? num : num + 1))
      });
    }
  }

  componentWillMount() {
    axios.get("/data/catalog_count").then(response => {
      this.setState({ numRecords: response.data.count });
    });
    axios
      .post("/data/catalog", {
        limitRecords: this.state.limitRecords
      })
      .then(response => {
        this.setState(function(state, props) {
          return {
            data: response.data.records,
            lastKnownId: response.data.lastKnownId,
            lastPageNumber: Math.ceil(state.numRecords / state.recordsPerPage)
          };
        });
      })
      .catch(error => {
        this.setState({ data: "Error: Cannot retrieve text" });
      });
  }

  render() {
    const items = [];
    const start = (this.state.activePageNumber-1) * this.state.recordsPerPage
    console.log(start, this.state.recordsPerPage, this.state.data.length)
    for (
      let index = start;
      index < start + this.state.recordsPerPage;
      index++
    ) {
      items.push(<ProductCard productData={this.state.data[index]} />);
    }

    return (
      <div className="main-container">
        <div>{this.state.numRecords} results found</div>
        <div className="product-container">
          {this.state.data.length === 0 ? (
            <div>Fetching the data...</div>
          ) : (
            items
          )}
        </div>
        <PaginationFooter
          buttons={this.state.buttons}
          recordsPerPage={this.state.recordsPerPage}
          className="pagination"
          lastPageNumber={this.state.lastPageNumber}
          onPaginationButtonClick={this.onPaginationButtonClick}
          onSliderClick={this.onSliderClick}
        />
      </div>
    );
  }
}
