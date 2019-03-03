import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

export class Authpage extends Component {
  state = { authType: null };

  renderBlurb = () => {
    return (
      <div className="ui container" style={{ margin: "35px 0px 60px 0px" }}>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <div
            className="ui basic segment"
            style={{
              maxWidth: 600,
              display: "inline-block",
              fontSize: 17
            }}
          >
            This is a typing speed test for coders. For one minute you will be
            presented with random code snippets that you should try to type as
            fast as you can.
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { authType } = this.state;

    if (!authType) {
      return (
        <div>
          {this.renderBlurb()}
          <Register signIn={this.props.signIn} />
          <div
            className="ui horizontal divider"
            style={{ width: 360, margin: "auto" }}
          >
            OR
          </div>
          <Login signIn={this.props.signIn} />
        </div>
      );
    }
  }
}

export default Authpage;
