import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  BarChart3, 
  PieChart,
  Loader2,
  MonitorDot,
  FileBarChart,
  UserCircle,
  Menu,
  Calendar,
  TrendingUp,
  Users,
  Settings as SettingsIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ReportStats {
  totalApplications: number;
  loanPurposeDistribution: {
    purpose: string;
    count: number;
    amount: number;
  }[];
  employmentDistribution: {
    status: string;
    count: number;
  }[];
  monthlyStats: {
    month: string;
    applications: number;
    amount: number;
  }[];
}

const Reports = () => {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    fetchReportStats();
  }, [timeframe]);

  const fetchReportStats = async () => {
    try {
      let query = supabase.from('applications').select('*');

      if (timeframe !== 'all') {
        const days = parseInt(timeframe);
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }

      const { data: applications, error } = await query;

      if (error) throw error;

      const purposeData = applications?.reduce((acc: any, app) => {
        if (!acc[app.loan_purpose]) {
          acc[app.loan_purpose] = { count: 0, amount: 0 };
        }
        acc[app.loan_purpose].count += 1;
        acc[app.loan_purpose].amount += app.loan_amount;
        return acc;
      }, {});

      const loanPurposeDistribution = Object.entries(purposeData || {}).map(([purpose, data]: [string, any]) => ({
        purpose,
        count: data.count,
        amount: data.amount
      })).sort((a, b) => b.count - a.count);

      const employmentData = applications?.reduce((acc: any, app) => {
        if (!acc[app.employment_status]) {
          acc[app.employment_status] = { count: 0 };
        }
        acc[app.employment_status].count += 1;
        return acc;
      }, {});

      const employmentDistribution = Object.entries(employmentData || {}).map(([status, data]: [string, any]) => ({
        status,
        count: data.count
      })).sort((a, b) => b.count - a.count);

      const monthlyData = applications?.reduce((acc: any, app) => {
        const month = new Date(app.created_at).toLocaleString('default', { month: 'short', year: '2-digit' });
        if (!acc[month]) {
          acc[month] = { applications: 0, amount: 0 };
        }
        acc[month].applications += 1;
        acc[month].amount += app.loan_amount;
        return acc;
      }, {});

      const monthlyStats = Object.entries(monthlyData || {}).map(([month, data]: [string, any]) => ({
        month,
        applications: data.applications,
        amount: data.amount
      }));

      setStats({
        totalApplications: applications?.length || 0,
        loanPurposeDistribution,
        employmentDistribution,
        monthlyStats
      });
    } catch (error) {
      console.error('Error fetching report stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { path: '/admin', icon: MonitorDot, label: 'Dashboards' },
    { path: '/admin/reports', icon: FileBarChart, label: 'Reports' },
    { path: '/admin/leads', icon: UserCircle, label: 'Leads' },
    { path: '/admin/settings', icon: SettingsIcon, label: 'Settings' }
  ];

  const getGradientColor = (index: number, total: number) => {
    const colors = [
      'from-emerald-500 to-teal-500',
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-yellow-500 to-orange-500',
      'from-teal-500 to-cyan-500'
    ];
    return colors[index % colors.length];
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
        <nav className="flex-1 p-4">
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0 md:ml-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Timeframe Filter */}
          <div className="mb-6 flex justify-end">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {[
                { value: '7d', label: '7D' },
                { value: '30d', label: '30D' },
                { value: '90d', label: '90D' },
                { value: 'all', label: 'All' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeframe(option.value as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    timeframe === option.value
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8" />
                <Calendar className="h-5 w-5 opacity-75" />
              </div>
              <p className="text-emerald-100">Total Applications</p>
              <h3 className="text-3xl font-bold mt-1">
                {stats?.totalApplications.toLocaleString()}
              </h3>
              <div className="mt-4 flex items-center text-sm text-emerald-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Active period: {timeframe === 'all' ? 'All time' : `Last ${timeframe}`}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <PieChart className="h-8 w-8" />
                <Calendar className="h-5 w-5 opacity-75" />
              </div>
              <p className="text-purple-100">Most Common Purpose</p>
              <h3 className="text-3xl font-bold mt-1 capitalize">
                {stats?.loanPurposeDistribution[0]?.purpose.replace('_', ' ')}
              </h3>
              <div className="mt-4 flex items-center text-sm text-purple-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{((stats?.loanPurposeDistribution[0]?.count || 0) / (stats?.totalApplications || 1) * 100).toFixed(1)}% of total</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Loan Purpose Distribution */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Loan Purpose Distribution</h3>
              <div className="space-y-4">
                {stats?.loanPurposeDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize">{item.purpose.replace('_', ' ')}</span>
                      <span className="text-gray-900 font-medium">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`bg-gradient-to-r ${getGradientColor(index, stats.loanPurposeDistribution.length)} rounded-full h-2.5 transition-all duration-500`}
                        style={{
                          width: `${(item.count / stats.totalApplications) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment Status Distribution */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Employment Status</h3>
              <div className="space-y-4">
                {stats?.employmentDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize">{item.status.replace('_', ' ')}</span>
                      <span className="text-gray-900 font-medium">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`bg-gradient-to-r ${getGradientColor(index + 3, stats.employmentDistribution.length)} rounded-full h-2.5 transition-all duration-500`}
                        style={{
                          width: `${(item.count / stats.totalApplications) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Applications Trend */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>
              <div className="h-80">
                <div className="relative h-full">
                  <div className="absolute inset-0 flex items-end justify-between">
                    {stats?.monthlyStats.map((data, index) => (
                      <div key={index} className="flex flex-col items-center group">
                        <div className="relative">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                            <strong>{data.applications}</strong> applications
                          </div>
                          <div
                            className="w-8 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-lg transition-all duration-300 group-hover:from-emerald-600 group-hover:to-teal-500"
                            style={{
                              height: `${(data.applications / Math.max(...stats.monthlyStats.map(d => d.applications))) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500 mt-2">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;