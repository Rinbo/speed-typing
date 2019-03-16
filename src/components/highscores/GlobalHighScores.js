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
    return highscores.map((highscore, index) => {
      return (
        <tr key={highscore.id}>
          <td>{index + 1}.</td>
          <td>{highscore.name}</td>
          <td>{highscore.score}</td>
          <td>{highscore.date.slice(0, 10)}</td>
        </tr>
      );
    });
  };

  if (highscores.length === 0) {
    return <Spinner />;
  }
  return (
    <table
      className="ui very basic centered collapsing celled table"
      style={{
        maxWidth: 400,
        textAlign: "center",
        display: "block",
        margin: "auto"
      }}
    >
      <thead>
        <tr>
          <th>Position</th>
          <th>User</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{renderHighscores()}</tbody>
    </table>
  );
};

export default GlobalHighScores;
