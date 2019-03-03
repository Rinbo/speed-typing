import React, { Component } from "react";
import GameContainer from "./game/GameContainer";
import Menu from "./utility/Menu";
import MobileMenu from "./utility/MobileMenu";

export class LandingPage extends Component {
  render() {
    return (
      <div className="ui container">
        <Menu signOut={this.props.signOut} />
        <MobileMenu signOut={this.props.signOut} />
        <GameContainer />
      </div>
    );
  }
}

export default LandingPage;
