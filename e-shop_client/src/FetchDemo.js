import React from 'react'
import axios from 'axios'

class FetchDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "Fetching data"
        };
    }

    componentDidMount() {
        axios.get("/api/foo")
            .then( (response) => {
                this.setState({text: response.data.text})
            })
            .catch((error) => {
                console.log(error)
                this.setState({text: "Error: Cannot retrieve text"})
            });
    }

    render() {
        return (<main><p>Text: {this.state.text}</p></main>)
    }
}

export default FetchDemo