import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Dashboard.css";

import Card from "../Card/Card";
import NodeList from "../NodeList/NodeList";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="container">
        <div className="title">
          Dashboard
          <NodeList />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
