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
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <pre>
        <code className="unselectable">{renderCode()}</code>
      </pre>
      <form className="ui form" onSubmit={e => e.preventDefault()}>
        <div className="field">
          <input
            type="text"
            spellCheck="false"
            onChange={e => {
              e.preventDefault();
              parseInput(e.target.value);
            }}
            onKeyDown={begin}
            value={typedCode}
            style={{ width: 400, marginTop: 30 }}
          />
        </div>
      </form>
      <br />
      {clock / 1000}
    </div>
  );
};

export default GameField;
