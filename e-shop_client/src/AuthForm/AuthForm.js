import React, { Component } from 'react'
import "./AuthForm.css"
import axios from "axios"


export default class AuthForm extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       signupEmail: "",
       signupPassword: "",
       loginEmail: "",
       loginPassword: ""
    }
    
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }
  
  handleAuthClick(evt) {
    const button_id = evt.target.id
    const email = `${button_id}Email`
    const password = `${button_id}Password`

    axios
      .post(`/auth/${button_id}`, {
        email: this.state[email],
        password: this.state[password]
      })
      .then(function(response) {
        console.log(response);
      });
    evt.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAuthClick} id="signup">
          <label htmlFor="signup-email">
            <input type="text" id="signup-email" defaultValue={this.state.signupEmail}/>
          </label>
          <label htmlFor="signup-password">
            <input type="password" id="signup-password" defaultValue={this.state.signupPassword}/>
          </label>
          <input type="submit" value="Register" id="signup-button"/>
        </form>
        <form onSubmit={this.handleAuthClick} id="login">
          <label htmlFor="login-email">
            <input type="text" id="login-email" defaultValue={this.state.loginEmail}/>
          </label>
          <label htmlFor="login-password">
            <input type="password" id="login-password" defaultValue={this.state.loginPassword}/>
          </label>
          <input type="submit" value="Login" id="login-button"/>
        </form>
      </div>
    )
  }
}
