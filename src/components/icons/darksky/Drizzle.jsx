import React from 'react';

export default () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <defs>
      <clipPath id="a">
        <path fill="none" d="M42 64l2.85-17h-23.8L17 64" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <g>
        <path
          fill="none"
          stroke="#2885c7"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M32.08 49.01l-.16.98"
        />
        <animateTransform
          attributeName="transform"
          dur="1.5s"
          repeatCount="indefinite"
          type="translate"
          values="2 -10; -2 10"
        />
        <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="1;1;0" />
      </g>
      <g>
        <path
          fill="none"
          stroke="#2885c7"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M26.08 49.01l-.16.98"
        />
        <animateTransform
          attributeName="transform"
          begin="-0.5s"
          dur="1.5s"
          repeatCount="indefinite"
          type="translate"
          values="2 -10; -2 10"
        />
        <animate
          attributeName="opacity"
          begin="-0.5s"
          dur="1.5s"
          repeatCount="indefinite"
          values="1;1;0"
        />
      </g>
      <g>
        <path
          fill="none"
          stroke="#2885c7"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M38.08 49.01l-.16.98"
        />
        <animateTransform
          attributeName="transform"
          begin="-1s"
          dur="1.5s"
          repeatCount="indefinite"
          type="translate"
          values="2 -10; -2 10"
        />
        <animate
          attributeName="opacity"
          begin="-1s"
          dur="1.5s"
          repeatCount="indefinite"
          values="1;1;0"
        />
      </g>
    </g>
    <path
      fill="#efefef"
      stroke="#efefef"
      strokeMiterlimit="10"
      strokeWidth="3"
      d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
    />
  </svg>
);