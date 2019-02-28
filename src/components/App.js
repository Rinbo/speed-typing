import React, { Component } from "react";
import Authpage from "./users/Authpage";
import endpoint from "./apis/endpoint";
import Spinner from "./utility/Spinner";
import "./app.css";
import LandingPage from "./LandingPage";

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

  signIn = user => {
    this.setState({
      isSignedIn: true,
      signedInUser: user.name,
      userEmail: user.email
    });
  };

  signOut = () => {
    const token = localStorage.getItem("token");
    const requestBody = { email: this.state.email, token: token };
    localStorage.removeItem("token");
    endpoint
      .delete("/users/signout", requestBody)
      .then(response => {
        console.log(response);
        this.setState({ email: null, signedInUser: null, isSignedIn: null });
      })
      .catch(e =>
        console.log(
          "Unable to destory token. However, you were logged out from the frontend. The security of your account is uncompromised."
        )
      );
  };

  render() {
    const { isSignedIn, isLoading } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    if (!isSignedIn) {
      return <Authpage auth={this.auth} signIn={this.signIn} />;
    }
    return <LandingPage signOut={this.signOut} />;
  }
}

export default App;
