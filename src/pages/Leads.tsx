import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Download,
  Search,
  Calendar,
  Loader2,
  MonitorDot,
  FileBarChart,
  UserCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Settings as SettingsIcon,
  LogOut,
  MapPin,
  Clock
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import authHandler from '../utils/authHandler';
import Logo from '../components/Logo';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  state: string;
  zip_code: string;
  loan_amount: number;
  monthly_income: number;
  employment_status: string;
  loan_purpose: string;
  financial_institution: string;
  account_number: string;
  ssn_last_four: string;
  best_time_to_call: string;
  status: string;
  created_at: string;
}

const Leads = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 50;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await authHandler.checkSession();
        if (!isAuthenticated) {
          navigate('/admin/login', { replace: true });
          return;
        }
        await fetchApplications();
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/admin/login', { replace: true });
      }
    };

    checkAuth();
  }, [currentPage, searchTerm, startDate, endDate, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem('quickeloans-auth-token');
      toast.success('Signed out successfully');
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const buildQuery = () => {
    let query = supabase
      .from('applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (searchTerm) {
      query = query.or(
        `first_name.ilike.%${searchTerm}%,` +
        `last_name.ilike.%${searchTerm}%,` +
        `email.ilike.%${searchTerm}%,` +
        `phone_number.ilike.%${searchTerm}%,` +
        `city.ilike.%${searchTerm}%`
      );
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query = query.lt('created_at', nextDay.toISOString());
    }

    return query;
  };

  const fetchApplications = async () => {
    try {
      setError(null);
      const client = await authHandler.getAuthenticatedClient();
      let query = buildQuery();

      // Calculate the range for pagination
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      // Add range for pagination
      query = query.range(from, to);

      const { data, error: fetchError, count } = await query;

      if (fetchError) {
        throw new Error(fetchError.message || 'Failed to fetch applications');
      }

      setApplications(data || []);
      setTotalRecords(count || 0);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch applications';
      console.error('Error fetching applications:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Fetch all filtered data for export without pagination
      const query = buildQuery();
      const { data, error } = await query;

      if (error) throw error;

      const exportData = (data || []).map(app => ({
        'First Name': app.first_name,
        'Last Name': app.last_name,
        'City': app.city,
        'State': app.state,
        'ZIP Code': app.zip_code,
        'Email': app.email,
        'Phone Number': app.phone_number,
        'Best Time to Call': app.best_time_to_call,
        'Loan Amount': app.loan_amount,
        'Monthly Income': app.monthly_income,
        'Employment Status': app.employment_status.replace('_', ' '),
        'Loan Purpose': app.loan_purpose.replace('_', ' '),
        'Financial Institution': app.financial_institution,
        'Account Number': app.account_number,
        'SSN Last Four': app.ssn_last_four,
        'Status': app.status,
        'Date': new Date(app.created_at).toLocaleDateString()
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Applications');

      // Generate filename with date range if filters are applied
      let filename = 'loan_applications';
      if (startDate || endDate) {
        filename += `_${startDate || 'start'}_to_${endDate || 'end'}`;
      }
      filename += '.xlsx';

      XLSX.writeFile(wb, filename);
      toast.success('Export completed successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const navItems = [
    { path: '/admin', icon: MonitorDot, label: 'Dashboards' },
    { path: '/admin/reports', icon: FileBarChart, label: 'Reports' },
    { path: '/admin/leads', icon: UserCircle, label: 'Leads' },
    { path: '/admin/settings', icon: SettingsIcon, label: 'Settings' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="flex items-center justify-center w-full">
          <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchApplications();
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0 md:w-20'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Logo showText={false} className="w-8 h-8" />
            <span className={`ml-2 font-bold text-xl text-emerald-600 ${!isSidebarOpen && 'md:hidden'}`}>
              Admin
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col justify-between h-[calc(100%-4rem)]">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Sign Out Button */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow">
            {/* Filters */}
            <div className="p-3 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, email, phone, or city..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span className="text-xs text-gray-500">to</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="inline-flex items-center px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ZIP</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account #</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SSN</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Time</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <div className="text-xs text-gray-900">{app.first_name} {app.last_name}</div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center text-xs text-gray-900">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {app.city}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-900">{app.state}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">{app.zip_code}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">${app.loan_amount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">${app.monthly_income.toLocaleString()}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">{app.employment_status.replace('_', ' ')}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">{app.loan_purpose.replace('_', ' ')}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">{app.financial_institution}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">{app.account_number}</td>
                      <td className="px-3 py-2 text-xs text-gray-900">****-{app.ssn_last_four}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center text-xs text-gray-900">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {app.phone_number}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center text-xs text-gray-900">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {app.email}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center text-xs text-gray-900">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          {app.best_time_to_call}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-3 py-2 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {applications.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                  {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === pageNum
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leads;