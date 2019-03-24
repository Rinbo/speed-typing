import React, { useState } from "react";

const Context = React.createContext("navigation");

export const Navigation = props => {
  const [state, updateState] = useState({
    pageNumber: 1
  });

  const selectPage = pageNumber => {
    updateState({ pageNumber });
  };

  return (
    <Context.Provider value={{ ...state, selectPage }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
