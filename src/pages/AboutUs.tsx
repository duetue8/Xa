import React from 'react';
import { Users, Shield, CheckCircle, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Team Collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90">
              <div className="h-full flex flex-col items-center justify-center text-white p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">About Quick eLoans</h1>
                <p className="text-xl text-center text-emerald-50">Your Trusted Loan Matching Service</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Welcome to Quickeloans, a trusted lead generation service designed to bridge the gap between lenders and potential borrowers. Established with a focus on innovation, we utilize our advanced website platform to generate high-quality personal loan leads. These leads are carefully curated and offered to third-party lenders who are seeking to expand their customer base. Operating primarily through email, we provide a seamless channel for lenders to purchase and connect with these leads. Our mission is to simplify the lead acquisition process, making it faster, more efficient, and highly targeted for lenders looking to grow their personal loan portfolios.
                </p>
                <p className="text-lg text-gray-600">
                  Our mission is to make the loan discovery process easier, faster, and more efficient for borrowers seeking financial solutions.
                </p>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm">
                  <Users className="h-12 w-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Lead Generation Network</h3>
                  <p className="text-gray-600">Access to a verified network of personal loan leads generated through our website.</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm">
                  <Shield className="h-12 w-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Secure Process</h3>
                  <p className="text-gray-600">Advanced encryption and security measures to protect your information.</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm">
                  <LinkIcon className="h-12 w-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Efficient Matching</h3>
                  <p className="text-gray-600">Quick and reliable delivery of leads to lenders via email based on their preferences.</p>
                </div>
              </div>

              {/* Our Commitment */}
              <div className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">Our Commitment to You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Transparency</h3>
                      <p className="text-gray-600">Clear communication about our role as a lead generation service, not a lender.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Data Protection</h3>
                      <p className="text-gray-600">Secure handling of all lead information in compliance with privacy standards.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quality Leads</h3>
                      <p className="text-gray-600">Consistent delivery of high-potential leads tailored to lender needs.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <LinkIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Efficient Service</h3>
                      <p className="text-gray-600">Streamlined email-based lead distribution process.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
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

              {/* CTA Section */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-600 mb-6">Let us help you find the right loan provider for your needs.</p>
                <Link
                  to="/apply"
                  className="inline-block bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;