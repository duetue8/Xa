import React from 'react';
import Logo from '../components/Logo';

const LogoDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-12">Logo Design Showcase</h1>
          
          {/* Horizontal Layout */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Horizontal Layout</h2>
            <div className="bg-gray-100 p-8 rounded-lg flex justify-center">
              <Logo variant="horizontal" />
            </div>
          </div>

          {/* Vertical Layout */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Vertical Layout</h2>
            <div className="bg-gray-100 p-8 rounded-lg flex justify-center">
              <Logo variant="vertical" />
            </div>
          </div>

          {/* Icon Only */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Icon Only</h2>
            <div className="bg-gray-100 p-8 rounded-lg flex justify-center">
              <Logo showText={false} />
            </div>
          </div>

          {/* Dark Background */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">On Dark Background</h2>
            <div className="bg-gray-900 p-8 rounded-lg flex justify-center">
              <Logo variant="horizontal" />
            </div>
          </div>

          {/* Different Sizes */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
            <div className="bg-gray-100 p-8 rounded-lg flex flex-wrap gap-8 justify-center items-center">
              <Logo className="scale-50" />
              <Logo />
              <Logo className="scale-150" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoDemo;