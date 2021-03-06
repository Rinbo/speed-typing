import React, { useState, useEffect, useContext } from "react";
import GameField from "./GameField";
import { makeCodeSnippet } from "../utility/codeMaker";
import { updateScore } from "../actions/highscoreActions";
import GameComplete from "./GameComplete";
import APIContext from "../context/APIContext";

export const GameContainer = () => {
  const [typedCode, setTypedCode] = useState("");
  const [displayCode, setDisplayCode] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("ready");
  const apiContext = useContext(APIContext);

  useEffect(() => {
    getRandomCode();
  }, []);

  const getRandomCode = () => {
    setDisplayCode(makeCodeSnippet(apiContext.singleSemiColon).trim());
  };

  const restart = () => {
    setGameStatus("ready");
    setTypedCode("");
    setScore(0);
    getRandomCode();
  };

  const parseInput = input => {
    if (input === displayCode) {
      setTypedCode("");
      setScore(prevScore => prevScore + displayCode.length);
      getRandomCode();
    } else {
      setTypedCode(input);
    }
  };

  const gameComplete = () => {
    const remainingScore = countRemaingScore();
    setScore(prevScore => prevScore + remainingScore);
    setGameStatus("complete");
    updateHighScore(remainingScore + score);
    apiContext.setScore(remainingScore + score);
  };

  const updateHighScore = finalScore => {
    updateScore({ score: finalScore }, apiContext.globalDispatch);
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
  return null;
};

export default GameContainer;
