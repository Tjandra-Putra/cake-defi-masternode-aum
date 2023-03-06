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
  const [activeDashNodes, setActiveDashNodes] = useState(0);
  const [activeDefiNodes, setActiveDefiNodes] = useState(0);
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
      setActiveDashNodes(activeDashNodes.length);
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
      setActiveDefiNodes(activeDefiNodes.length);
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
          <select class="form-select" aria-label="Default select example">
            <option selected>Currency: USD (Default)</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

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
                  activeNodes={activeDashNodes}
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
                  activeNodes={activeDefiNodes}
                />
              ) : (
                "Loading..."
              )}
            </div>
            <div className="col-md-2">
              <div className="card">
                <h4 className="card-header pt-3">Summary</h4>
                <div className="card-body">
                  {prices && nodes ? (
                    <React.Fragment>
                      <h6>TOTAL AUM</h6>
                      <p>
                        {parseFloat(totalAUM).toLocaleString()} {currency}
                      </p>

                      <h6>Total Nodes</h6>
                      <p>{(activeDashNodes + activeDefiNodes).toLocaleString()}</p>
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
          {prices && nodes ? (
            <Chart nodes={nodes} dashNodesPrice={dashNodesPrice} defiNodesPrice={defiNodesPrice} />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
