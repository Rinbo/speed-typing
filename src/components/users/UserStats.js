import React, { useState, useEffect } from "react";
import { Bar, defaults } from "react-chartjs-2";

const XAXIS_PADDING = 10;
const GRANULARITY = 5;

const UserStats = ({ state }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  defaults.global.defaultFontColor = "#cccccc";

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
    setLabels(histogram.map(obj => `${obj.x} - ${obj.x + GRANULARITY} `));
    setData(histogram.map(obj => obj.y));
  };

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            color: "#cccccc"
          },
          scaleLabel: {
            display: true,
            labelString: "Score"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: true,
            color: "rgba(204, 204, 204, 0.5)"
          },
          scaleLabel: {
            display: true,
            labelString: "Frequency"
          }
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: false
  };

  if (dataPoints.length === 0) return null;

  return (
    <div style={{ marginTop: 50 }} className="chart-container">
      <div className="ui inverted centered sub header">Histogram</div>
      <p style={{ fontSize: 10, marginTop: 20 }}>
        Histogram of your result history - Your scores are grouped in intervals
        of 5 on the x-axis and the number of results in each interval is shown
        on the y-axis
      </p>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Number of results in score range",
              backgroundColor: "rgba(33,186,69,0.2)",
              borderColor: "rgba(33,186,69,1)",
              borderWidth: 1,
              defaultFontColor: "#cccccc",
              hoverBackgroundColor: "rgba(33,186,69,0.4)",
              hoverBorderColor: "rgba(33,186,69,1)",
              data
            }
          ]
        }}
        width={400}
        height={400}
        options={options}
      />
    </div>
  );
};

export default UserStats;
