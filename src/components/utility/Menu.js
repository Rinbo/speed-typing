import React, { useContext } from "react";
import AuthContext from "../context/APIContext";

export default ({ selectPage }) => {
  const authContext = useContext(AuthContext);

  return (
    <div className="ui vertical icon menu hide-on-mobile fixed-menu">
      <button className="item borjessons-link" onClick={() => selectPage(1)}>
        <i className="gamepad icon borjessons-icon" />
      </button>
      <button className="item borjessons-link" onClick={() => selectPage(3)}>
        <i className="user icon borjessons-icon" />
      </button>
      <button className="item borjessons-link" onClick={() => selectPage(2)}>
        <i className="trophy icon borjessons-icon" />
      </button>
      <button
        className="item borjessons-link"
        onClick={() => authContext.signOut()}
      >
        <i className="sign-out icon borjessons-icon" />
      </button>
    </div>
  );
};
