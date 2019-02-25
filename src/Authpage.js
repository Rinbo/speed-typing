import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

export class Authpage extends Component {
  state = { authType: null };

  render() {
    const { authType } = this.state;

    if (!authType) {
      return (
        <div className="ui container" style={{ marginTop: 100 }}>
          <button
            className="ui button primary"
            onClick={() => this.setState({ authType: 1 })}
          >
            Login
          </button>
          <button
            className="ui button primary"
            onClick={() => this.setState({ authType: 2 })}
          >
            Register
          </button>
        </div>
      );
    }
    if (authType === 1) {
      return <Login />;
    }
    if (authType === 2) {
      return <Register />;
    }
  }
}

export default Authpage;
