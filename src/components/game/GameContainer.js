import React, { Component } from "react";
import GameField from "./GameField";
import file from "../resources/game.txt";

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
    const { gameStatus, typedCode, displayCode, score } = this.state;
    if (gameStatus === "ready") {
      return (
        <GameField
          typedCode={typedCode}
          displayCode={displayCode}
          parseInput={this.parseInput}
          gameComplete={this.gameComplete}
          getRandomCode={this.getRandomCode}
        />
      );
    }
    if (gameStatus === "complete") {
      return (
        <div
          className="ui container"
          style={{ textAlign: "center", fontSize: 30, marginTop: 100 }}
        >
          Your score: {score}
        </div>
      );
    }
    return <div className="ui centered header">Woot! How did I get here?</div>;
  }
}

export default GameContainer;
