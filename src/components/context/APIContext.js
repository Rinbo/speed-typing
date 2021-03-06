import React, { useReducer, useState, useEffect } from "react";
import { userReducer, initialUserState, init } from "../reducers/userReducer";
import { validateToken } from "../actions/userActions";

const Context = React.createContext("auth");

export const AuthStore = props => {
  const [score, updateScore] = useState(0);
  const [globalState, globalDispatch] = useReducer(
    userReducer,
    initialUserState,
    init
  );

  // @TODO Add windowWidth and make it a global variable. Set maxWidth to this width

  useEffect(() => {
    if (localStorage.getItem) validateToken(globalDispatch, setScore);
  }, []);

  const setScore = score => {
    updateScore(score);
  };

  return (
    <Context.Provider
      value={{ ...globalState, globalDispatch, setScore, score }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
