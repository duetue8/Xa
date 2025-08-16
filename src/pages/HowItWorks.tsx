import React from 'react';
import { Search, Users, CheckCircle, DollarSign, Shield, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Business Process"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90">
              <div className="h-full flex flex-col items-center justify-center text-white p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">How Our Service Works</h1>
                <p className="text-xl text-center text-emerald-50">Simple Steps to Connect with Lenders</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Process Steps */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm h-full">
                    <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="absolute top-8 right-4 md:right-0 text-5xl font-bold text-emerald-100">1</div>
                    <h3 className="text-xl font-semibold mb-3">Complete Application</h3>
                    <p className="text-gray-600">Fill out our simple online form with your basic information and loan requirements</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm h-full">
                    <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <LinkIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="absolute top-8 right-4 md:right-0 text-5xl font-bold text-emerald-100">2</div>
                    <h3 className="text-xl font-semibold mb-3">Get Connected</h3>
                    <p className="text-gray-600">We share your application data with third-party lenders, who may contact you directly.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm h-full">
                    <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="absolute top-8 right-4 md:right-0 text-5xl font-bold text-emerald-100">3</div>
                    <h3 className="text-xl font-semibold mb-3">Review Offers</h3>
                    <p className="text-gray-600">Compare loan offers from multiple lenders and choose the best option</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="bg-gray-50 rounded-xl p-8 mb-16">
              <h2 className="text-2xl font-semibold mb-8 text-center">Our Matching Service Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Get Connected with Interested Lenders</h3>
                    <p className="text-gray-600">Access various lenders through a single application, increasing your chances of finding the right loan.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Secure Process</h3>
                    <p className="text-gray-600">"We take your privacy seriously. Your data is encrypted with 256-bit security and stored in secure, password-protected systems throughout the entire matching process.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">No Obligation</h3>
                    <p className="text-gray-600">Submit your information free of charge. If lenders contact you with loan offers, you’re under no obligation to accept — you choose the option that best fits your needs..</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Free Service</h3>
                    <p className="text-gray-600">We are a lead generation service. When you submit your information, we collect your details and sell them to third-party lenders who may contact you directly with loan offers.

Our service is completely free to use — there are no hidden fees or charges for submitting your application..</p>
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
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;