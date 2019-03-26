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

  const renderUserLinks = () => {
    return (
      <>
        <button className="item borjessons-link" onClick={() => selectPage(3)}>
          <i className="user icon borjessons-icon" />
        </button>
        <button
          className="item borjessons-link"
          onClick={() => {
            authContext.signOut();
            selectPage(1);
          }}
        >
          <i className="sign-out icon borjessons-icon" />
        </button>
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <button className="item borjessons-link" onClick={() => selectPage(4)}>
        <i className="sign-in icon borjessons-icon" />
      </button>
    );
  };

  return (
    <div
      className={
        windowWidth < 769
          ? "ui bottom fixed fluid four item inverted menu"
          : "ui vertical icon menu inverted fixed-menu"
      }
    >
      <button className="item borjessons-link" onClick={() => selectPage(1)}>
        <i className="gamepad icon borjessons-icon" />
      </button>
      <button className="item borjessons-link" onClick={() => selectPage(2)}>
        <i className="trophy icon borjessons-icon" />
      </button>
      {authContext.isSignedIn ? renderUserLinks() : renderAuthLinks()}
    </div>
  );
};
