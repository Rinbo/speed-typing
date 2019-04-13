import React from "react";

const UserScores = ({ state }) => {
  const renderScores = () => {
    const topTen = state.userScores.slice(0, 10);
    return topTen.map((score, index) => {
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
            <th>Position</th>
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
