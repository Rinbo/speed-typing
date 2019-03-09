import React, { useState, useEffect } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders, destroyToken } from "../apis/setHeaders";

const Context = React.createContext("auth");

export const AuthStore = props => {
  const [state, updateState] = useState({
    isSignedIn: null,
    signedInUser: null,
    userEmail: null,
    isLoading: true
  });

  useEffect(() => {
    setHeaders();
    endpoint
      .get("/users/validatetoken")
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        updateState({
          isSignedIn: true,
          signedInUser: response.data.name,
          userEmail: response.data.email,
          isLoading: false
        });
      })
      .catch(e => {
        updateState({
          isSignedIn: false,
          signedInUser: null,
          userEmail: null,
          isLoading: false
        });
        console.log("Failed to validate token");
      });
  }, []);

  const signIn = user => {
    updateState({
      isSignedIn: true,
      signedInUser: user.name,
      userEmail: user.email,
      isLoading: false
    });
  };

  const signOut = () => {
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
    updateState({
      isSignedIn: false,
      signedInUser: null,
      userEmail: null,
      isLoading: false
    });
    destroyToken();
  };

  return (
    <Context.Provider value={{ ...state, signIn: signIn, signOut: signOut }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
