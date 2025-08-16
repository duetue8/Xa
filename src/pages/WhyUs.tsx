import React from 'react';
import { Shield, Clock, Users, CheckCircle, Search, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyUs = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Business Partnership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90">
              <div className="h-full flex flex-col items-center justify-center text-white p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Choose Quick eLoans</h1>
                <p className="text-xl text-center text-emerald-50">Your Trusted Loan Matching Service</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Main Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lead Generation Service</h3>
                <p className="text-gray-600">
                  We collect your loan inquiry details and sell them to interested third-party lenders.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Data Handling</h3>
                <p className="text-gray-600">
                  Your information is encrypted and protected to ensure your privacy during the lead generation process.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Lead Delivery</h3>
                <p className="text-gray-600">
                  We quickly share your lead with potential lenders, but only when you request it. Lenders may then contact you directly with loan offers.
                </p>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="bg-gray-50 rounded-xl p-8 mb-16">
              <h2 className="text-2xl font-semibold mb-8 text-center">Our Service Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Transparent Lead Sharing</h3>
                    <p className="text-gray-600">We share your loan request with third-party lenders who may contact you with offers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Simple Process</h3>
                    <p className="text-gray-600">Submit a single form — it’s quick, easy, and free to use.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Protection</h3>
                    <p className="text-gray-600">Your personal information is securely encrypted and only shared with lenders who buy our leads.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <HeartHandshake className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Support Team</h3>
                    <p className="text-gray-600">We provides fast and reliable assistance throughout the lead submission process.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-orange-500 mr-3 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-orange-700">Important Notice</h2>
                  <p className="text-orange-600">
                    Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">Let us help you find the right loan provider for your needs.</p>
              <Link
                to="/apply"
                className="inline-block bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

export default WhyUs;