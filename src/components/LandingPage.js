import React, { useContext } from "react";
import GameContainer from "./game/GameContainer";
import Menu from "./utility/Menu";
import GlobalHighScores from "./highscores/GlobalHighScores";
import UserScores from "./highscores/UserScores";
import NavigationContext from "./context/NavigationContext";
import Register from "./auth/Register";
import Login from "./auth/Login";

export const LandingPage = () => {
  const navigation = useContext(NavigationContext);

  const renderMain = () => {
    switch (navigation.pageNumber) {
      case 1:
        return <GameContainer />;
      case 2:
        return <GlobalHighScores />;
      case 3:
        return <UserScores />;
      case 4:
        return <Register />;
      case 5:
        return <Login />;
      default:
        return <div>"Hello!"</div>;
    }
  };

  return (
    <div className="ui container">
      <Menu selectPage={navigation.selectPage} />
      {renderMain()}
    </div>
  );
};

export default LandingPage;
