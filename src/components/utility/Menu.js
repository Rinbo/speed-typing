import React from "react";

export default ({ signOut }) => {
  return (
    <div className="ui vertical icon menu hide-on-mobile fixed-menu">
      <div className="item borjessons-link">
        <i className="gamepad icon" />
      </div>
      <div className="item borjessons-link">
        <i className="user icon" />
      </div>
      <div className="item borjessons-link">
        <i className="trophy icon" />
      </div>
      <div className="item borjessons-link" onClick={() => signOut()}>
        <i className="sign-out icon" />
      </div>
    </div>
  );
};
