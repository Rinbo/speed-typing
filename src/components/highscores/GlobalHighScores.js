import React, { useEffect, useState, useContext } from "react";
import endpoint from "../apis/endpoint";
import APIContext from "../context/APIContext";

const GlobalHighScores = () => {
  const [highscores, updateHighscores] = useState([]);
  const apiContext = useContext(APIContext);

  useEffect(() => {
    endpoint
      .get("/highscores/all")
      .then(response => {
        updateHighscores(response.data);
      })
      .catch(e => {
        const message = e.response.data.message.split('"')[1];
        const statusCode = parseInt(e.response.data.message.match(/\d+/g)[0]);
        apiContext.setStatus(message, statusCode);
      });
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
    return null;
  }
  return (
    <>
      <div className="ui centered inverted sub header">Score board</div>
      <table
        className="ui very basic centered collapsing celled inverted table"
        style={{
          maxWidth: 400,
          textAlign: "center",
          display: "block",
          margin: "25px auto"
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
    </>
  );
};

export default GlobalHighScores;
