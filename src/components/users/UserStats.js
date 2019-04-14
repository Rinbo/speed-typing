import React, { useState, useEffect } from "react";

var CanvasJSReact = require("../../assets/canvasjs.react");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const XAXIS_PADDING = 10;
const GRANULARITY = 5;

const UserStats = ({ state }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    calculateDataPoints();
  }, []);

  const calculateDataPoints = () => {
    const scores = state.userScores.map(score => score.score);
    const prunedScores = scores.filter(score => score !== 0).reverse();
    const histogram = [];
    const min = Math.min.apply(null, prunedScores);
    const max = Math.max.apply(null, prunedScores);
    const minX = min - (min % XAXIS_PADDING);
    const maxX = max + (XAXIS_PADDING - (max % XAXIS_PADDING));
    let incrementCount = 0;
    let yValues = [];
    for (let i = minX; i <= maxX; i += GRANULARITY) {
      yValues = prunedScores.filter(
        score => score >= i && score < i + GRANULARITY
      );
      histogram[incrementCount] = {
        x: i,
        y: yValues.length
      };
      incrementCount++;
    }
    setDataPoints(histogram);
  };

  const options = {
    title: {
      text: "Histogram of your score history"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
    ]
  };

  if (dataPoints.length === 0) return null;
  return <CanvasJSChart options={options} />;
};

export default UserStats;
