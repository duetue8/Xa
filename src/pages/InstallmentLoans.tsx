import React from 'react';
import { DollarSign, AlertTriangle, Clock, Shield, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstallmentLoans = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Installment Loans</h1>
            
            <div className="relative overflow-hidden rounded-xl mb-8">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Financial Planning"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <h2 className="text-3xl font-bold mb-4">Flexible Payment Plans</h2>
                  <p className="text-xl">Borrow $1,000 - $10,000</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow-sm">
                <Calculator className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fixed Payments</h3>
                <p className="text-gray-600">Predictable monthly installments</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow-sm">
                <Clock className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Longer Terms</h3>
                <p className="text-gray-600">3 to 60 months repayment</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow-sm">
                <Shield className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Better Rates</h3>
                <p className="text-gray-600">Lower APR than payday loans</p>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Loan Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <span>Fixed Monthly Payments</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <span>No Early Payment Penalties</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <span>Competitive Interest Rates</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <span>Regular Income Source</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <span>Active Bank Account</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
                      <span>Valid ID & Contact Info</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

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

            <div className="text-center">
              <Link
                to="/apply"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentLoans;