import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const ApplicationForm = lazy(() => import('./pages/ApplicationForm'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const FraudPrevention = lazy(() => import('./pages/FraudPrevention'));
const PersonalLoans = lazy(() => import('./pages/PersonalLoans'));
const BusinessLoans = lazy(() => import('./pages/BusinessLoans'));
const InstallmentLoans = lazy(() => import('./pages/InstallmentLoans'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin components
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Leads = lazy(() => import('./pages/Leads'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Toaster position="top-right" />
        
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="/admin/leads" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Leads />
            </Suspense>
          } />
          <Route path="/admin/reports" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Reports />
            </Suspense>
          } />
          <Route path="/admin/settings" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          } />

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Home />
                  </Suspense>
                } />
                <Route path="/apply" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ApplicationForm />
                  </Suspense>
                } />
                <Route path="/about-us" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AboutUs />
                  </Suspense>
                } />
                <Route path="/how-it-works" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HowItWorks />
                  </Suspense>
                } />
                <Route path="/why-us" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <WhyUs />
                  </Suspense>
                } />
                <Route path="/faq" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <FAQ />
                  </Suspense>
                } />
                <Route path="/contact-us" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactUs />
                  </Suspense>
                } />
                <Route path="/privacy-policy" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PrivacyPolicy />
                  </Suspense>
                } />
                <Route path="/terms-and-conditions" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <TermsAndConditions />
                  </Suspense>
                } />
                <Route path="/fraud-prevention" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <FraudPrevention />
                  </Suspense>
                } />
                <Route path="/personal-loans" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PersonalLoans />
                  </Suspense>
                } />
                <Route path="/business-loans" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <BusinessLoans />
                  </Suspense>
                } />
                <Route path="/installment-loans" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <InstallmentLoans />
                  </Suspense>
                } />
                <Route path="*" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;