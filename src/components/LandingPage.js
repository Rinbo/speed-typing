import React, { useState } from "react";
import GameContainer from "./game/GameContainer";
import Menu from "./utility/Menu";
import MobileMenu from "./utility/MobileMenu";
import GlobalHighScores from "./highscores/GlobalHighScores";

export const LandingPage = () => {
  const [pageNumber, updatePageNumber] = useState(1);

  const renderMain = () => {
    switch (pageNumber) {
      case 1:
        return <GameContainer />;
      case 2:
        return <GlobalHighScores />;
      default:
        return <div>"Hello!"</div>;
    }
  };

  const selectPage = pageNumber => {
    updatePageNumber(pageNumber);
  };
  console.log(pageNumber, "pnr");

  return (
    <div className="ui container">
      <Menu selectPage={selectPage} />
      <MobileMenu selectPage={selectPage} />
      {renderMain()}
    </div>
  );
};

export default LandingPage;
