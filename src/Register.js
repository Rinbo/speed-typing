import React, { Component } from "react";
import endpoint from "./endpoint";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const body = { ...this.state };

    endpoint
      .post("/add", body)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: 100 }}>
        <form className="ui form error" onSubmit={this.onSubmit}>
          <div className="ui field">
            <label>Name</label>
            <input
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
              value={this.state.name}
            />
          </div>
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
          <button className="ui primary button">Add</button>
        </form>
      </div>
    );
  }
}

export default Register;
