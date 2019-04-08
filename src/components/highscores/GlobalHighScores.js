import React, { useEffect, useContext, useReducer } from "react";
import APIContext from "../context/APIContext";
import { getHighscores } from "../actions/highscoreActions";
import {
  highscoreReducer,
  initialHighscores
} from "../reducers/highscoreReducer";

const GlobalHighScores = () => {
  const apiContext = useContext(APIContext);
  const [state, highscoresDispatch] = useReducer(
    highscoreReducer,
    initialHighscores
  );

  useEffect(() => {
    getHighscores(
      { params: { name: apiContext.signedInUser } },
      highscoresDispatch,
      apiContext.globalDispatch
    );
  }, []);

  const renderUserScore = () => {
    if (state.highscores.length === 11) {
      const userScore = state.highscores.splice(10)[0];
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
    } else {
      return null;
    }
  };

  const renderHighscores = () => {
    return state.highscores.map((highscore, index) => {
      if (index < 10) {
        return (
          <tr key={highscore.id}>
            <td>{index + 1}.</td>
            <td>{highscore.name}</td>
            <td>{highscore.score}</td>
            <td>{highscore.date.slice(0, 10)}</td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  if (state.highscores.length === 0) {
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
          {renderUserScore()}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalHighScores;
