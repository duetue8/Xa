import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo showText={false} className="w-12 h-12" />
              <span className="text-2xl font-bold text-white tracking-tight">Quick eLoans</span>
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white hover:text-gray-200 font-medium">HOME</Link>
            <Link to="/about-us" className="text-white hover:text-gray-200 font-medium">ABOUT US</Link>
            <Link to="/how-it-works" className="text-white hover:text-gray-200 font-medium">HOW IT WORKS</Link>
            <Link to="/why-us" className="text-white hover:text-gray-200 font-medium">WHY US</Link>
            <Link to="/faq" className="text-white hover:text-gray-200 font-medium">FAQ</Link>
            <Link to="/contact-us" className="text-white hover:text-gray-200 font-medium">CONTACT US</Link>
            <Link
              to="/apply"
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-white shadow-lg z-50`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </Link>
          <Link 
            to="/about-us" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT US
          </Link>
          <Link 
            to="/how-it-works" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            HOW IT WORKS
          </Link>
          <Link 
            to="/why-us" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            WHY US
          </Link>
          <Link 
            to="/faq" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/contact-us" 
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT US
          </Link>
          <Link
            to="/apply"
            className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            APPLY NOW
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;