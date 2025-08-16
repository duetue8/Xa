import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <p className="text-red-700 font-semibold">
                  CRITICAL NOTICE: Quick eLoans is STRICTLY a loan matching service. We DO NOT provide loans, make lending decisions, or guarantee approvals. By using our service, you accept these terms in full.
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  By using the Quick eLoans website and services, you agree to these Terms and Conditions. If you do not agree, please do not use our services.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Services Provided</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Quick eLoans acts as a mediator to connect borrowers with lenders. We do not provide loans directly and are not responsible for any agreements made between borrowers and lenders.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. No Liability</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Quick eLoans is not responsible for any loss, damage, or claims arising from your use of our services or any agreements made with lenders. You acknowledge that you use our services at your own risk.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  You agree to provide accurate and complete information when using our services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Definition</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Quick eLoans:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-semibold">
                  <li>Is ONLY a matching service connecting borrowers to third-party lenders</li>
                  <li>Does NOT provide loans directly</li>
                  <li>Has NO control over lending decisions</li>
                  <li>Makes NO guarantees about loan approval</li>
                  <li>Is NOT responsible for lender terms or practices</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Acknowledgments</h2>
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  By using our service, you explicitly acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>You are responsible for verifying lender legitimacy</li>
                  <li>Quick eLoans is not liable for any financial losses</li>
                  <li>Your information will be shared with multiple lenders</li>
                  <li>Lenders may contact you directly</li>
                  <li>You must verify all loan terms independently</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Liability Waiver</h2>
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-red-700 font-semibold mb-4">
                  Quick eLoans SHALL NOT be held liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-700">
                  <li>Any financial losses or damages</li>
                  <li>Fraudulent activities by third parties</li>
                  <li>Lender practices or decisions</li>
                  <li>Loan terms or agreements</li>
                  <li>Data breaches by third-party lenders</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  You agree to indemnify and hold Quick eLoans harmless from any claims, losses, damages, liabilities, costs, or expenses arising from:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                  <li>Your use of our service</li>
                  <li>Interactions with lenders</li>
                  <li>Loan agreements or terms</li>
                  <li>Violations of these terms</li>
                </ul>
              </div>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Legal Disclaimer</h3>
              <p className="text-gray-700">
                These terms constitute a legally binding agreement. By using Quick eLoans' services, you waive all rights to legal action against Quick eLoans for any damages, losses, or disputes arising from:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                <li>Lender interactions or decisions</li>
                <li>Financial losses or damages</li>
                <li>Fraudulent activities</li>
                <li>Data breaches or misuse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;