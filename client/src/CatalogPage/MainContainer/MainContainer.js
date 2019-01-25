import React, { Component } from "react";
import ProductCard from "./ProductCard/ProductCard";
import "./MainContainer.css";
import axios from "axios";
import PaginationFooter from "./PaginationFooter/PaginationFooter";

export default class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingSplash: true,
      errorText: "",
      data: [],
      recordsPerPage: 21,
      buttons: [1, 2, 3, 4],
      numRecords: 0,
      numberOfPages: 0,
      lastKnownId: null,
      activePageNumber: 1,
      activeButton: 0
    };

    this.state.limitRecords =
      this.state.recordsPerPage * this.state.buttons.length;

    this.onPaginationClick = this.onPaginationClick.bind(this);
    this.getNewData = this.getNewData.bind(this);
    this.getOrUpdateData = this.getOrUpdateData.bind(this);
  }

  getNewData(buttonVal, limitRecords) {
    return axios
      .post("/data/catalog", {
        limitRecords,
        lastKnownId: this.state.lastKnownId
      })
      .then(response => {
        this.setState({
          data: [...this.state.data, ...response.data.records],
          lastKnownId: response.data.lastKnownId,
          activePageNumber: buttonVal
        });
      });
  }

  getOrUpdateData(start, buttonVal) {
    console.log(start, buttonVal);
    if (this.state.data) {
      if (start >= this.state.data.length) {
        console.log("Need new data");

        const limitRecords =
          this.state.data.length - buttonVal * this.state.recordsPerPage;

        // get new data using lastknownid and limitRecords
        return this.getNewData(buttonVal, limitRecords);
      } else {
        console.log("cached data");
        return Promise.resolve(this.setState({ activePageNumber: buttonVal }));
      }
    }
  }

  onPaginationClick(evt) {
    // for number buttons
    let buttonVal;
    let start;
    let resolveFunc = function() {};
    let activeButton;
    let restButtons = Object.assign([], this.state.buttons).splice(1);

    // if previous button is pressed
    if (evt.target.value === "<<") {
      buttonVal = this.state.activePageNumber - 1;

      activeButton = this.state.activeButton - 1;

      start = (buttonVal - 1) * this.state.recordsPerPage;

      resolveFunc = () => {
        if (this.state.activeButton === 1 && this.state.buttons[0] !== 2) {
          this.setState({
            // activeButton,
            buttons: [this.state.buttons[0], ...restButtons.map(num => num - 1)]
          });
        } else {
          this.setState({ activeButton });
        }
      };
    }
    // if next button is pressed
    else if (evt.target.value === ">>") {
      buttonVal = this.state.activePageNumber + 1;

      activeButton = this.state.activeButton + 1;

      start = (buttonVal - 1) * this.state.recordsPerPage;

      resolveFunc = () => {
        if (this.state.activeButton === 3) {
          this.setState({
            // activeButton,
            buttons: [this.state.buttons[0], ...restButtons.map(num => num + 1)]
          });
        } else {
          this.setState({ activeButton });
        }
      };
    }
    // if number button is pressed
    else {
      buttonVal = parseInt(evt.target.value);

      activeButton = parseInt(evt.target.dataset.key);

      start = (buttonVal - 1) * this.state.recordsPerPage

      resolveFunc = () => {
        if (buttonVal === 1) {
          this.setState({ buttons: [1, 2, 3, 4] });
        } else if (buttonVal === this.state.numberOfPages) {
          const buttons = [];
          for (
            let index = 0;
            index < this.state.numberOfPages.length;
            index++
          ) {
            const element = this.state.numberOfPages[index];
            buttons.push(element);
          }
          this.setState({ buttons });
        }

        if (activeButton === 3) {
          this.setState({
            activeButton,
            buttons: [this.state.buttons[0], ...restButtons.map(num => num + 1)]
          });
        } else if (activeButton === 1 && this.state.buttons[1] !== 2) {
          this.setState({
            activeButton,
            buttons: [this.state.buttons[0], ...restButtons.map(num => num - 1)]
          });
        } else {
          this.setState({ activeButton });
        }
      };
    }

    this.getOrUpdateData(start, buttonVal).then(resolveFunc);
  }

  componentWillMount() {
    Promise.all([
      axios.get("/data/catalog_count"),
      axios.post("/data/catalog", {
        limitRecords: this.state.limitRecords
      })
    ])
      .then(response => {
        const [response1, response2] = response;
        this.setState({
          numRecords: response1.data.count,
          numberOfPages: Math.ceil(
            response1.data.count / this.state.recordsPerPage
          ),
          data: response2.data.records,
          lastKnownId: response2.data.lastKnownId
        });
      })
      .then(() => this.setState({ loadingSplash: false }))
      .catch(error => {
        this.setState({
          errorText: "Error: Cannot retrieve data from the server, try again"
        });
      });
  }

  render() {
    const items = [];
    const start = (this.state.activePageNumber - 1) * this.state.recordsPerPage;
    // console.log(start, this.state.recordsPerPage, this.state.data.length)
    for (
      let index = start;
      index < start + this.state.recordsPerPage;
      index++
    ) {
      items.push(<ProductCard productData={this.state.data[index]} />);
    }

    let content;
    if (this.state.loadingSplash) {
      content = (
        <div className="main-container">
          <div>Hang in there while the data is loading...</div>
        </div>
      );
    } else if (this.state.errorText) {
      content = (
        <div className="main-container">
          <div>{this.state.errorText}</div>
        </div>
      );
    } else {
      content = (
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
            lastPageNumber={this.state.numberOfPages}
            onPaginationClick={this.onPaginationClick}
            activeButton={this.state.activeButton}
          />
        </div>
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}
