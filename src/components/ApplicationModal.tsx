import React from 'react';
import { CheckCircle, AlertCircle, X, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'duplicate';
}

const ApplicationModal = ({ isOpen, onClose, type }: ModalProps) => {
  if (!isOpen) return null;

  const applicationId = new Date().getTime().toString().slice(-6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-16 sm:w-16">
                {type === 'success' ? (
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                ) : (
                  <div className="bg-blue-100 rounded-full p-3">
                    <AlertCircle className="h-10 w-10 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">
                  {type === 'success' ? 'Application Submitted Successfully!' : 'Application Already Submitted'}
                </h3>
                {type === 'success' ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center space-x-2 text-green-700 mb-2">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="font-semibold">Application Secured</span>
                      </div>
                      <p className="text-green-700">
                        Your application has been securely received and is now being processed.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Next Steps</h4>
                          <p className="text-sm text-gray-600">We'll review your application and process it promptly.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>Watch for important updates via email</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>Keep your phone available for updates</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-gray-900 mb-1">Application Reference</p>
                      <p className="text-lg font-bold text-emerald-600">{applicationId}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-blue-700">
                        We've found that you already have an application in our system using this email address or phone number. To maintain the integrity of your application process, multiple submissions with the same contact information are not permitted.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600">
                        If you need to update your information or have any questions about your existing application, please contact our support team.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className={`w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2.5 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-all transform hover:-translate-y-0.5 ${
                type === 'success'
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {type === 'success' ? 'Close' : 'Got it'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;