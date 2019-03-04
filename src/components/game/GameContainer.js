import React, { Component } from "react";
import GameField from "./GameField";

export class GameContainer extends Component {
  state = {
    typedCode: "",
    displayCode: `import {setHeader} from "../apis/axios"`,
    count: 0
  };

  bingo = () => {
    this.setState({ displayCode: "Boom!", typedCode: "" });
  };

  parseInput = char => {
    this.setState({ typedCode: char });
  };

  render() {
    return (
      <GameField
        typedCode={this.state.typedCode}
        displayCode={this.state.displayCode}
        parseInput={this.parseInput}
        bingo={this.bingo}
      />
    );
  }
}

export default GameContainer;
