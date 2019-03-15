import React, { useEffect, useState } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import Spinner from "../utility/Spinner";

const GlobalHighScores = () => {
  const [highscores, updateHighscores] = useState([]);

  useEffect(() => {
    endpoint
      .get("/highscores/all")
      .then(response => {
        updateHighscores(response.data);
        localStorage.setItem("token", response.headers.token);
        setHeaders();
      })
      .catch(e => alert("failed to fetch highscores"));
  }, []);

  const renderHighscores = () => {
    return highscores.map(highscore => {
      return (
        <div className="ui celled ordered centered list" style={{maxWidth: 400}}>
          <div className="item" key={highscore.key}>
            <div className="item">{highscore.name}</div>
            <div className="item">{highscore.name}</div>
          </div>
        </div>
      );
    });
  };

  if (highscores.length === 0) {
    return <Spinner />;
  }
  return renderHighscores();
};

export default GlobalHighScores;
