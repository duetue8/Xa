import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ClipboardList, Shield, DollarSign, Users, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { applicationSchema, formatPhoneNumber, isValidEmail, isValidPhone, isValidZip } from '../utils/validation';
import type { ApplicationFormData } from '../utils/validation';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import ApplicationModal from '../components/ApplicationModal';

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtagSendEvent: (url?: string) => boolean;
  }
}

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

const ApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    lastName: '',
    loanAmount: '',
    monthlyIncome: '',
    employmentStatus: '',
    loanPurpose: '',
    phoneNumber: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    bestTimeToCall: '',
    financialInstitution: '',
    accountNumber: '',
    ssnLastFour: ''
  });

  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'duplicate'>('success');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAcknowledged || !isAdult) {
      toast.error('Please acknowledge all terms and confirm your age');
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!isValidPhone(formData.phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    if (!isValidZip(formData.zipCode)) {
      toast.error('Please enter a valid Canadian postal code (K1A 0A6)');
      return;
    }

    // Validate required fields before schema validation
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      toast.error('First name must be at least 2 characters');
      return;
    }

    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      toast.error('Last name must be at least 2 characters');
      return;
    }

    if (!formData.city.trim() || formData.city.trim().length < 2) {
      toast.error('City is required');
      return;
    }

    if (!formData.state.trim() || formData.state.trim().length !== 2) {
      toast.error('State must be a 2-letter code');
      return;
    }

    if (!formData.financialInstitution.trim()) {
      toast.error('Financial institution is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const validatedData = applicationSchema.parse({
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        city: formData.city.trim(),
        state: formData.state.trim().toUpperCase(),
        financialInstitution: formData.financialInstitution.trim(),
        accountNumber: formData.accountNumber.trim().replace(/\D/g, ''),
        ssnLastFour: formData.ssnLastFour.trim().replace(/\D/g, '')
      });

      // Check for existing application
      const { data: existingEmailApplications, error: emailSearchError } = await supabase
        .from('applications')
        .select('id, email')
        .eq('email', validatedData.email)
        .limit(1);

      if (emailSearchError) throw emailSearchError;

      const { data: existingPhoneApplications, error: phoneSearchError } = await supabase
        .from('applications')
        .select('id, phone_number')
        .eq('phone_number', formatPhoneNumber(validatedData.phoneNumber))
        .limit(1);

      if (phoneSearchError) throw phoneSearchError;

      if ((existingEmailApplications && existingEmailApplications.length > 0) || 
          (existingPhoneApplications && existingPhoneApplications.length > 0)) {
        setModalType('duplicate');
        setShowModal(true);
        setIsSubmitting(false);
        return;
      }

      // Save to Supabase
      const { error: saveError } = await supabase
        .from('applications')
        .insert([{
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email.toLowerCase(),
          phone_number: formatPhoneNumber(validatedData.phoneNumber),
          city: validatedData.city,
          state: validatedData.state,
          zip_code: validatedData.zipCode,
          best_time_to_call: validatedData.bestTimeToCall,
          loan_amount: parseFloat(validatedData.loanAmount),
          monthly_income: parseFloat(validatedData.monthlyIncome),
          employment_status: validatedData.employmentStatus,
          loan_purpose: validatedData.loanPurpose,
          financial_institution: validatedData.financialInstitution,
          account_number: validatedData.accountNumber,
          ssn_last_four: validatedData.ssnLastFour,
          status: 'pending',
          ip_address: window.location.hostname,
          user_agent: navigator.userAgent
        }]);

      if (saveError) {
        console.error('Save error:', saveError);
        throw new Error('Failed to submit application');
      }

      // Send email notification
      await emailjs.send(
        'service_n4mzu87',
        'template_9pb8v7y',
        {
          from_name: `${validatedData.firstName} ${validatedData.lastName}`,
          city: validatedData.city,
          state: validatedData.state,
          zip_code: validatedData.zipCode,
          from_email: validatedData.email,
          phone_number: formatPhoneNumber(validatedData.phoneNumber),
          loan_amount: parseFloat(validatedData.loanAmount).toLocaleString(),
          monthly_income: parseFloat(validatedData.monthlyIncome).toLocaleString(),
          employment_status: validatedData.employmentStatus.replace('_', ' '),
          loan_purpose: validatedData.loanPurpose.replace('_', ' '),
          financial_institution: validatedData.financialInstitution,
          best_time_to_call: validatedData.bestTimeToCall,
          Account_number: validatedData.accountNumber,
          SSN: validatedData.ssnLastFour,
          reply_to: validatedData.email
        },
        'oxYqkrZBZmvxSuwjq'
      );

      // Track conversion after successful form submission
      if (window.gtagSendEvent) {
        window.gtagSendEvent();
      }

      // Show success modal
      setModalType('success');
      setShowModal(true);

    } catch (error) {
      console.error('Error submitting application:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('validation')) {
          toast.error('Please check all required fields are filled correctly');
        } else {
          toast.error('Failed to submit application. Please try again.');
        }
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 10 digits and prevent starting with 0
      let processedValue = digitsOnly;
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10);
      }
      if (processedValue.startsWith('0') && processedValue.length > 0) {
        processedValue = processedValue.slice(1);
      }
      
      // Format as (XXX) XXX-XXXX
      let formatted = processedValue;
      if (processedValue.length >= 6) {
        formatted = `(${processedValue.slice(0, 3)}) ${processedValue.slice(3, 6)}-${processedValue.slice(6)}`;
      } else if (processedValue.length >= 3) {
        formatted = `(${processedValue.slice(0, 3)}) ${processedValue.slice(3)}`;
      } else if (processedValue.length > 0) {
        formatted = `(${processedValue}`;
      }
      
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'state') {
      // Convert state to uppercase
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    } else if (name === 'zipCode') {
      // Format postal code as user types
      const cleaned = value.replace(/\s/g, '').toUpperCase();
      let formatted = cleaned;
      if (cleaned.length > 3) {
        formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'accountNumber' || name === 'ssnLastFour') {
      // Remove all non-digit characters for account number and SSN
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form if it was a successful submission
    if (modalType === 'success') {
      setFormData({
        firstName: '',
        lastName: '',
        loanAmount: '',
        monthlyIncome: '',
        employmentStatus: '',
        loanPurpose: '',
        phoneNumber: '',
        email: '',
        city: '',
        state: '',
        zipCode: '',
        bestTimeToCall: '',
        financialInstitution: '',
        accountNumber: '',
        ssnLastFour: ''
      });
      setIsAcknowledged(false);
      setIsAdult(false);
    }
  };

  return (
    <div className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <ApplicationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        type={modalType}
      />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-48 bg-gradient-to-r from-emerald-600 to-teal-500">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Quick Loan Application</h2>
              <p className="text-lg text-center text-emerald-50">Get connected with lenders in minutes</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-xs mt-1">Personal Info</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-xs mt-1">Loan Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-xs mt-1">Contact Info</span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      maxLength={50}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none"
                      required
                    >
                      <option value="">Select Province</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                      <option value="YT">Yukon</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="K1A 0A6"
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Loan Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Loan Amount (CAD $)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      min="100"
                      max="50000"
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      step="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income (CAD $)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      min="0"
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      step="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ClipboardList className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none"
                      required
                    >
                      <option value="">Select status</option>
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part Time</option>
                      <option value="self_employed">Self Employed</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Purpose
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ClipboardList className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none"
                      required
                    >
                      <option value="">Select a purpose</option>
                      <option value="debt_consolidation">Debt Consolidation</option>
                      <option value="home_improvement">Home Improvement</option>
                      <option value="business">Business</option>
                      <option value="education">Education</option>
                      <option value="emergency">Emergency Expenses</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canadian Financial Institution
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="financialInstitution"
                      value={formData.financialInstitution}
                      onChange={handleChange}
                      placeholder="Enter your Canadian bank or credit union name"
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Account Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter your bank account number"
                        className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        required
                        maxLength={50}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last 4 Digits of SIN
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="ssnLastFour"
                        value={formData.ssnLastFour}
                        onChange={handleChange}
                        placeholder="Enter last 4 digits of SIN"
                        maxLength={4}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        required
                        maxLength={4}
                        minLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      placeholder="(123) 456-7890"
                      maxLength={14}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                      maxLength={100}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Best Time to Call
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="bestTimeToCall"
                      value={formData.bestTimeToCall}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none"
                      required
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (9AM-12PM)</option>
                      <option value="afternoon">Afternoon (12PM-5PM)</option>
                      <option value="evening">Evening (5PM-8PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="adult"
                    checked={isAdult}
                    onChange={(e) => setIsAdult(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
                  />
                </div>
                <label htmlFor="adult" className="ml-3 text-sm text-gray-600">
                  I confirm that I am at least 18 years old, a Canadian resident, and legally able to enter into contracts in Canada.
                </label>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="acknowledge"
                    checked={isAcknowledged}
                    onChange={(e) =>setIsAcknowledged(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
                  />
                </div>
                <label htmlFor="acknowledge" className="ml-3 text-sm text-gray-600">
                  I acknowledge and agree to the{' '}
                  <Link to="/terms-and-conditions" className="text-emerald-600 hover:text-emerald-700 underline">
                    Terms and Conditions
                  </Link>
                  ,{' '}
                  <Link to="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 underline">
                    Privacy Policy
                  </Link>
                  , and consent to share my information with lenders.
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !isAcknowledged || !isAdult}
                  className={`w-full sm:w-auto px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5 ${
                    (isSubmitting || !isAcknowledged || !isAdult) ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </form>
        {typeof window !== 'undefined' && !window.location.hash.includes('/admin') && <Footer />}
      </div>
    </div>
  );
};

export default ApplicationForm;