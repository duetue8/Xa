import React from 'react';
import { AlertTriangle, Shield, Lock } from 'lucide-react';

const FraudPrevention = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Fraud Prevention & Safety</h1>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-red-700">Critical Alert</h2>
                  <p className="text-red-600">
                    Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Current Payday Loan Scams</h2>
              
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-xl font-semibold mb-3 text-orange-800">Advance Fee Scams</h3>
                  <p className="text-gray-700 mb-4">
                    Fraudsters request upfront payments for "guaranteed" loans. Legitimate lenders never require payment before providing a loan.
                  </p>
                  <div className="bg-white p-4 rounded">
                    <p className="text-sm text-orange-800">
                      Warning: Never pay fees upfront, especially via gift cards, wire transfers, or cryptocurrency.
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-xl font-semibold mb-3 text-orange-800">Fake Lender Websites</h3>
                  <p className="text-gray-700 mb-4">
                    Scammers create convincing fake lending websites to steal personal information.
                  </p>
                  <div className="bg-white p-4 rounded">
                    <p className="text-sm text-orange-800">
                      Warning: Always verify lender licenses and check for secure website connections (https://).
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-xl font-semibold mb-3 text-orange-800">Phishing Attempts</h3>
                  <p className="text-gray-700 mb-4">
                    Fraudulent emails claiming to be from lenders requesting sensitive information.
                  </p>
                  <div className="bg-white p-4 rounded">
                    <p className="text-sm text-orange-800">
                      Warning: Never share banking credentials or social security numbers via email.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Protect Yourself</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">Verify Lenders</h3>
                  <p className="text-sm text-gray-700">
                    Check lender licenses with state regulators before proceeding.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <Lock className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">Secure Data</h3>
                  <p className="text-sm text-gray-700">
                    Only share information through secure, verified channels.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">Report Fraud</h3>
                  <p className="text-sm text-gray-700">
                    Report suspicious activities to authorities immediately.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Important Disclosure</h3>
              <p className="text-gray-700 mb-4">
                Quick eLoans is exclusively a loan matching service that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Does NOT provide loans directly</li>
                <li>Has NO control over lender decisions or terms</li>
                <li>Is NOT responsible for any financial losses</li>
                <li>Does NOT guarantee loan approval</li>
                <li>Cannot verify lender legitimacy</li>
              </ul>
              <p className="mt-4 text-gray-700">
                Users are solely responsible for verifying lender credentials and understanding all loan terms before proceeding. Quick eLoans will not be held liable for any losses or damages resulting from interactions with third-party lenders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudPrevention;