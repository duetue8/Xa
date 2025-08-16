import React from 'react';
import Logo from './Logo';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <Logo variant="vertical" showText={true} className="w-32 h-32 mb-4" />
        <p className="text-gray-600"></p>
      </div>
    </div>
  );
};

export default LoadingSpinner;