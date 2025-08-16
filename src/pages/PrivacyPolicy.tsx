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
              <h2 className="text-2xl font-bold mb-4">Protecting Your Personal Details on Our Website</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We know that you care how information about you is used and shared, and we appreciate your trust in us to do that carefully and sensibly. This notice describes our privacy policy and forms part of our website terms and conditions ("Website Terms").
                </p>
                <p className="text-gray-700">
                  We believe it is important to protect your Data, and we are committed to giving you a personalised service that meets your needs in a way that also protects your privacy. This policy explains how we may collect Personal Data about you. It also explains some of the security measures we take to protect your Personal Data and tells you certain things we will do and not do. You should read this policy in conjunction with the Website Terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <p className="text-gray-700">
                  We collect and may hold personal data from you via this website and from third-party sources and use it for making decisions, providing services and servicing our relationship with you, to understand your financial needs, assess your credit application, to conduct our business, to provide you with better customer services and products from both ourselves and those of selected third parties, to evaluate the effectiveness of our marketing of the website and for statistical analysis.
                </p>
                <p className="text-gray-700">
                  We only collect information necessary for the operation of the provision of our Service to you. We will not keep your personal data for longer than required to provide the Service or as required by Canadian law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  When we first obtain Personal Data from you or take a new service or product from us, we will allow you to tell us if you do or do not want to receive information from us about other services or products (as applicable). You can typically tick a box on an application form or contract. You may change your mind at any time by emailing us at help.quickeloan.ca@gmail.com.
                </p>
                <p className="text-gray-700">
                  By submitting an application form through this site, you agree that we can contact you by post, telephone, and/or email (or such other channel we may adopt from time to time) to tell you about other products and services offered by ourselves or other carefully selected Canadian companies, that we believe would be of interest to you. We may also pass your information to third-party Canadian financial services companies to tell you about their services or products.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We may pass this information to other members or agents, as permitted by Canadian law, so that they may do the same and pass information held by them about you to us so that we may do the same. In providing our Service to you, we may disclose your information to the following third parties who may provide us with further information about you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Canadian Credit Reference Agencies (Equifax Canada, TransUnion Canada)</li>
                  <li>Corporate groups and/or affiliate companies</li>
                  <li>Any other Canadian creditor in the context of your current application form to assist you in your application</li>
                  <li>Any collector or tracing agent</li>
                  <li>Any company, business or intermediary associated with us to recover debt</li>
                  <li>Any prospective purchaser of our company</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Legal Compliance</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  We reserve the right to access and disclose to third parties any information to comply with applicable Canadian laws, including but not limited to the disclosure in accordance with PIPEDA (Personal Information Protection and Electronic Documents Act), and lawful authority requests, to safeguard the proper operation of our systems and to protect ourselves and our customers/prospective customers.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Lock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 mb-4">
                      All information submitted in this form is held safely and securely by us. We require all parties to whom we may pass your information to treat it with the same degree of confidentiality.
                    </p>
                    <p className="text-gray-700">
                      We implement robust security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee its absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Under Canadian privacy laws, including PIPEDA, you have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>The right to know what personal information we collect about you</li>
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate personal information</li>
                  <li>The right to withdraw consent for marketing communications</li>
                  <li>The right to file a complaint with the Privacy Commissioner of Canada</li>
                </ul>
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
                    If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at help.quickeloan.ca@gmail.com using the contact form available on our website.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-3 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-orange-700">Important Notice</h2>
                  <p className="text-orange-600">
                    Quick eLoans Canada is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect Canadian lenders with potential leads they may purchase. All transactions and agreements are between the Canadian lenders and the leads they choose to contact.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <h3 className="font-bold mb-2">Legal Notice</h3>
              <p className="text-sm text-gray-600">
                By using Quick eLoans Canada's services, you acknowledge that you have read and understood this Privacy Policy and agree to be bound by its terms and conditions under Canadian law. If you do not agree with any part of this policy, please do not use our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;