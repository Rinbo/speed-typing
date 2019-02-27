import React, { Component } from "react";
import Authpage from "./Authpage";
import endpoint from "./endpoint";
import Spinner from "./Spinner";

export class App extends Component {
  state = {
    isSignedIn: null,
    signedInUser: null,
    userEmail: null,
    isLoading: true
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    endpoint
      .post("/users/validatetoken", { token })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.setState({
          isSignedIn: true,
          signedInUser: response.data.name,
          userEmail: response.data.email,
          isLoading: false
        });
        console.log(response.data.token);
      })
      .catch(e => {
        this.setState({ isLoading: false });
        console.log("Failed to validate token");
      });
  };

  render() {
    const { isSignedIn, isLoading } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    if (!isSignedIn) {
      return <Authpage auth={this.auth} />;
    }
    return <div>Welcome!</div>;
  }
}

export default App;
