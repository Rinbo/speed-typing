import React, { Component } from "react";

export class GameField extends Component {
  renderCode = () => {
    const { displayCode, typedCode } = this.props;
    let counter = 0;
    return displayCode.split("").map((char, index) => {
      let color = "black";
      if (char === typedCode[index]) {
        color = "lightgreen";
        counter += 1;
        if (counter === displayCode.length) {
          this.bingo();
        }
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

  bingo = () => {
    this.props.bingo();
  };

  onchange = e => {
    e.preventDefault();
    this.props.parseInput(e.target.value);
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <pre>
          <code className="unselectable">{this.renderCode()}</code>
        </pre>
        <form className="ui form">
          <div className="field">
            <input
              type="text"
              spellCheck="false"
              onChange={this.onchange}
              value={this.props.typedCode}
              style={{ width: 400, marginTop: 30 }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default GameField;
