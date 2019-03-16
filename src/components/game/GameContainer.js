import React, { useState, useEffect } from "react";
import GameField from "./GameField";
import Spinner from "../utility/Spinner";
import file from "../resources/game.txt";
import GameComplete from "./GameComplete";

export const GameContainer = () => {
  const [typedCode, updateTypedCode] = useState("");
  const [displayCode, updateDisplayCode] = useState(``);
  const [score, updateScore] = useState(0);
  const [gameStatus, updateGameStatus] = useState("ready");
  const [codeRepo, updateCodeRepo] = useState([]);

  useEffect(() => {
    readFromFile();
  }, []);

  const readFromFile = async () => {
    try {
      const code = await fetch(file);
      const text = await code.text();
      getRandomCode(text.split("\n"));
    } catch (e) {
      console.log(e, "Failed to parse file");
    }
  };

  const getRandomCode = (code = null) => {
    if (code) {
      updateCodeRepo(code);
    }
    const finalCode = code || codeRepo;
    const randomNumber = Math.floor(Math.random() * finalCode.length);
    updateDisplayCode(finalCode[randomNumber].trim());
  };

  const restart = () => {
    updateGameStatus("ready");
    updateTypedCode("");
    updateScore(0);
    getRandomCode();
  };

  const parseInput = input => {
    if (input === displayCode) {
      const currentScore = score;
      updateTypedCode("");
      updateScore(currentScore + displayCode.length);
      getRandomCode();
    } else {
      updateTypedCode(input);
    }
  };

  const gameComplete = () => {
    const currentScore = score;
    const remainingScore = countRemaingScore();
    updateScore(currentScore + remainingScore);
    updateGameStatus("complete");
  };
  const countRemaingScore = () => {
    let counter = 0;
    displayCode.split("").forEach((char, index) => {
      if (char === typedCode[index]) {
        counter += 1;
      }
    });
    return counter;
  };
  if (gameStatus === "ready") {
    return (
      <GameField
        typedCode={typedCode}
        displayCode={displayCode}
        parseInput={parseInput}
        gameComplete={gameComplete}
        restart={restart}
      />
    );
  }
  if (gameStatus === "complete") {
    return <GameComplete restart={restart} score={score} />;
  }
  return <Spinner />;
};

export default GameContainer;
