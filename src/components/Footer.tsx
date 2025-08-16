import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    
    // Navigate to the new route
    navigate(to);
    
    // After navigation, scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo showText={false} className="w-8 h-8 mr-2" />
              <span className="text-xl font-bold">  Quick eLoans</span>
            </div>
            <p className="text-sm text-emerald-100 mb-4">
              Your trusted partner for quick and reliable financial solutions. We're here to help you manage your financial needs with ease.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/about-us" 
                  className="hover:text-emerald-200"
                  onClick={(e) => handleNavigation(e, '/about-us')}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/how-it-works" 
                  className="hover:text-emerald-200"
                  onClick={(e) => handleNavigation(e, '/how-it-works')}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="/why-us" 
                  className="hover:text-emerald-200"
                  onClick={(e) => handleNavigation(e, '/why-us')}
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a 
                  href="/faq" 
                  className="hover:text-emerald-200"
                  onClick={(e) => handleNavigation(e, '/faq')}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="/contact-us" 
                  className="hover:text-emerald-200"
                  onClick={(e) => handleNavigation(e, '/contact-us')}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

        

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>help.quickeloan@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-emerald-100">
              © Quick eLoans. All rights reserved.
            </div>
            <div className="text-sm text-emerald-100 md:text-right">
              <a 
                href="/privacy-policy" 
                className="hover:text-emerald-200 mr-4"
                onClick={(e) => handleNavigation(e, '/privacy-policy')}
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-and-conditions" 
                className="hover:text-emerald-200 mr-4"
                onClick={(e) => handleNavigation(e, '/terms-and-conditions')}
              >
                Terms and Conditions
              </a>
              <a 
                href="/fraud-prevention" 
                className="hover:text-emerald-200"
                onClick={(e) => handleNavigation(e, '/fraud-prevention')}
              >
                Fraud Prevention
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;