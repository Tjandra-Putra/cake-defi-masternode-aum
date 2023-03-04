import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Dashboard.css";
import Card from "../Card/Card";
import Chart from "../Chart/Chart";

const Dashboard = () => {
  const [prices, setPrices] = useState(0);
  const [nodes, setNodes] = useState(0);
  const [dashNodesPrice, setDashNodesPrice] = useState(0);
  const [defiNodesPrice, setDefiNodesPrice] = useState(0);
  const [dashNodesValue, setDashNodesValue] = useState(0);
  const [defiNodesValue, setDefiNodesValue] = useState(0);
  const [totalAUM, setTotalAUM] = useState(0);
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    getPrices();
    getNodes();
  }, []);

  const getPrices = () => {
    const pricesAPI = "https://api.coingecko.com/api/v3/simple/price?ids=dash,defichain&vs_currencies=usd";

    axios
      .get(pricesAPI)
      .then((res) => {
        setPrices(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getNodes = () => {
    const nodesAPI = "https://api.cakedefi.com/nodes?order=status&orderBy=DESC";

    axios
      .get(nodesAPI)
      .then((res) => {
        setNodes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateDashPrice = () => {
    if (prices && nodes) {
      const dashPrice = prices.dash.usd;
      const activeDashNodes = nodes.filter((node) => node.coin === "Dash" && node.status === "ACTIVE");
      const dashNodesValue = activeDashNodes.reduce((total, node) => total + 1000, 0);
      const dashValue = dashNodesValue * dashPrice;
      setDashNodesPrice(dashValue.toFixed(2));
      setDashNodesValue(dashNodesValue);
    }
  };

  const calculateDefiPrice = () => {
    if (prices && nodes) {
      const defiPrice = prices.defichain.usd;
      const activeDefiNodes = nodes.filter((node) => node.coin === "DeFi" && node.status === "ACTIVE");
      const defiNodesValue = activeDefiNodes.reduce((total, node) => total + 20000, 0);
      const defiNodesPrice = defiNodesValue * defiPrice;
      setDefiNodesPrice(defiNodesPrice.toFixed(2));
      setDefiNodesValue(defiNodesValue);
    }
  };

  const calculateTotalAUM = () => {
    if (prices && nodes) {
      setTotalAUM((parseFloat(dashNodesPrice) + parseFloat(defiNodesPrice)).toFixed(2));
    }
  };

  useEffect(() => {
    calculateDashPrice();
    calculateDefiPrice();
    calculateTotalAUM();
  }, [prices, nodes, totalAUM]);

  return (
    <div className="dashboard-wrapper">
      <div className="container">
        <div className="coin-wrapper">
          <div className="row">
            <div className="col-md-5">
              {prices && nodes ? (
                <Card
                  currentPrice={prices.dash.usd}
                  nodesPrice={dashNodesPrice}
                  nodesValue={dashNodesValue}
                  coinName="Dash"
                  isActive={nodes[0].status}
                  coinCurrency="DASH"
                  currency={currency}
                />
              ) : (
                "Loading..."
              )}
            </div>
            <div className="col-md-5">
              {prices && nodes ? (
                <Card
                  currentPrice={prices.defichain.usd}
                  nodesPrice={defiNodesPrice}
                  nodesValue={defiNodesValue}
                  coinName="DeFi"
                  isActive={nodes[0].status}
                  coinCurrency="DFI"
                  currency={currency}
                />
              ) : (
                "Loading..."
              )}
            </div>
            <div className="col-md-2">
              <div class="card">
                <h4 class="card-header pt-3">Summary</h4>
                <div class="card-body">
                  {prices && nodes ? (
                    <React.Fragment>
                      <h6>TOTAL AUM</h6>
                      <p>
                        {totalAUM} {currency}
                      </p>

                      <h6>Total Nodes</h6>
                      <p>{nodes.length}</p>
                    </React.Fragment>
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
