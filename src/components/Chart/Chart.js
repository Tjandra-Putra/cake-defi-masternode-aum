import React from "react";

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
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Chart = ({ nodes, dashNodesPrice, defiNodesPrice }) => {
  // Get the lastReward.createdAt for each node
  const createdAtArray = nodes.map((node) =>
    node.lastReward ? new Date(node.lastReward.createdAt).getFullYear() : null
  );

  const data = {
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
        backgroundColor: " rgb(254, 0, 174, 0.5)",
      },
    ],
  };

  const options = {};

  return (
    <div className="chart-wrapper mt-3">
      <div className="card">
        <div className="card-body">
          <h4 className="ms-2">Total Nodes Price</h4>

          <Bar style={{ padding: "10px", width: "100%" }} data={data} options={options}></Bar>
        </div>
      </div>
    </div>
  );
};

export default Chart;
