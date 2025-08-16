import React from 'react';
import { DollarSign, AlertTriangle, Clock, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalLoans = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Personal Loans</h1>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-3 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-orange-700">Important Notice</h2>
                  <p className="text-orange-600">
                    Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-12">
              <div className="relative overflow-hidden rounded-xl mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Personal Finance"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h2 className="text-3xl font-bold mb-4">Flexible Personal Loans</h2>
                    <p className="text-xl">Borrow $1,000 - $10,000</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-sm">
                  <Clock className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Quick Decisions</h3>
                  <p className="text-gray-600">Get matched with lenders within minutes</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-sm">
                  <Shield className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Secure Process</h3>
                  <p className="text-gray-600">Your information is protected</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-sm">
                  <Users className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Multiple Lenders</h3>
                  <p className="text-gray-600">Compare various loan offers</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Common Uses</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Home Improvements',
                  'Medical Expenses',
                  'Major Purchases',
                  'Emergency Costs',
                  'Wedding Expenses',
                  'Vacation Funding',
                  'Education Costs',
                  'Vehicle Repairs'
                ].map((use, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-medium">{use}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Disclaimer</h3>
              <p className="text-gray-700 mb-4">Quick eLoans Canada is a loan matching service that:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Does NOT provide loans directly</li>
                <li>Cannot guarantee loan approval</li>
                <li>Is not responsible for lending decisions by Canadian lenders</li>
                <li>Operates in compliance with Canadian financial regulations</li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  to="/apply"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoans;
  )
}