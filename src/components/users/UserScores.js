import React, { useEffect, useReducer, useContext } from "react";
import APIContext from "../context/APIContext";
import { getUserScores } from "../actions/highscoreActions";
import { scoresReducer, initialScores } from "../reducers/scoresReducer";

const UserScores = () => {
  const [state, updateState] = useReducer(scoresReducer, initialScores);
  const apiContext = useContext(APIContext);

  useEffect(() => {
    getUserScores(updateState, apiContext.globalDispatch);
  }, []);

  const renderScores = () => {
    return state.userScores.map((score, index) => {
      return (
        <tr key={score.id}>
          <td>{index + 1}.</td>
          <td>{score.score}</td>
          <td>{score.date.slice(0, 10)}</td>
        </tr>
      );
    });
  };

  if (state.userScores.length === 0) {
    return null;
  }

  return (
    <div>
      <table
        className="ui very basic centered collapsing celled inverted table"
        style={{
          maxWidth: 225,
          textAlign: "center",
          display: "block",
          margin: "25px auto"
        }}
      >
        <thead>
          <tr>
            <th>Top 10</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{renderScores()}</tbody>
      </table>
    </div>
  );
};

export default UserScores;
