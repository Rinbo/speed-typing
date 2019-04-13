import React, { useState, useEffect } from "react";

const UserStats = ({ state }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    calculateDataPoints();
  }, []);

  const calculateDataPoints = () => {
    const scores = state.userScores;
    const prunedScores = scores.filter(score => score.score !== 0).reverse();
    const granularity = 5;
    const histogram = [];
    let yValues = [];
    for (let i = 0; i < prunedScores.length; i) {
      // Continue here - not working properly below
      yValues = prunedScores.filter(
        score =>
          score >= prunedScores[i].score &&
          score < prunedScores[i].score + granularity
      );
      histogram[i] = { x: prunedScores[i].score, y: yValues.length };
    }
    setDataPoints(histogram);
  };
  console.log(dataPoints);

  return <div />;
};

export default UserStats;
