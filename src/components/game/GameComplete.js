import React, { useContext } from "react";
import Register from "../auth/Register";
import APIContext from "../context/APIContext";
import { Button } from "semantic-ui-react";

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
        <Button
          basic
          inverted
          color="green"
          style={{ marginTop: 20 }}
          onClick={() => {
            restart();
          }}
        >
          <i className="undo icon" style={{ margin: "auto" }} />
        </Button>
      </div>
      {!apiContext.isSignedIn ? <Register score={score} /> : null}
    </>
  );
};

export default GameComplete;
