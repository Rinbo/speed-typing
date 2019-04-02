import React, { useState, useRef } from "react";
import { Button } from "semantic-ui-react";

const ROUND_TIME = 10000;

export const GameField = ({
  typedCode,
  displayCode,
  parseInput,
  gameComplete,
  restart
}) => {
  const [gameState, updateGameState] = useState("ready");
  const [clock, updateClock] = useState(ROUND_TIME);
  const intervalRef = useRef();

  const renderCode = () => {
    return displayCode.split("").map((char, index) => {
      let color = "#dddddd";
      let backgroundColor = "";
      if (char === typedCode[index]) {
        color = "#21ba45";
      } else if (typedCode[index] === undefined) {
        color = "#dddddd";
      } else {
        color = "#FA8072";
        if (char === " ") {
          backgroundColor = "red";
        }
      }
      return (
        <code
          key={index}
          style={{ color: color, backgroundColor: backgroundColor }}
        >
          {char}
        </code>
      );
    });
  };

  const begin = () => {
    if (gameState === "ready") {
      updateGameState("in progress");
      startTimer();
    }
  };

  const startTimer = () => {
    const gameInterval = setInterval(() => {
      updateClock(prevTick => prevTick - 1000);
    }, 1000);
    intervalRef.current = gameInterval;
    return () => clearInterval(intervalRef.current);
  };

  if (clock === 0) {
    clearInterval(intervalRef.current);
    gameComplete();
  }

  return (
    <div style={{ textAlign: "center", maxWidth: 550, margin: "auto" }}>
      <pre>
        <code className="unselectable">{renderCode()}</code>
      </pre>
      <form className="ui form" onSubmit={e => e.preventDefault()}>
        <div
          className="field"
          style={{
            marginTop: 30,
            borderRadius: "6px",
            borderWidth: 2
          }}
        >
          <input
            type="text"
            spellCheck="false"
            onChange={e => {
              e.preventDefault();
              parseInput(e.target.value);
            }}
            placeholder="The timer starts when you begin typing..."
            onKeyDown={begin}
            value={typedCode}
            style={{ display: "inline" }}
          />
        </div>
      </form>
      <div className="item" style={{ marginTop: 10 }}>
        <Button
          basic
          inverted
          color="green"
          className="ui left floated"
          onClick={() => {
            clearInterval(intervalRef.current);
            updateClock(ROUND_TIME);
            updateGameState("ready");
            restart();
          }}
        >
          <i className="undo icon" style={{ margin: "auto" }} />
        </Button>
        <div
          className="ui right floated"
          style={{
            padding: 10,
            textAlign: "right",
            color: clock <= 5000 ? "tomato" : "black"
          }}
        >
          {clock / 1000}
        </div>
      </div>
    </div>
  );
};

export default GameField;
