import React, { Component } from "react";
import Authpage from "./Authpage";

export class App extends Component {
  state = {
    isSignedIn: null
  };

  render() {
    const { isSignedIn } = this.state;
    if (!isSignedIn) {
      return <Authpage auth={this.auth} />;
    }

    return <div>Welcome!</div>;
  }
}

export default App;
