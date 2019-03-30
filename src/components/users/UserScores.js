import React, { useEffect, useState, useContext } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders } from "../apis/setHeaders";
import APIContext from "../context/APIContext";

const UserScores = () => {
  const [scores, updateScore] = useState([]);
  const apiContext = useContext(APIContext);

  useEffect(() => {
    setHeaders();
    endpoint
      .get("/highscores/user")
      .then(response => {
        updateScore(response.data);
        localStorage.setItem("token", response.headers.token);
        setHeaders();
      })
      .catch(e => {
        try {
          const message = e.response.data.message.split('"')[1];
          const statusCode = parseInt(e.response.data.message.match(/\d+/g)[0]);
          apiContext.setStatus(message, statusCode);
        } catch (e) {
          console.log("Failed to fetch user score data");
        }
      });
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
      <div className="ui centered inverted sub header">Your history</div>
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
