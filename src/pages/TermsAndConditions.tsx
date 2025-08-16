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
                  CRITICAL NOTICE: Quick eLoans Canada is STRICTLY a Canadian loan matching service. We DO NOT provide loans, make lending decisions, or guarantee approvals. We only connect Canadian residents with licensed Canadian lenders. By using our service, you accept these terms in full under Canadian law.
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  By using www.quickeloans.ca, you are fully accepting the terms, conditions, and disclaimers contained in this notice. Your access to and use of www.quickeloans.ca is subject to agreement with these Terms and Conditions under Canadian law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Amendments</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  We reserve the right to change these terms and conditions at any time without prior notice, and your continued use of www.quickeloans.ca following any changes shall be deemed to be your agreement of any changes in accordance with Canadian law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Consent, Communication, Services & Financial Products</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you apply for a loan or other credit product or service through this website, you consent to Quick eLoans Canada and/or our third-party Canadian business affiliates collecting, using and/or disclosing the personal information that you provide to us to confirm your financial situation and your initial and ongoing eligibility for such credit products and services in compliance with PIPEDA and other Canadian privacy laws.
                </p>
                <p className="text-gray-700 mb-4">
                  In order to provide you with such products and services, you may be contacted by Quick eLoans Canada and/or our third-party Canadian business affiliates. In addition, you also agree to allowing Quick eLoans Canada and/or our third-party Canadian business affiliates to perform a credit check on you, based on the information you have provided, to confirm your financial situation and your initial and ongoing eligibility for such products and services.
                </p>
                <p className="text-gray-700">
                  Unless you advise us otherwise, Quick eLoans Canada and our third-party Canadian business affiliates may offer you related products, services and pre-qualifications for other related or non-related credit or financial products and services. You acknowledge that: (i) all communications to you from Quick eLoans Canada and its third-party Canadian business affiliates may be done via SMS, telephone, email and postal mail; and (ii) Quick eLoans Canada and our third-party Canadian business affiliates may receive a referral fee for providing you with or referring you to a loan or other credit product or service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. The Service We Provide</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  www.quickeloans.ca is a Canadian lead generation service. We do not directly offer finance; therefore, we will not provide any money directly to you. However, upon completing the website's loan application form, we will introduce you to licensed Canadian lenders or finance providers who may be able to offer you credit.
                </p>
                <p className="text-gray-700">
                  They will only forward your application to a Canadian lender that has looked at your application and accepted it as one where they believe there is a good chance that they can provide a loan in compliance with Canadian financial regulations.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Examples of Cost</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Any examples of amounts available to borrow (CAD $1,000 to CAD $50,000), the terms (repayment periods), or rates stated on the website are purely given as an example relating to the product. These examples are noted to provide you with an understanding of the products available and the costs involved in the Canadian market.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Our Service is Free - Beware of Scams</h2>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <p className="text-gray-700 mb-4">
                  <strong>www.quickeloans.ca does not charge for our service.</strong> You must beware of scammers who email or phone you pretending to be Quick eLoans Canada, asking you to pay money to obtain a loan.
                </p>
                <p className="text-red-700 font-semibold mb-4">
                  You must NEVER pay ANY money to ANYONE who asks you to do so as this is a scam. We, or any Canadian lender on our panel will NEVER ask you to pay money to obtain a loan.
                </p>
                <p className="text-gray-700">
                  We are not a lender; we have no control over any decision-making process concerning your application. When you apply for a loan, the Canadian lender will perform some checks on you to establish suitability for credit before any decision or offer is made; these checks may include carrying out a credit check through Canadian credit bureaus such as Equifax Canada or TransUnion Canada.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Third Party Websites</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  The website may include links to carefully selected third-party Canadian websites controlled and maintained by others. We do not endorse these websites, and we are not responsible for the content or availability of any such websites.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property Rights</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  In using the website, you agree that you will access the content solely for your personal, non-business-related use. None of the content may be downloaded, copied, reproduced, transmitted, stored, sold, or distributed without the prior written consent of the site owner. All intellectual property rights, copyright, or trademarks used on the website and its content, including without limitation the design, text, graphics, and all software and source codes connected with the website, are owned by www.quickeloans.ca.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Liability</h2>
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-red-700 mb-4">
                  We cannot guarantee that the Canadian lender who accepts your loan application will agree to fund your finance application. Therefore, we will not be liable for any loss that you may incur by using this site unless we have not acted in accordance with these terms and conditions, been negligent, or adhered to standards required by Canadian law.
                </p>
                <p className="text-red-700 font-semibold">
                  Quick eLoans Canada SHALL NOT be held liable for any financial losses, damages, fraudulent activities by third parties, Canadian lender practices or decisions, loan terms or agreements, or data breaches by third-party Canadian lenders.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Indemnity</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  You agree to indemnify and hold www.quickeloans.ca and our employees and agents innocent from and against all liabilities, legal costs, losses, and other expenses concerning any claims or actions brought against us arising out of any breach by you of these terms and conditions or other liabilities arising out of your use of this website under Canadian law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Severance</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Should any of these terms and conditions be determined to be invalid, illegal, or unenforceable for any reason by any court of competent jurisdiction in Canada, such term or condition shall be severed, and the remaining terms and conditions shall remain in full force and effect and continue to be binding and enforceable.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  These terms and conditions shall be governed by and construed in accordance with the law of Canada. You hereby submit to the exclusive jurisdiction of the Canadian courts.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Complaints About This Website</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have searched for finance via our website and have opted to proceed with a Canadian lender's offer, you need to contact them directly with any questions regarding your loan status, fees, or cancellation of your finance agreement.
                </p>
                <p className="text-gray-700">
                  If your query concerns anything else about our Canadian lead generation service, please contact us at help.quickeloan.ca@gmail.com using the form on our Contact Us page.
                </p>
              </div>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Legal Disclaimer</h3>
              <p className="text-gray-700 mb-4">
                These terms constitute a legally binding agreement under Canadian law. By using Quick eLoans Canada's services, you waive all rights to legal action against Quick eLoans Canada for any damages, losses, or disputes arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Canadian lender interactions or decisions</li>
                <li>Financial losses or damages</li>
                <li>Fraudulent activities by third parties</li>
                <li>Data breaches or misuse by Canadian lenders</li>
                <li>Loan terms, conditions, or agreements with Canadian lenders</li>
              </ul>
              <p className="mt-4 text-gray-700 font-semibold">
                Quick eLoans Canada is exclusively a lead generation service connecting Canadian residents with licensed Canadian lenders. We do not provide loans, make lending decisions, or guarantee approvals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;