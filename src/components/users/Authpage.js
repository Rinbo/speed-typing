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
          <div className="ui eight column centered grid">
            <div className="column">
              <button
                className="ui black button borjessons-button"
                onClick={() => this.setState({ authType: 1 })}
              >
                Login
              </button>
            </div>
            <div className="column">
              <button
                className="ui black button borjessons-button"
                onClick={() => this.setState({ authType: 2 })}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (authType === 1) {
      return <Login signIn={this.props.signIn} />;
    }
    if (authType === 2) {
      return <Register signIn={this.props.signIn} />;
    }
  }
}

export default Authpage;
