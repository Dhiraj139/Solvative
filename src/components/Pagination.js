import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange, data }) => {
  const maxPagesToShow = 5;

  const getVisiblePages = () => {
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage > totalPages - 3) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    }
  };

  const visiblePages = getVisiblePages();
  console.log("data", data);

  return (
    <>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
        )}
      </div>
    </>
  );
};

export default Pagination;
