import React from 'react';

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 50 50"
      style={{ animation: 'rotate 1s linear infinite' }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#ccc"
        strokeWidth="4"
      />
    </svg>
  );
}

export default Spinner;
