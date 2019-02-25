import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import DeleteUser from "./DeleteUser";
import ValidateUser from "./ValidateUser";

export class App extends Component {
  render() {
    return (
      <div>
        <Register />
        <br />
        <br />
        <br />
        <Login />
        <br />
        <DeleteUser />
        <br />
        <ValidateUser />
      </div>
    );
  }
}

export default App;
