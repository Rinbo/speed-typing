import React, { useState } from "react";
import GameContainer from "./game/GameContainer";
import Menu from "./utility/Menu";
import MobileMenu from "./utility/MobileMenu";
import GlobalHighScores from "./highscores/GlobalHighScores";
import UserScores from "./highscores/UserScores";

export const LandingPage = () => {
  const [pageNumber, updatePageNumber] = useState(1);

  const renderMain = () => {
    switch (pageNumber) {
      case 1:
        return <GameContainer />;
      case 2:
        return <GlobalHighScores />;
      case 3:
        return <UserScores />;
      default:
        return <div>"Hello!"</div>;
    }
  };

  const selectPage = pageNumber => {
    updatePageNumber(pageNumber);
  };

  return (
    <div className="ui container">
      <Menu selectPage={selectPage} />
      <MobileMenu selectPage={selectPage} />
      {renderMain()}
    </div>
  );
};

export default LandingPage;
