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
          {/* Comprehensive Disclaimer */}
          <div className="mb-8 p-6 bg-emerald-800/20 rounded-lg border border-emerald-400/30">
            <div className="text-sm text-emerald-100 space-y-4">
              <p>
                <strong>quickeloans.ca</strong> (the "website") is not an offer or solicitation to lend. The website only provides a lead generation service and is not an agent, representative, or broker of any lender and does not endorse or charge you for any loan or product. The website operators are not lenders, do not make loans of any type, and do not make credit decisions. The website collects personal information provided by Canadian residents and forwards it to licensed Canadian lenders in our network. You are under no obligation to use this website or service to initiate, contact, nor apply for credit or any loan product with any service provider or lender.
              </p>
              
              <p>
                Loan amounts vary from CAD $1,000 and CAD $50,000 but not all Canadian lenders can provide up to CAD $50,000. Providing your information on the website does not guarantee you will be approved for a loan or credit product. Fund transfer times may vary between Canadian lenders and may depend on your individual Canadian financial institution. In some circumstances additional documentation may be required.
              </p>
              
              <p>
                If you have any questions, contact your Canadian lender directly for details, questions, or concerns regarding your loan or credit product. Short-term cash loans are meant to provide you with short-term financing to solve immediate cash needs and should not be considered a long-term solution. This service and Canadian lenders are not available in all provinces. Canadian lenders may perform credit checks with Canadian credit reporting bureaus: Equifax Canada or TransUnion Canada, or may perform alternative credit checks or consumer reports through alternative Canadian providers.
              </p>
              
              <p>
                By submitting your request, you acknowledge, agree, and authorize that (a) your information may be sent to licensed Canadian lenders and/or third-party partners on your behalf, and (b) such Canadian lenders may obtain consumer reports and related information about you from one or more Canadian consumer reporting agencies, such as TransUnion Canada and Equifax Canada to evaluate your creditworthiness in accordance with Canadian privacy laws including PIPEDA.
              </p>
              
              <p>
                <strong>Important:</strong> Quick eLoans Canada is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect Canadian lenders with potential leads they may purchase. All transactions and agreements are between the Canadian lenders and the leads they choose to contact.
              </p>
            </div>
          </div>

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