import React, { Component } from "react";
import GameField from "./GameField";

export class GameContainer extends Component {
  state = {
    typedCode: "",
    displayCode: `import {setHeader} from "../apis/axios"`
  };

  parseInput = input => {
    if (input === this.state.displayCode) {
      this.setState({ displayCode: "Boom!", typedCode: "" });
    } else {
      this.setState({ typedCode: input });
    }
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
