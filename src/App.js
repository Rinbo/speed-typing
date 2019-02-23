import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

export class App extends Component {
  render() {
    return (
      <div>
        <Register />
        <br />
        <br />
        <br />
        <Login />
      </div>
    );
  }
}

export default App;
