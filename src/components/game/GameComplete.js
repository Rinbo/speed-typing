import React, { useContext } from "react";
import Register from "../auth/Register";
import APIContext from "../context/APIContext";

const GameComplete = ({ score, restart }) => {
  const apiContext = useContext(APIContext);

  return (
    <>
      <div style={{ textAlign: "center", fontSize: 30, marginBottom: 50 }}>
        <div
          className="ui container"
          style={{ textAlign: "center", fontSize: 30 }}
        >
          Your score: {score}
        </div>
        <button
          className="ui button basic black"
          style={{ marginTop: 20 }}
          onClick={() => {
            restart();
          }}
        >
          <i className="undo icon" style={{ margin: "auto" }} />
        </button>
      </div>
      {!apiContext.isSignedIn ? <Register /> : null}
    </>
  );
};

export default GameComplete;
