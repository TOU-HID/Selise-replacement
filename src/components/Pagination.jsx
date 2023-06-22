import React, { useState } from 'react';

function Pagination({ itemsPerPage, data }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page navigation
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Render the current page items */}
      {currentItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Render pagination buttons */}
      <div>
        {data.length > itemsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
              (_, index) => (
                <li key={index}>
                  <button onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Pagination;
