import React, { Component } from "react";

export class LandingPage extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui vertical icon menu" style={{ marginTop: "20vh" }}>
          <a className="item">
            <i className="gamepad icon" />
          </a>
          <a className="item">
            <i className="user icon" />
          </a>
          <a className="item">
            <i className="trophy icon" />
          </a>
          <a className="item">
            <i className="sign-out icon" onClick={() => this.props.signOut()} />
          </a>
        </div>
      </div>
    );
  }
}

export default LandingPage;
