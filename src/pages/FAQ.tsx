import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Quick eLoans?",
      answer: "Quick eLoans is is a lead generation service that collects and sells personal loan lead information to third-party lenders who buy from us if they require leads to expand their business. We do not provide loans directly but facilitate connections through our website."
    },
    {
      question: "How does the loan matching process work?",
      answer: "We generate leads through our website and offer them to third-party lenders who contact us via email to purchase leads based on their business needs. Matching is tailored to lender criteria."
    },
    {
      question: "Is there a fee to use Quick eLoans?",
      answer: "Fees for purchasing leads are determined by our agreements with lenders. Please contact us directly via email for pricing and availability details."
    },
    {
      question: "How quickly can I get matched with lenders?",
      answer: "Lead information is typically provided via email shortly after purchase confirmation, often within few minutes, depending on volume."
    },
    {
      question: "What information do I need to provide?",
      answer: "We share basic personal information, employment details, income information, and desired loan amounts, other information collected securely from our website.."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we use advanced encryption and security measures to protect all lead information during transmission to lenders."
    },
    {
      question: "Do you guarantee loan approval?",
      answer: "No, as a lead generation service, we cannot guarantee that leads will result in loan approvals or conversions. Success depends on the lenders' follow-up process."
    },
    {
      question: "What happens after I'm matched with a lender?",
      answer: "Lenders receive the lead details via email and can contact the potential borrower directly to discuss loan options and proceed with their own lending process."
    }
  ];

  return (
    <div className="flex-grow bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-emerald-50">Find answers about our loan matching service</p>
          </div>

          {/* Important Notice */}
          <div className="p-6 bg-orange-50 border-b border-orange-100">
            <div className="flex items-start max-w-3xl mx-auto">
              <AlertTriangle className="h-6 w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <p className="text-orange-700">
                <span className="font-semibold">Important:</span> Quickeloan is exclusively a lead generation service. We do not provide loans, make lending decisions, or guarantee lead conversions. Our role is to connect lenders with potential leads they may purchase. All transactions and agreements are between the lenders and the leads they choose to contact.
              </p>
            </div>
          </div>
          
          <div className="p-8">
            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-emerald-600" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-gray-50 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">Contact our support team for assistance</p>
              <Link
                to="/contact-us"
                className="inline-block bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;