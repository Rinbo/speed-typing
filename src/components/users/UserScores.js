import React, { useEffect, useReducer, useContext } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import APIContext from "../context/APIContext";
import { parseErr } from "../utility/parseResponse";
import { getUserScores } from "../actions/highscoreActions";
import {
  scoresReducer,
  initialScores
} from "../reducers/scoresReducer";
import { userReducer } from "../reducers/userReducer";

const UserScores = () => {
  const [state, updateState] = useReducer(scoresReducer, initialScores);
  const apiContext = useContext(APIContext);

  useEffect(() => {
    setHeaders();
    
  }, []);

  const renderScores = () => {
    return scores.map((score, index) => {
      return (
        <tr key={score.id}>
          <td>{index + 1}.</td>
          <td>{score.score}</td>
          <td>{score.date.slice(0, 10)}</td>
        </tr>
      );
    });
  };

  if (scores.length === 0) {
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
            <th>Rank</th>
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
