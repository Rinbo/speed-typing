import React, { Component } from "react";

export class GameContainer extends Component {
  state = {
    code: "",
    indicator: "grey"
  };

  renderJSX = () => {
    const jsx = `import {setHeader} from "../apis/axios"`;
    return jsx;
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <pre>
          <code>{this.renderJSX()}</code>
        </pre>
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: this.state.indicator,
            margin: "auto"
          }}
        />
        <form className="ui form">
          <div className="field">
            <input
              type="text"
              onChange={this.parseInput}
              value={this.state.code}
              style={{ width: 400, marginTop: 30 }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default GameContainer;
