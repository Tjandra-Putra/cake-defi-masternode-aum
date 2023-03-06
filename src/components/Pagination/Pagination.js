import React from "react";

const Pagination = ({ nodesPerPage, totalNodes, paginate, currentPage, handleNext, handlePrev }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNodes / nodesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button onClick={() => handlePrev()} className={currentPage === 1 ? "disabled page-link" : "page-link"}>
              Previous
            </button>
          </li>

          {/* {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? "active page-link" : "page-link"}
              >
                {number}
              </button>
            </li>
          ))} */}

          <li className="page-item ">
            <button
              onClick={() => handleNext()}
              className={currentPage > totalNodes ? "disabled page-link" : "page-link"}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
