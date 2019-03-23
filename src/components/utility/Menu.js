import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/APIContext";

export default ({ selectPage }) => {
  const [windowWidth, setWindowWidth] = useState(1000);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", onWindowChange);
    window.addEventListener("resize", onWindowChange);
  }, []);

  const onWindowChange = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <div
      className={
        windowWidth < 769
          ? "ui bottom fixed fluid four item menu show-on-mobile"
          : "ui vertical icon menu fixed-menu"
      }
    >
      <button className="item borjessons-link" onClick={() => selectPage(1)}>
        <i className="gamepad icon borjessons-icon" />
      </button>
      <button className="item borjessons-link" onClick={() => selectPage(2)}>
        <i className="trophy icon borjessons-icon" />
      </button>
      <button className="item borjessons-link" onClick={() => selectPage(3)}>
        <i className="user icon borjessons-icon" />
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
