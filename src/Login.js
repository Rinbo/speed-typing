import React, { Component } from "react";
import endpoint from "./endpoint";

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const body = { ...this.state };
    console.log(body);
    endpoint
      .post("/users/signin", body)
      .then(response => {
        localStorage.setItem("token", response.data.token);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: 100 }}>
        <form className="ui form error" onSubmit={this.onSubmit}>
          <div className="ui field">
            <label>Email</label>
            <input
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              value={this.state.email}
            />
          </div>
          <div className="ui field">
            <label>Password</label>
            <input
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              value={this.state.password}
            />
          </div>
          <button className="ui primary button">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
