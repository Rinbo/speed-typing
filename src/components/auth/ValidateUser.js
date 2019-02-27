import React, { Component } from "react";
import endpoint from "../apis/endpoint";

export class ValidateUser extends Component {
  validateUser = () => {
    const token = localStorage.getItem("token");
    console.log({ token });
    endpoint
      .post("/users/validatetoken", { token })
      .then(response => console.log(response.data))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        <button className="ui button primary" onClick={this.validateUser}>
          Validate User
        </button>
      </div>
    );
  }
}

export default ValidateUser;
