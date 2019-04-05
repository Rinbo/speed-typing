import React from "react";
import endpoint from "../apis/endpoint";
import { setHeaders, destroyToken } from "../apis/setHeaders";
import useValidateToken from "./useValidateToken";

const Context = React.createContext("auth");

export const AuthStore = props => {
  const [state, updateState] = useValidateToken();

  const signIn = user => {
    updateState({
      isSignedIn: true,
      signedInUser: user.name,
      userEmail: user.email,
      isLoading: false,
      statusMessage: "Signin successful. Welcome " + user.name,
      statusCode: 200
    });
  };

  const signOut = () => {
    setHeaders();
    endpoint
      .delete("/users/signout")
      .then(response => {
        console.log(response.data);
      })
      .catch(e => console.log("Unable to destory token."));
    updateState({
      isSignedIn: false,
      signedInUser: null,
      userEmail: null,
      isLoading: false,
      statusMessage: "You are now signed out but can continue to play.",
      statusCode: 200
    });
    destroyToken();
  };

  const updateUser = user => {
    updateState(prevState => {
      return { ...prevState, userEmail: user.email, signedInUser: user.name };
    });
  };

  const setScore = score => {
    updateState(prevState => {
      return { ...prevState, score };
    });
  };

  const setStatus = (message, code) => {
    updateState(prevState => {
      return { ...prevState, statusMessage: message, statusCode: code };
    });
  };

  return (
    <Context.Provider
      value={{ ...state, signIn, signOut, setStatus, setScore, updateUser }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
