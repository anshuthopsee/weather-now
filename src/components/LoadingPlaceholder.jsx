import React from 'react';

const LoadingPlaceholder = ({ lines = 4 }) => {
  const placeholders = Array.from({ length: lines }, (_, index) => (
    <div key={index} className='flex m-4 h-[21.35px] rounded-md bg-gray-400 animate-pulse'></div>
  ));

  return (
    <div className='flex w-full flex-col h-full justify-center'>
      {placeholders}
    </div>
  );
};

export default LoadingPlaceholder;