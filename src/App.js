import React, { Component } from "react";
import Authpage from "./Authpage";
import endpoint from "./endpoint";

export class App extends Component {
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    endpoint
      .post("/users/validatetoken", { token })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.setState({
          isSignedIn: true,
          signedInUser: response.data.name,
          userEmail: response.data.email
        });
        console.log(response.data.token);
      })
      .catch(e => console.log(e));
  };

  state = {
    isSignedIn: null,
    signedInUser: null,
    userEmail: null
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
