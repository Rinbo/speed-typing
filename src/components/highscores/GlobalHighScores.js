import React, { useEffect, useState, useContext } from "react";
import APIContext from "../context/APIContext";
import { getHighscores } from "../actions/highscoreActions";

const GlobalHighScores = () => {
  const [highscores, updateHighscores] = useState([]);
  const [userScore, updateUserScore] = useState(null);
  const apiContext = useContext(APIContext);

  useEffect(() => {
    const scores = getHighscores(
      { params: apiContext.signedInUser },
      apiContext.globalDispatch
    );
    if (scores.length === 11) {
      updateUserScore(scores.splice(10)[0]);
    }
    updateHighscores(scores);
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
