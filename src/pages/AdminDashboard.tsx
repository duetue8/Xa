import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, 
  ArrowUpRight, 
  Loader2,
  MonitorDot,
  FileBarChart,
  UserCircle,
  Menu,
  TrendingUp,
  Calendar,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import authHandler from '../utils/authHandler';
import Logo from '../components/Logo';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface DashboardStats {
  totalApplications: number;
  dailyApplications: {
    date: string;
    count: number;
  }[];
  weeklyGrowth: number;
  monthlyGrowth: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const checkAuthAndFetchStats = async () => {
      try {
        const isAuthenticated = await authHandler.checkSession();
        if (!isAuthenticated) {
          navigate('/admin/login', { replace: true });
          return;
        }
        await fetchDashboardStats();
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/admin/login', { replace: true });
      }
    };

    checkAuthAndFetchStats();
  }, [navigate]);

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

  const fetchDashboardStats = async () => {
    try {
      setError(null);
      const client = await authHandler.getAuthenticatedClient();
      
      const { data: applications, error: applicationsError } = await client
        .from('applications')
        .select('created_at')
        .order('created_at', { ascending: false });

      if (applicationsError) {
        throw new Error(applicationsError.message || 'Failed to fetch applications data');
      }

      // If no applications exist, return default stats
      if (!applications || applications.length === 0) {
        setStats({
          totalApplications: 0,
          dailyApplications: Array(14).fill({ date: new Date().toISOString().split('T')[0], count: 0 }),
          weeklyGrowth: 0,
          monthlyGrowth: 0
        });
        return;
      }

      // Process daily applications for the last 14 days
      const now = new Date();
      const dailyData = Array.from({ length: 14 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (13 - i));
        const dateStr = date.toISOString().split('T')[0];
        const count = applications.filter(app => 
          app.created_at.startsWith(dateStr)
        ).length;
        return { date: dateStr, count };
      });

      // Calculate weekly and monthly growth
      const thisWeek = applications.filter(app => {
        const date = new Date(app.created_at);
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays < 7;
      }).length;

      const lastWeek = applications.filter(app => {
        const date = new Date(app.created_at);
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 7 && diffDays < 14;
      }).length;

      const weeklyGrowth = lastWeek === 0 ? 0 : ((thisWeek - lastWeek) / lastWeek) * 100;

      const thisMonth = applications.filter(app => {
        const date = new Date(app.created_at);
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays < 30;
      }).length;

      const lastMonth = applications.filter(app => {
        const date = new Date(app.created_at);
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays >= 30 && diffDays < 60;
      }).length;

      const monthlyGrowth = lastMonth === 0 ? 0 : ((thisMonth - lastMonth) / lastMonth) * 100;

      setStats({
        totalApplications: applications.length,
        dailyApplications: dailyData,
        weeklyGrowth,
        monthlyGrowth
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard data';
      console.error('Error fetching dashboard stats:', errorMessage);
      setError(errorMessage);
      setStats(null);
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
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchDashboardStats();
            }}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const maxDailyCount = Math.max(...(stats?.dailyApplications.map(d => d.count) || [1]));

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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 font-medium">Total Applications</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {stats?.totalApplications.toLocaleString()}
                  </h3>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-emerald-100">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>{stats?.monthlyGrowth.toFixed(1)}% this month</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-medium">Weekly Growth</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {stats?.weeklyGrowth.toFixed(1)}%
                  </h3>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-100">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last 7 days</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-medium">Monthly Growth</p>
                  <h3 className="text-3xl font-bold mt-2">
                    {stats?.monthlyGrowth.toFixed(1)}%
                  </h3>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-purple-100">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last 30 days</span>
              </div>
            </div>
          </div>

          {/* Daily Applications Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Daily Applications</h2>
              <div className="text-sm text-gray-500">Last 14 days</div>
            </div>
            <div className="h-80">
              <div className="relative h-full">
                <div className="absolute inset-0 flex items-end justify-between px-2">
                  {stats?.dailyApplications.map((data, index) => (
                    <div key={index} className="flex flex-col items-center group w-full">
                      <div className="relative w-full px-1">
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          <strong>{data.count}</strong> applications on {new Date(data.date).toLocaleDateString()}
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-lg transition-all duration-300 group-hover:from-emerald-600 group-hover:to-emerald-500"
                          style={{
                            height: `${(data.count / maxDailyCount) * 100}%`,
                            minHeight: data.count > 0 ? '4px' : '0'
                          }}
                        >
                          {data.count > 0 && (
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                              {data.count}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                        {new Date(data.date).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;