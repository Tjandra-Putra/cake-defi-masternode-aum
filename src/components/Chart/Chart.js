import { React, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const Chart = ({ dashNodesPrice, defiNodesPrice, title, chartType }) => {
  const totalNodesPriceData = {
    labels: ["Dash & DeFi Comparison"],
    datasets: [
      {
        label: "Dash",
        data: [dashNodesPrice],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "DeFi",
        data: [defiNodesPrice],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(254, 0, 174, 0.5)",
      },
    ],
  };

  const currentPricesData = {
    labels: ["Dash", "DeFi"],
    datasets: [
      {
        fill: true,
        label: "# of Votes",
        data: [dashNodesPrice, defiNodesPrice],
        backgroundColor: ["rgba(53, 162, 235, 0.5)", "rgb(254, 0, 174, 0.5)"],
        borderColor: ["rgba(53, 162, 235, 0.5)", "rgb(53, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  useEffect(() => {
    console.log();
  }, [dashNodesPrice, defiNodesPrice]);

  return (
    <div className="chart-wrapper mt-3">
      <div className="card">
        <div className="card-body" style={{ height: "63vh" }}>
          <h4 className="ms-2">{title}</h4>

          {chartType === "bar" ? (
            <Bar style={{ padding: "10px", width: "100%" }} data={totalNodesPriceData} options={options}></Bar>
          ) : (
            <Pie style={{ padding: "10px", width: "100%" }} data={currentPricesData}></Pie>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
