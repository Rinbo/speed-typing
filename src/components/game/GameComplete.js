import React from "react";
import Register from "../auth/Register";

const GameComplete = ({ score, restart }) => {
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
      <Register />
    </>
  );
};

export default GameComplete;
