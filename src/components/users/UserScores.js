import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const UserScores = ({ state }) => {
  const [allScores, toggle] = useState(false);
  const renderScores = () => {
    const scores = allScores ? state.userScores : state.userScores.slice(0, 10);
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
      {state.userScores.length > 10 ? (
        <Button
          style={{ margin: "auto", display: "block" }}
          centered
          basic
          inverted
          color="green"
          onClick={() => {
            toggle(prevState => !prevState);
          }}
        >
          {allScores ? "Show less" : "Show all"}
        </Button>
      ) : null}
    </div>
  );
};

export default UserScores;
