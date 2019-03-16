import React from "react";

const GameComplete = ({ score, restart }) => {
  return (
    <div style={{ textAlign: "center", fontSize: 30 }}>
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
  );
};

export default GameComplete;
