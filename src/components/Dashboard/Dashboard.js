import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    getPrices();
    getNodes();
  }, []);

  const getPrices = () => {
    const pricesAPI = "https://api.coingecko.com/api/v3/simple/price?ids=dash,defichain&vs_currencies=usd,eur,sgd,btc";

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
      const dashPrice = prices.dash[selectedCurrency];
      // console.log(`=========== Currency: ${selectedCurrency}, DashPrice: ${dashPrice}`);
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
      const defiPrice = prices.defichain[selectedCurrency];
      // console.log(`=========== Currency: ${selectedCurrency}, DeFi =Price: ${defiPrice}`);
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

  // Change currency
  const handleSelectCurrency = (e) => {
    setSelectedCurrency(e.target.value);
    toast.success(`Currency changed to ${e.target.value.toUpperCase()}`);
  };

  useEffect(() => {
    calculateDashPrice();
    calculateDefiPrice();
    calculateTotalAUM();
  }, [prices, nodes, totalAUM, calculateDashPrice, calculateDefiPrice]);

  return (
    <div className="dashboard-wrapper">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container">
        <div className="coin-wrapper">
          <h1 className="coin-header">Dashboard</h1>
          <select className="form-select" value={selectedCurrency} onChange={handleSelectCurrency}>
            <option value="usd">Set Currency: USD (Default)</option>
            <option value="eur">EUR</option>
            <option value="sgd">SGD</option>
            <option value="btc">BTC</option>
          </select>

          <div className="row">
            <div className="col-md-5">
              {prices && nodes ? (
                <Card
                  currentPrice={prices.dash[selectedCurrency]}
                  nodesPrice={dashNodesPrice}
                  nodesValue={dashNodesValue}
                  coinName="Dash"
                  isActive={nodes[0].status}
                  coinCurrency="DASH"
                  currency={selectedCurrency}
                  activeNodes={activeDashNodes}
                />
              ) : (
                "Loading..."
              )}
            </div>
            <div className="col-md-5">
              {prices && nodes ? (
                <Card
                  currentPrice={prices.defichain[selectedCurrency]}
                  nodesPrice={defiNodesPrice}
                  nodesValue={defiNodesValue}
                  coinName="DeFi"
                  isActive={nodes[0].status}
                  coinCurrency="DFI"
                  currency={selectedCurrency}
                  activeNodes={activeDefiNodes}
                />
              ) : (
                "Loading..."
              )}
            </div>
            <div className="col-md-2">
              {prices && nodes ? (
                <div className="card">
                  <h4 className="card-header pt-3">Summary</h4>
                  <div className="card-body">
                    <React.Fragment>
                      <h6>Total AUM</h6>
                      <p>
                        {parseFloat(totalAUM).toLocaleString()} {selectedCurrency}
                      </p>

                      <h6>Total Nodes</h6>
                      <p>{(activeDashNodes + activeDefiNodes).toLocaleString()}</p>
                    </React.Fragment>
                  </div>
                </div>
              ) : (
                "Loading..."
              )}
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
