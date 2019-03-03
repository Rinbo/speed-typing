import React, { Component } from "react";

export class GameContainer extends Component {
  state = {
    typedCode: "",
    displayCode: `import {setHeader} from "../apis/axios"`,
    colorArray: [],
    keyUsed: null
  };

  renderCode = () => {
    const { displayCode, colorArray } = this.state;
    return displayCode.split("").map((char, index) => {
      return (
        <code
          key={index}
          style={{ color: colorArray[index] ? colorArray[index] : "black" }}
        >
          {char}
        </code>
      );
    });
  };

  parseInput = e => {
    e.preventDefault();
    const { displayCode, keyUsed } = this.state;
    const index = e.target.value.length - 1;
    this.setState({ typedCode: e.target.value });
    const colorArray = { ...this.state.colorArray };
    console.log(keyUsed);
    if (keyUsed === "Backspace") {
      colorArray[index + 1] = "black";
      this.setState({ colorArray: colorArray });
    }

    if (e.target.value[index] === displayCode[index]) {
      colorArray[index] = "lightgreen";
      this.setState({ colorArray: colorArray });
    } else {
      colorArray[index] = "red";
      this.setState({ colorArray: colorArray });
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <pre>
          <code>{this.renderCode()}</code>
        </pre>
        <form className="ui form">
          <div className="field">
            <input
              type="text"
              spellCheck="false"
              onChange={this.parseInput}
              onKeyDown={e => this.setState({ keyUsed: e.key })}
              value={this.state.typedCode}
              style={{ width: 400, marginTop: 30 }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default GameContainer;
