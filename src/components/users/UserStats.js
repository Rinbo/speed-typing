import React, { useState, useEffect } from "react";

import CanvasJSReact from "../../assets/canvasjs.react";

const XAXIS_PADDING = 10;
const GRANULARITY = 5;

const UserStats = ({ state }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
    animationEnabled: true,
    theme: "dark2",
    backgroundColor: "transparent",
    axisY: {
      title: "# of Results"
    },
    axisX: {
      title: "Score"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
    ]
  };
  if (dataPoints.length === 0) return null;
  return (
    <div>
      <CanvasJSChart options={options} />
      <p>
        Histogram of your result history. Your scores are grouped in intervals
        of 5 on the x-axis and the number of results in each interval is shown
        on the y-axis
      </p>
    </div>
  );
};

export default UserStats;
