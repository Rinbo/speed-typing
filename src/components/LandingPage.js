import React from "react";
import GameContainer from "./game/GameContainer";
import Menu from "./utility/Menu";
import MobileMenu from "./utility/MobileMenu";

export const LandingPage = () => {
  return (
    <div className="ui container">
      <Menu />
      <MobileMenu />
      <GameContainer />
    </div>
  );
};

export default LandingPage;
