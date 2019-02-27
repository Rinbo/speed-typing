import React, { Component } from "react";
import Authpage from "./users/Authpage";
import endpoint from "./apis/endpoint";
import Spinner from "./utility/Spinner";
import "./app.css";

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

  render() {
    const { isSignedIn, isLoading, signedInUser } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    if (!isSignedIn) {
      return <Authpage auth={this.auth} signIn={this.signIn} />;
    }
    return (
      <div className="ui container">
        <div className="ui basic segment">
          <div className="ui centered header">Welcome {signedInUser}!</div>
        </div>
      </div>
    );
  }
}

export default App;
