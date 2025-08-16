import React from 'react';
import { Shield, AlertTriangle, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <p className="text-red-700 font-semibold">
                  By using Quick eLoans' services, you explicitly consent to the collection, use, and sharing of your information as described in this policy. If you do not agree, do not use our services.
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Quick eLoans ("we," "us," or "our") is a loan matching company dedicated to connecting borrowers with lenders. This Privacy Policy outlines our practices regarding the collection, use, disclosure, and protection of your information when you visit our website or utilize our services. By using our services, you consent to the practices described in this policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p className="text-gray-700">
                    This includes, but is not limited to, your name, email address, phone number, and any other identifying information you provide during registration or loan applications.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Financial Information</h3>
                  <p className="text-gray-700">
                    We collect information related to your financial status, including income, employment details, credit history, and any other financial data necessary for loan matching.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Data</h3>
                  <p className="text-gray-700">
                    We gather information about your interactions with our website, including your IP address, browser type, access times, and pages visited.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Purpose of Data Collection</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>To connect you with potential lenders</li>
                  <li>To process and evaluate your loan application</li>
                  <li>To communicate with you regarding your application status and our services</li>
                  <li>To enhance and improve our website and services</li>
                  <li>To comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Verification Requirement</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">4.1 Identity Verification with Lender</h3>
                  <p className="text-gray-700">
                    Before proceeding with any loan application, you are required to verify your identity directly with the lender. This verification process may include providing government-issued identification, proof of income, and any other documentation as deemed necessary by the lender. Failure to provide accurate and complete information may result in the denial of your application by the lender.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4.2 Responsibility for Information</h3>
                  <p className="text-gray-700">
                    You are solely responsible for ensuring that all information you provide to the lender is accurate, complete, and up-to-date. Quick eLoans is not responsible for the verification process conducted by the lender. We reserve the right to refuse service or terminate your account if we suspect any information provided is false or misleading.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Disclaimer of Liability</h2>
              <div className="bg-red-50 p-6 rounded-lg space-y-4">
                <p className="text-red-700">
                  Quick eLoans is not responsible for any loss, damage, or fraud that may occur as a result of your interactions with third-party lenders. While we collect information to connect borrowers with lenders, we do not endorse or guarantee the services provided by these lenders.
                </p>
                <div>
                  <h3 className="font-semibold mb-2 text-red-700">Borrower Responsibility</h3>
                  <p className="text-red-700">
                    It is the borrower's responsibility to verify the lender's interest rates, policies, and terms before proceeding with any loan application. Quick eLoans is not liable for any damages, losses, or fraudulent activities conducted by third-party lenders.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-red-700">No Blame Clause</h3>
                  <p className="text-red-700">
                    Borrowers do not have the right to blame Quick eLoans for any damages, losses, or fraud perpetrated by third-party lenders. All responsibility for the loan agreement lies with the borrower and the lender.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Disclosure of Your Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Lenders and Financial Institutions: To facilitate loan matching and processing</li>
                  <li>Service Providers: Third-party vendors who assist us in operating our website and providing our services, subject to strict confidentiality agreements</li>
                  <li>Legal Authorities: If required by law, regulation, or legal process, or to protect our rights and the rights of others</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Lock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-gray-700">
                    We implement robust security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  We reserve the right to modify this Privacy Policy at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after any modifications constitutes your acceptance of the revised policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-gray-700">
                    If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us using the contact form available on our website.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <h3 className="font-bold mb-2">Legal Notice</h3>
              <p className="text-sm text-gray-600">
                By using Quick eLoans' services, you acknowledge that you have read and understood this Privacy Policy and agree to be bound by its terms and conditions. If you do not agree with any part of this policy, please do not use our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;