import React from 'react';
import { Mail, AlertTriangle } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-emerald-50">We're here to help with your questions</p>
          </div>

          {/* Important Notice */}
          <div className="p-6 bg-orange-50 border-b border-orange-100">
            <div className="flex items-start max-w-3xl mx-auto">
              <AlertTriangle className="h-6 w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <p className="text-orange-700">
                <span className="font-semibold">Important:</span>  Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.
              </p>
            </div>
          </div>

          {/* Email Contact */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-block bg-emerald-100 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Email Support</h2>
              <p className="text-gray-600 text-lg">help.quickeloan@gmail.com</p>
            </div>
          </div>
        </div>

         {/* Email Contact */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-block bg-emerald-100 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Purchase Leads</h2>
              <p className="text-gray-600 text-lg">sales.quickeloan@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default ContactUs;
