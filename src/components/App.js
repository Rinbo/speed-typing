import React, { Component } from "react";
import Authpage from "./users/Authpage";
import endpoint from "./apis/endpoint";
import { setHeaders, destroyToken } from "./apis/setHeaders";
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
    setHeaders();
    endpoint
      .get("/users/validatetoken")
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
    setHeaders();
    endpoint
      .delete("/users/signout")
      .then(response => {
        console.log(response);
      })
      .catch(e =>
        console.log(
          "Unable to destory token. However, you were logged out from the frontend. The security of your account is uncompromised."
        )
      );
    this.setState({ email: null, signedInUser: null, isSignedIn: null });
    destroyToken();
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
