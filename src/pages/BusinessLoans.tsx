import React from 'react';
import { DollarSign, AlertTriangle, TrendingUp, Building2, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessLoans = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Business Loans</h1>
            
            <div className="relative overflow-hidden rounded-xl mb-8">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Business Growth"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-blue-600/80 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <h2 className="text-3xl font-bold mb-4">Grow Your Business</h2>
                  <p className="text-xl">Business Loans up to $50,000</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-lg shadow-sm">
                <Building2 className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">All Business Types</h3>
                <p className="text-gray-600">Solutions for various industries</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-lg shadow-sm">
                <TrendingUp className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fast Funding</h3>
                <p className="text-gray-600">Quick access to capital</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-lg shadow-sm">
                <BarChart className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Flexible Terms</h3>
                <p className="text-gray-600">Tailored to your needs</p>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Business Funding Uses</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Equipment Purchase',
                  'Inventory Stock',
                  'Working Capital',
                  'Expansion Costs',
                  'Marketing Budget',
                  'Hiring Staff',
                  'Technology Upgrade',
                  'Emergency Funds'
                ].map((use, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <span className="text-sm font-medium">{use}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Disclaimer</h3>
              <p className="text-gray-700 mb-4">Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.</p>
              <div className="mt-6 text-center">
                <Link
                  to="/apply"
                  className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-700 hover:to-blue-700 transition-colors"
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

export default BusinessLoans;