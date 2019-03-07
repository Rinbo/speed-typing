import React, { Component } from "react";

export class GameField extends Component {
  state = {
    clockState: "ready",
    clock: 20000
  };
  /* 
  componentDidMount = () => {
    this.props.getRandomCode();
  }; */

  renderCode = () => {
    const { displayCode, typedCode } = this.props;
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

  timer = () => {
    if (this.state.clockState === "ready") {
      this.startTimer();
      this.setState({ clockState: true });
    }
  };

  startTimer = () => {
    const gameInterval = setInterval(() => {
      const currentClock = this.state.clock;
      if (currentClock === 0) {
        this.setState({ clockState: "complete", clock: 5000 });
        clearInterval(gameInterval);
        this.props.gameComplete();
        return null;
      }
      this.setState({ clock: currentClock - 1000 });
    }, 1000);
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <pre>
          <code className="unselectable">{this.renderCode()}</code>
        </pre>
        <form className="ui form" onSubmit={e => e.preventDefault()}>
          <div className="field">
            <input
              type="text"
              spellCheck="false"
              onChange={e => {
                e.preventDefault();
                this.props.parseInput(e.target.value);
              }}
              onKeyDown={this.timer}
              value={this.props.typedCode}
              style={{ width: 400, marginTop: 30 }}
            />
          </div>
        </form>
        <br />
        {this.state.clock / 1000}
      </div>
    );
  }
}

export default GameField;
