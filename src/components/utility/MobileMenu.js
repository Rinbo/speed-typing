import React, { useContext } from "react";
import AuthContext from "../auth/AuthContext";

export default ({ selectPage }) => {
  const authContext = useContext(AuthContext);

  return (
    <div className="ui bottom fixed fluid four item menu show-on-mobile">
      <div className="item borjessons-link" onClick={()=>selectPage(1)}>
        <i className="gamepad icon" />
      </div>
      <div className="item borjessons-link">
        <i className="user icon" />
      </div>
      <div className="item borjessons-link" onClick={() => selectPage(2)}>
        <i className="trophy icon" />
      </div>
      <div
        className="item borjessons-link"
        onClick={() => authContext.signOut()}
      >
        <i className="sign-out icon" />
      </div>
    </div>
  );
};
