import React, { Component } from "react";

export class LandingPage extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui vertical icon menu" style={{ marginTop: "20vh" }}>
          <div className="item borjessons-link">
            <i className="gamepad icon" />
          </div>
          <div className="item borjessons-link">
            <i className="user icon" />
          </div>
          <div className="item borjessons-link">
            <i className="trophy icon" />
          </div>
          <div
            className="item borjessons-link"
            onClick={() => this.props.signOut()}
          >
            <i className="sign-out icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
