import React, { useState, useRef } from 'react';
import './Datatable.css';

function DataTable({ data, rowsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop } = tableRef.current;
    const thead = tableRef.current.querySelector('thead');
    if (thead) {
      thead.style.transform = `translateY(${scrollTop}px)`;
    }
  };

  return (
    <div className="table-container" onScroll={handleScroll} ref={tableRef}>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="table-body">
        <table>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={{
                fontWeight: pageNumber === currentPage ? 'bold' : 'normal',
              }}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default DataTable;
