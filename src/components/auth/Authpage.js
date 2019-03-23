import React, { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import APIContext from "../context/APIContext";
import GameContainer from "../game/GameContainer";

export const Authpage = () => {
  const apiContext = useContext(APIContext);

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

  if (!apiContext.isSignedIn) {
    return (
      <div>
        {renderBlurb()}
        <Register signIn={apiContext.signIn} />
        <div
          className="ui horizontal divider"
          style={{ maxWidth: 360, margin: "auto" }}
        >
          OR
        </div>
        <Login signIn={apiContext.signIn} />
      </div>
    );
  } else {
    return <GameContainer />;
  }
};

export default Authpage;
