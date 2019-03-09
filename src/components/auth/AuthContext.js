import React from "react";
import endpoint from "../apis/endpoint";
import { setHeaders, destroyToken } from "../apis/setHeaders";

const Context = React.createContext("auth");

export class AuthStore extends React.Component {
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
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        this.setState({
          isSignedIn: true,
          signedInUser: response.data.name,
          userEmail: response.data.email,
          isLoading: false
        });
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
    return (
      <Context.Provider
        value={{ ...this.state, signIn: this.signIn, signOut: this.signOut }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
