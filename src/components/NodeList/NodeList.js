import React, { useState, useEffect } from "react";
import axios from "axios";

const NodeList = () => {
  const [prices, setPrices] = useState(0);
  const [nodes, setNodes] = useState(0);
  const [dashValue, setDashValue] = useState(0);
  const [defiValue, setDefiValue] = useState(0);
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
      const dashValue = activeDashNodes.reduce((total, node) => total + 1000, 0) * dashPrice;
      setDashValue(dashValue.toFixed(2));
    }
  };

  const calculateDefiPrice = () => {
    if (prices && nodes) {
      const defiPrice = prices.defichain.usd;
      const activeDashNodes = nodes.filter((node) => node.coin === "DeFi" && node.status === "ACTIVE");
      const defiValue = activeDashNodes.reduce((total, node) => total + 20000, 0) * defiPrice;
      setDefiValue(defiValue.toFixed(2));
    }
  };

  useEffect(() => {
    calculateDashPrice();
    calculateDefiPrice();
  }, [prices, nodes]);

  // const fetchData = () => {
  //   // Get current market prices for Dash and DefiChain from CoinGeko

  //   const nodesAPI = "https://api.cakedefi.com/nodes?order=status&orderBy=DESC";

  //   axios.all([axios.get(pricesAPI), axios.get(nodesAPI)]).then(
  //     axios.spread((...res) => {
  //       const pricesRes = res[0].data;
  //       const nodesRes = res[1].data;

  //       // USD value of all active Dash assets
  //       const dashPrice = pricesRes.dash.usd;
  //       const activeDashNodes = nodesRes.filter((node) => node.coin === "Dash" && node.status === "ACTIVE");
  //       const dashValue = activeDashNodes.reduce((total, node) => total + 1000, 0) * dashPrice;
  //       setDashValue(dashValue.toFixed(2));

  //       //USD value of all active DeFiChain assets
  //       const defiPrice = pricesRes.defichain.usd;
  //       const activeDefiNodes = nodesRes.filter((node) => node.coin === "DeFi" && node.status === "ACTIVE");
  //       const defiValue = activeDefiNodes.reduce((total, node) => total + 1000, 0) * defiPrice;
  //       setDefiValue(defiValue.toFixed(2));
  //     })
  //   );
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return <div>{dashValue + defiValue}</div>;
};

export default NodeList;
