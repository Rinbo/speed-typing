import React, { useEffect, useState, useContext } from "react";
import endpoint from "../apis/endpoint";
import APIContext from "../context/APIContext";

const GlobalHighScores = () => {
  const [highscores, updateHighscores] = useState([]);
  const [userScore, updateUserScore] = useState(null);
  const apiContext = useContext(APIContext);

  useEffect(() => {
    endpoint
      .get("/highscores/all", { params: { name: apiContext.signedInUser } })
      .then(response => {
        const scores = response.data;
        if (scores.length === 11) {
          updateUserScore(scores.splice(10)[0]);
        }
        updateHighscores(scores);
      })
      .catch(e => {
        const message = e.response.data.message.split('"')[1];
        const statusCode = parseInt(e.response.data.message.match(/\d+/g)[0]);
        apiContext.setStatus(message, statusCode);
      });
  }, []);

  const renderUserScore = () => {
    return (
      <>
        <tr>
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr style={{ borderTop: "3px solid white" }}>
          <td>{userScore.flashRank}.</td>
          <td>{userScore.name}</td>
          <td>{userScore.score}</td>
          <td>{userScore.date.slice(0, 10)}</td>
        </tr>
      </>
    );
  };

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
    <div style={{ margin: "auto", maxWidth: 450 }}>
      <div className="ui centered inverted sub header">
        Score board - Top 10
      </div>
      <table
        className="ui very basic sortable collapsing celled inverted table"
        style={{
          minWidth: 400,
          textAlign: "center",
          display: "block",
          padding: "25px"
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
        <tbody>
          {renderHighscores()}
          {userScore ? renderUserScore() : null}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalHighScores;
