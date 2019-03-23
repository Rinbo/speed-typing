import React, { useState, useContext } from "react";
import GameContainer from "./game/GameContainer";
import AuthPage from "./auth/Authpage";
import Menu from "./utility/Menu";
import GlobalHighScores from "./highscores/GlobalHighScores";
import UserScores from "./highscores/UserScores";
import APIContext from "./context/APIContext";

export const LandingPage = () => {
  const [pageNumber, updatePageNumber] = useState(1);
  const apiContext = useContext(APIContext);

  const relayStatus = (message, status) => {
    apiContext.setStatus(message, status);
  };

  const renderMain = () => {
    switch (pageNumber) {
      case 1:
        return <GameContainer ready={"ready"} relayStatus={relayStatus} />;
      case 2:
        return <GlobalHighScores />;
      case 3:
        return <UserScores />;
      case 4:
        return <AuthPage />;
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

      {renderMain()}
    </div>
  );
};

export default LandingPage;
