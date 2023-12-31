import React from 'react';

export default () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <g>
      <circle cx="32" cy="32" r="11.64" fill="#FFFF00" />
      <path
        fill="none"
        stroke="#FFFF00"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M32 15.71V9.5M32 54.5v-6.21M43.52 20.48l4.39-4.39M16.09 47.91l4.39-4.39M20.48 20.48l-4.39-4.39M47.91 47.91l-4.39-4.39M15.71 32H9.5M54.5 32h-6.21"
      />
      <animateTransform
        attributeName="transform"
        dur="45s"
        from="0 32 32"
        repeatCount="indefinite"
        to="360 32 32"
        type="rotate"
      />
    </g>
  </svg>
);
