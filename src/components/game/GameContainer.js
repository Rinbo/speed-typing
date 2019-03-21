import React, { Component } from "react";
import GameField from "./GameField";
import file from "../resources/game.txt";
import GameComplete from "./GameComplete";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import { parseErr } from "../utility/parseResponse";

export class GameContainer extends Component {
  state = {
    typedCode: "",
    displayCode: ``,
    score: 0,
    gameStatus: "ready",
    codeRepo: []
  };

  componentDidMount = () => {
    fetch(file)
      .then(response => response.text())
      .then(text => this.setState({ codeRepo: text.split("\n") }))
      .then(() => this.getRandomCode());
  };

  getRandomCode = () => {
    const { codeRepo } = this.state;
    const randomNumber = Math.floor(Math.random() * codeRepo.length);
    this.setState({
      displayCode: codeRepo[randomNumber].trim()
    });
  };

  restart = () => {
    this.setState({ gameStatus: "ready", typedCode: "", score: 0 });
    this.getRandomCode();
  };

  parseInput = input => {
    const { score, displayCode } = this.state;
    if (input === displayCode) {
      const currentScore = score;
      this.setState({
        typedCode: "",
        score: currentScore + displayCode.length
      });
      this.getRandomCode();
    } else {
      this.setState({ typedCode: input });
    }
  };

  gameComplete = () => {
    const { score } = this.state;
    const currentScore = score;
    const remainingScore = this.countRemaingScore();
    this.setState({
      score: currentScore + remainingScore,
      gameStatus: "complete"
    });
    this.updateHighScore();
  };

  updateHighScore = () => {
    setHeaders();
    endpoint
      .put("/highscores/update", { score: this.state.score })
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        console.log(response);
        this.setState({
          statusMessage: response.data,
          statusCode: response.status
        });
      })
      .catch(err => {
        const [message, statusCode] = parseErr(err);
        this.setState({ statusMessage: message, statusCode });
        console.log(message, statusCode);
      });
  };

  countRemaingScore = () => {
    const { typedCode, displayCode } = this.state;
    let counter = 0;
    displayCode.split("").forEach((char, index) => {
      if (char === typedCode[index]) {
        counter += 1;
      }
    });
    return counter;
  };

  render() {
    const {
      gameStatus,
      typedCode,
      displayCode,
      score,
      statusMessage,
      statusCode
    } = this.state;
    if (gameStatus === "ready") {
      return (
        <GameField
          typedCode={typedCode}
          displayCode={displayCode}
          parseInput={this.parseInput}
          gameComplete={this.gameComplete}
          restart={this.restart}
        />
      );
    }
    if (gameStatus === "complete") {
      return <GameComplete restart={this.restart} score={score} />;
    }
    return null;
  }
}

export default GameContainer;
