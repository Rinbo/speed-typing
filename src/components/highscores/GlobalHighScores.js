import React, { useEffect } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";

const GlobalHighScores = () => {
  useEffect(() => {
    endpoint
      .get("/highscores/all")
      .then(response => {
        populateHighscores(response.data);
        localStorage.setItem("token", response.headers.token);
        setHeaders();
      })
      .catch(e => alert("failed to fetch highscores"));
  }, []);

  const populateHighscores = data => {
    console.log(data);
  };

  return (
    <div>
      <div className="ui header">==== High Scores ==== </div>
      <div> @TODO - add react router-dom</div>
    </div>
  );
};

export default GlobalHighScores;
