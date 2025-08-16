import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Shield, DollarSign, Users, CheckCircle, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-grow overflow-hidden">
      {/* Hero Section - Removed parallax effect */}
      <div className="relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-600/90">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 mx-auto max-w-4xl">Find Your Perfect Loan Match</h1>
              <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-2xl mx-auto">
                Connect with lenders through our advanced lead generation service. One application, multiple loan options.
              </p>
              <Link
                to="/apply"
                className="bg-white text-emerald-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Apply Now
              </Link>
              <p className="mt-6 text-sm text-emerald-200">Submit your information free of charge. No obligations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-gradient-to-b from-emerald-700 to-emerald-900 py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-3d bg-white/10 backdrop-blur-md p-8 rounded-xl text-white border border-white/10">
              <div className="animate-float">
                <ClipboardList className="h-16 w-16 mb-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Simple Process</h3>
              <p className="text-lg text-emerald-100">One 5-minute application to connect with multiple lenders</p>
            </div>

            <div className="card-3d bg-white/10 backdrop-blur-md p-8 rounded-xl text-white border border-white/10">
              <div className="animate-float">
                <Users className="h-16 w-16 mb-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lead Generation Network</h3>
              <p className="text-lg text-emerald-100">Access to a verified network of personal loan leads generated through our website.</p>
            </div>

            <div className="card-3d bg-white/10 backdrop-blur-md p-8 rounded-xl text-white border border-white/10">
              <div className="animate-float">
                <Shield className="h-16 w-16 mb-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Process</h3>
              <p className="text-lg text-emerald-100">Advanced encryption protects your information</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How Our Matching Service Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: 1,
                icon: <ClipboardList className="h-8 w-8 text-emerald-600" />,
                title: "Quick Application",
                description: "Fill out one simple online form"
              },
              {
                step: 2,
                icon: <Users className="h-8 w-8 text-emerald-600" />,
                title: "Connect",
                description: "Get connect with potential lenders"
              },
              {
                step: 3,
                icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
                title: "Compare Offers",
                description: "Review and choose your best option"
              }
            ].map((item, index) => (
              <div key={index} className="card-3d bg-white p-8 rounded-xl shadow-xl">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">{item.title}</h3>
                <p className="text-gray-600 text-center text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                <span className="text-emerald-600">Why Use Our Service?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                As a specialized lead generation service, we help you:
              </p>
              <ul className="space-y-6">
                {[
                  "Save time with one simple application",
                  "Access multiple loan options",
                  "Compare offers easily",
                  "Get Connect quickly",
                  "Review and Accept "
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-lg">
                    <CheckCircle className="h-8 w-8 text-emerald-600 mr-4" />
                    <span className="transform hover:translate-x-2 transition-transform">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://i.ibb.co/xtdLVsD3/communication-1297544.png"
                alt="Loan application process"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-red-600 mb-4">Important Notice:</h3>
            <p className="text-gray-600 leading-relaxed">
              Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;