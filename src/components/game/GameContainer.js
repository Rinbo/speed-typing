import React, { Component } from "react";

export class GameContainer extends Component {
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
      </div>
    );
  }
}

export default GameContainer;
