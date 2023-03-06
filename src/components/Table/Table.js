import { React, useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";

const Table = ({ nodes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nodesPerPage] = useState(10);

  // Get current nodes
  const indexOfLastNode = currentPage * nodesPerPage;
  const indexOfFirstNode = indexOfLastNode - nodesPerPage;
  const currentNode = nodes.slice(indexOfFirstNode, indexOfLastNode);

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleNext = () => {
    // max page number
    if (currentPage < Math.ceil(nodes.length / nodesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrev = () => {
    // min page number
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-row">
            <h4 className="ms-2">All Masternodes</h4>
            {/* <select className="form-select" value={null} onChange={null}>
              <option value="usd">Set Currency: USD (Default)</option>
              <option value="eur">EUR</option>
              <option value="sgd">SGD</option>
              <option value="btc">BTC</option>
            </select> */}
          </div>

          <div className="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Type</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Reward received</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>
                {currentNode.map((node, index) => {
                  const actualIndex = index + (currentPage - 1) * nodesPerPage;

                  return (
                    <tr key={index}>
                      <th scope="row">{actualIndex}</th>
                      <td>{node.id}</td>
                      <td>{node.coin}</td>
                      <td>{node.type}</td>
                      <td>
                        {node.lastReward.amount.amount} {node.lastReward.amount.coin}
                      </td>
                      <td>{node.lastReward.createdAt.toLocaleString()}</td>
                      <td>
                        {node.status === "ACTIVE" ? (
                          <span class="badge text-bg-success fw-bolder">{node.status}</span>
                        ) : (
                          <span class="badge text-bg-secondary fw-bolder">Inactive</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            nodesPerPage={nodesPerPage}
            totalNodes={nodes.length}
            paginate={handlePaginate}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
