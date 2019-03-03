import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

export class Authpage extends Component {
  state = { authType: null };

  renderBlurb = () => {
    return (
      <div
        className="ui container"
        style={{ marginTop: "10vh" }}
      >
        <div style={{ margin: "auto" }}>
          <div
            className="ui segment"
            style={{ maxWidth: "40vw", display: "inline-block", fontSize: 16 }}
          >
            This is a typing speed test for coders. For one minute you will be
            presented with random code snippets that you should try to type as
            fast as you can.
            <br />
            <br />
            It is always more fun to measure yourself against others, so all we
            ask is that you provide a name that we can use to position you on
            the scoreboard:
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { authType } = this.state;

    if (!authType) {
      return this.renderBlurb();
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

/* return (
  <div className="ui container" style={{ marginTop: 100 }}>
    <div className="ui six column centered stackable grid">
      <div className="column">
        <button
          className="ui basic black button borjessons-button"
          onClick={() => this.setState({ authType: 1 })}
        >
          Login
        </button>
      </div>
      <div className="column">
        <button
          className="ui basic black button borjessons-button"
          onClick={() => this.setState({ authType: 2 })}
        >
          Register
        </button>
      </div>
    </div>
  </div>
); */
