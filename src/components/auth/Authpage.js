import React, { useContext, useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import APIContext from "../context/APIContext";
import GameContainer from "../game/GameContainer";

export const Authpage = () => {
  const apiContext = useContext(APIContext);
  const [loginPage, setLoginPage] = useState(false);

  useEffect(() => {
    setLoginPage(false);
  }, []);

  const renderBlurb = () => {
    return (
      <div className="ui container" style={{ margin: "35px 0px 60px 0px" }}>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <div
            className="ui basic segment"
            style={{
              maxWidth: 600,
              display: "inline-block",
              fontSize: 17
            }}
          />
        </div>
      </div>
    );
  };

  if (loginPage) {
    return <Login setLoginPage={setLoginPage} />;
  }
  if (!apiContext.isSignedIn) {
    return (
      <div>
        {renderBlurb()}
        <Register setLoginPage={setLoginPage} />

        <p style={{ textAlign: "center", marginTop: 15 }}>
          If you already have an account
        </p>
        <button
          style={{ display: "block", margin: "auto" }}
          className="ui button basic black"
          onClick={() => setLoginPage(true)}
        >
          Login
        </button>
      </div>
    );
  }
  return <GameContainer />;
};

export default Authpage;
