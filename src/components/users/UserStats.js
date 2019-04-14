import React, { useState, useEffect } from "react";
import { Bar, Line, defaults } from "react-chartjs-2";

const XAXIS_PADDING = 10;
const GRANULARITY = 5;

const UserStats = ({ state }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [barLabels, setBarLabels] = useState([]);
  const [barData, setBarData] = useState([]);
  const [lineLabels, setLineLabels] = useState([]);
  const [lineData, setLineData] = useState([]);
  defaults.global.defaultFontColor = "#cccccc";

  useEffect(() => {
    calculateDataPoints();
  }, []);

  const calculateDataPoints = () => {
    const prunedObjArray = state.userScores.filter(score => score.score !== 0);

    // Line data
    const dateSorted = prunedObjArray.sort((d1, d2) => {
      const date1 = new Date(d1.date);
      const date2 = new Date(d2.date);
      return date1 - date2;
    });
    setLineLabels(dateSorted.map(obj => ""));
    setLineData(dateSorted.map(obj => obj.score));

    // Histogram data
    const prunedScores = prunedObjArray.map(score => score.score);
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
    setBarLabels(histogram.map(obj => `${obj.x} - ${obj.x + GRANULARITY} `));
    setBarData(histogram.map(obj => obj.y));
  };

  const options = (xlabel, ylabel) => {
    const opts = {
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
              labelString: xlabel
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
              labelString: ylabel
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    };
    return opts;
  };

  if (dataPoints.length === 0) return null;

  return (
    <div style={{ marginTop: 50 }}>
      <div className="chart-container">
        <div className="ui inverted centered sub header">Histogram</div>
        <p style={{ fontSize: 10, marginTop: 20 }}>
          Histogram of your result history - Your scores are grouped in
          intervals of 5 on the x-axis and the number of results in each
          interval is shown on the y-axis
        </p>
        <Bar
          data={{
            labels: barLabels,
            datasets: [
              {
                label: "Number of results in score range",
                backgroundColor: "rgba(33,186,69,0.2)",
                borderColor: "rgba(33,186,69,1)",
                borderWidth: 1,
                defaultFontColor: "#cccccc",
                hoverBackgroundColor: "rgba(33,186,69,0.4)",
                hoverBorderColor: "rgba(33,186,69,1)",
                data: barData
              }
            ]
          }}
          width={400}
          height={400}
          options={options("Score", "Frequency")}
        />
      </div>
      <div className="chart-container" style={{ marginTop: 100 }}>
        <div className="ui inverted centered sub header">Evolution</div>
        <p style={{ fontSize: 10, marginTop: 20 }}>
          This graph shows how your result has changed over time
        </p>
        <Line
          data={{
            labels: lineLabels,
            datasets: [
              {
                label: "Number of results in score range",
                backgroundColor: "rgba(33,186,69,0.2)",
                borderColor: "rgba(33,186,69,1)",
                borderWidth: 1,
                defaultFontColor: "#cccccc",
                hoverBackgroundColor: "rgba(33,186,69,0.4)",
                hoverBorderColor: "rgba(33,186,69,1)",
                data: lineData
              }
            ]
          }}
          width={400}
          height={400}
          options={options("Time", "Score")}
        />
      </div>
    </div>
  );
};

export default UserStats;
