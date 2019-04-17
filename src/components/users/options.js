export const options = (xlabel, ylabel) => {
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
          },
          ticks: {
            precision: 0
          }
        }
      ]
    },
    maintainAspectRatio: false
  };
  return opts;
};
