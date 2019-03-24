import React, { useState, useEffect, useContext } from "react";
import GameField from "./GameField";
import { gameCode } from "../resources/gameCode";
import GameComplete from "./GameComplete";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import { parseErr } from "../utility/parseResponse";
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
    const game = [...Object.values(gameCode)];
    const randomNumber = Math.floor(Math.random() * game.length);
    setDisplayCode(game[randomNumber]);
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
    console.log(remainingScore, "fram game complete");
    console.log(score, "scoooore")
    setScore(prevScore => prevScore + remainingScore);
    setGameStatus("complete");
    updateHighScore();
  };

  const updateHighScore = () => {
    setHeaders();
    endpoint
      .put("/highscores/update", { score })
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        apiContext.setStatus(response.data, response.status);
        console.log(response);
      })
      .catch(err => {
        const [message, statusCode] = parseErr(err);
        apiContext.setStatus(message, statusCode);
        console.log(message, statusCode);
      });
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
