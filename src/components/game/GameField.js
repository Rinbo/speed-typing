import React, { useState, useRef } from "react";

const ROUND_TIME = 10000;

export const GameField = ({
  typedCode,
  displayCode,
  parseInput,
  gameComplete
}) => {
  const [gameState, updateGameState] = useState("ready");
  const [clock, updateClock] = useState(ROUND_TIME);
  const intervalRef = useRef();

  const renderCode = () => {
    return displayCode.split("").map((char, index) => {
      let color = "black";
      if (char === typedCode[index]) {
        color = "lightgreen";
      } else if (typedCode[index] === undefined) {
        color = "black";
      } else {
        color = "red";
      }
      return (
        <code key={index} style={{ color: color }}>
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
    setTimeout(() => {
      gameComplete();
    }, 10);
  }

  return (
    <div style={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>
      <pre>
        <code className="unselectable">{renderCode()}</code>
      </pre>
      <form className="ui form" onSubmit={e => e.preventDefault()}>
        <div className="field" style={{ marginTop: 30 }}>
          <input
            type="text"
            spellCheck="false"
            onChange={e => {
              e.preventDefault();
              parseInput(e.target.value);
            }}
            onKeyDown={begin}
            value={typedCode}
            style={{ maxWidth: 400, display: "inline" }}
          />
        </div>
      </form>
      <div className="item" style={{ marginTop: 10 }}>
        <button className="ui basic black button left floated">
          <i className="recycle icon" style={{ margin: "auto" }} />
        </button>
        <div
          className="ui right floated"
          style={{ padding: 10, textAlign: "right" }}
        >
          {clock / 1000}
        </div>
      </div>
    </div>
  );
};

export default GameField;
