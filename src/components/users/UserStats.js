import React, { useState } from "react";

const UserStats = ({ state }) => {
  const [dataPoints, setDataPoints] = useState([]);

  const calculateDataPoints = () => {
    const scores = state.userScores;

    // Remove zeroValues
    const prunedScores = scores.filter(score => score.score != 0);

    // Determine span
    
  };
  calculateDataPoints();

  return <div />;
};

export default UserStats;
