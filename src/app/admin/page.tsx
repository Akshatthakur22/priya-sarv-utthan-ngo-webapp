/**
 * Admin Dashboard - Main Page
 * Shows overview of all data
 */

"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, RefreshCw, BarChart3, Users, Briefcase, HelpCircle, TrendingUp, Calendar, Download, Search, Filter, DollarSign, Mail, Phone, MessageSquare, ChevronDown, ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [supportCases, setSupportCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const downloadResume = async (appId: string, filename?: string) => {
    const key = localStorage.getItem("admin_api_key") || apiKey;
    if (!key) return;

    const res = await fetch(`/api/admin/applications/${appId}/resume`, {
      headers: { "x-admin-key": key },
    });

    if (!res.ok) {
      alert("Could not download resume");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "resume";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleAuth = () => {
    if (apiKey.trim()) {
      setAuthenticated(true);
      localStorage.setItem("admin_api_key", apiKey);
      fetchAllData(apiKey);
    }
  };

  const fetchAllData = async (key: string) => {
    setLoading(true);
    try {
      console.log("[ADMIN] Fetching data with key:", key);
      
      // Fetch all data in parallel
      const [donRes, conRes, appRes, supRes] = await Promise.all([
        fetch("/api/admin/donations", {
          headers: { "x-admin-key": key },
        }),
        fetch("/api/admin/contacts", {
          headers: { "x-admin-key": key },
        }),
        fetch("/api/admin/applications", {
          headers: { "x-admin-key": key },
        }),
        fetch("/api/admin/support-cases", {
          headers: { "x-admin-key": key },
        }),
      ]);

      console.log("[ADMIN] API responses:", {
        donations: donRes.status,
        contacts: conRes.status,
        applications: appRes.status,
        support: supRes.status
      });

      // Handle donations
      if (donRes.ok) {
        const donData = await donRes.json();
        console.log("[ADMIN] Donations data:", donData);
        setDonations(donData.data || []);
      } else {
        console.error("[ADMIN] Donations fetch failed:", donRes.status);
        setDonations([]);
      }

      // Handle contacts
      if (conRes.ok) {
        const conData = await conRes.json();
        console.log("[ADMIN] Contacts data:", conData);
        setContacts(conData.data || []);
      } else {
        console.error("[ADMIN] Contacts fetch failed:", conRes.status);
        setContacts([]);
      }

      // Handle applications
      if (appRes.ok) {
        const appData = await appRes.json();
        console.log("[ADMIN] Applications data:", appData);
        setApplications(appData.data || []);
      } else {
        console.error("[ADMIN] Applications fetch failed:", appRes.status);
        setApplications([]);
      }

      // Handle support cases
      if (supRes.ok) {
        const supData = await supRes.json();
        console.log("[ADMIN] Support cases data:", supData);
        setSupportCases(supData.data || []);
      } else {
        console.error("[ADMIN] Support cases fetch failed:", supRes.status);
        setSupportCases([]);
      }
    } catch (error) {
      console.error("[ADMIN] Failed to fetch data:", error);
      // Reset all data on error
      setDonations([]);
      setContacts([]);
      setApplications([]);
      setSupportCases([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (apiKey) fetchAllData(apiKey);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setApiKey("");
    localStorage.removeItem("admin_api_key");
  };

  // Load stored key on mount
  useEffect(() => {
    const stored = localStorage.getItem("admin_api_key");
    console.log("[ADMIN] Stored API key found:", stored ? "Yes" : "No");
    
    if (stored) {
      setApiKey(stored);
      setAuthenticated(true);
      fetchAllData(stored);
    } else {
      console.log("[ADMIN] No stored API key, user needs to login");
    }
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:scale-[1.02]">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 text-sm">
                Priya Sarv Utthan Seva Sansthan
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Enter your admin API key to access the dashboard
              </p>
            </div>
            
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter admin API key"
                  className="relative w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                  onKeyPress={(e) => e.key === "Enter" && handleAuth()}
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <button
                onClick={handleAuth}
                disabled={!apiKey.trim()}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <BarChart3 size={20} />
                  Access Dashboard
                </span>
              </button>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-blue-700 font-medium mb-1">Setup Required</p>
                  <p className="text-xs text-blue-600">
                    Set <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-800">ADMIN_API_KEY</code> in your <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-800">.env.local</code> file to enable admin access.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-6 text-white/80 text-xs">
            <p>Secure Admin Portal • Encrypted Connection</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Priya Sarv Utthan Seva Sansthan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                Refresh Data
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-white/80 hover:bg-white border border-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: BarChart3, color: "emerald" },
              { id: "donations", label: `Donations (${donations.length})`, icon: DollarSign, color: "green" },
              { id: "contacts", label: `Contacts (${contacts.length})`, icon: Users, color: "blue" },
              { id: "applications", label: `Job Apps (${applications.length})`, icon: Briefcase, color: "orange" },
              { id: "support", label: `Support Cases (${supportCases.length})`, icon: HelpCircle, color: "red" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50/50`
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-current" : "text-slate-400"} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50 rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-emerald-600">
                    <ArrowUpRight size={16} />
                    <span className="text-xs font-medium ml-1">12%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-emerald-700 mb-1">Total Donations</p>
                <p className="text-3xl font-bold text-emerald-900">{donations.length}</p>
                <p className="text-xs text-emerald-600 mt-2">Last 30 days</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-blue-600">
                    <ArrowUpRight size={16} />
                    <span className="text-xs font-medium ml-1">8%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-blue-700 mb-1">Total Contacts</p>
                <p className="text-3xl font-bold text-blue-900">{contacts.length}</p>
                <p className="text-xs text-blue-600 mt-2">All time</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200/50 rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-orange-600">
                    <ArrowDownRight size={16} />
                    <span className="text-xs font-medium ml-1">3%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-orange-700 mb-1">Job Applications</p>
                <p className="text-3xl font-bold text-orange-900">{applications.length}</p>
                <p className="text-xs text-orange-600 mt-2">This month</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200/50 rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-red-600">
                    <ArrowUpRight size={16} />
                    <span className="text-xs font-medium ml-1">15%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-red-700 mb-1">Support Cases</p>
                <p className="text-3xl font-bold text-red-900">{supportCases.length}</p>
                <p className="text-xs text-red-600 mt-2">Active cases</p>
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Recent Activity Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">
                    ₹{donations.reduce((sum, d) => sum + (d.amount || 0), 0).toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">Total Raised</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">
                    {donations.length > 0 ? '₹' + (donations.reduce((sum, d) => sum + (d.amount || 0), 0) / donations.length).toFixed(0) : '₹0'}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">Avg Donation</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">
                    {contacts.filter(c => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">New Contacts (7d)</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl font-bold text-slate-900">
                    {applications.filter(a => new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">New Apps (7d)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donations Analytics */}
        {activeTab === "donations" && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Donation Analytics</h2>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="text-slate-600">Total Raised:</span>
                      <span className="font-bold text-emerald-600">
                        ₹{donations.reduce((sum, d) => sum + (d.amount || 0), 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-600">Donors:</span>
                      <span className="font-bold text-blue-600">{donations.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="text-slate-600">Average:</span>
                      <span className="font-bold text-orange-600">
                        ₹{donations.length > 0 ? (donations.reduce((sum, d) => sum + (d.amount || 0), 0) / donations.length).toFixed(0) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const csv = [
                      ['Date', 'Donor Name', 'Email', 'Phone', 'Amount', 'Payment ID'],
                      ...donations.map(d => [
                        new Date(d.createdAt).toLocaleDateString('en-IN'),
                        d.donorName || 'Anonymous',
                        d.donorEmail || '',
                        d.donorPhone || '',
                        `₹${d.amount}`,
                        d.paymentId
                      ])
                    ].map(row => row.join(',')).join('\n');
                    
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by donor name, email, or payment ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/80 border border-slate-200 rounded-xl hover:bg-white transition-all duration-200"
                >
                  <Filter size={16} />
                  Filters
                  <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-2">Date Range</label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                      <option value="quarter">Last 3 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-2">Amount Range</label>
                    <select
                      value={amountFilter}
                      onChange={(e) => setAmountFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                    >
                      <option value="all">All Amounts</option>
                      <option value="small">₹1 - ₹100</option>
                      <option value="medium">₹101 - ₹500</option>
                      <option value="large">₹501 - ₹1000</option>
                      <option value="xlarge">₹1000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
                    >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                      <option value="name">Donor Name</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Donation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donations
                .filter(donation => {
                  // Search filter
                  const searchLower = searchTerm.toLowerCase();
                  const matchesSearch = !searchTerm || 
                    donation.donorName?.toLowerCase().includes(searchLower) ||
                    donation.donorEmail?.toLowerCase().includes(searchLower) ||
                    donation.paymentId?.toLowerCase().includes(searchLower);
                  
                  // Date filter
                  const donationDate = new Date(donation.createdAt);
                  const now = new Date();
                  let matchesDate = true;
                  if (dateFilter === 'today') {
                    matchesDate = donationDate.toDateString() === now.toDateString();
                  } else if (dateFilter === 'week') {
                    matchesDate = donationDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  } else if (dateFilter === 'month') {
                    matchesDate = donationDate > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                  } else if (dateFilter === 'quarter') {
                    matchesDate = donationDate > new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                  }
                  
                  // Amount filter
                  let matchesAmount = true;
                  if (amountFilter === 'small') matchesAmount = donation.amount <= 100;
                  else if (amountFilter === 'medium') matchesAmount = donation.amount > 100 && donation.amount <= 500;
                  else if (amountFilter === 'large') matchesAmount = donation.amount > 500 && donation.amount <= 1000;
                  else if (amountFilter === 'xlarge') matchesAmount = donation.amount > 1000;
                  
                  return matchesSearch && matchesDate && matchesAmount;
                })
                .sort((a, b) => {
                  if (sortBy === 'amount') {
                    return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
                  } else if (sortBy === 'name') {
                    return sortOrder === 'desc' 
                      ? (b.donorName || '').localeCompare(a.donorName || '')
                      : (a.donorName || '').localeCompare(b.donorName || '');
                  } else {
                    return sortOrder === 'desc'
                      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                  }
                })
                .map((donation) => (
                  <div key={donation.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{donation.donorName || 'Anonymous Donor'}</h3>
                        <p className="text-lg font-bold text-emerald-600">₹{donation.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      {donation.donorEmail && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{donation.donorEmail}</span>
                        </div>
                      )}
                      {donation.donorPhone && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-3 h-3" />
                          <span>{donation.donorPhone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(donation.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-mono">{donation.paymentId.slice(0, 12)}...</span>
                        <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {donations.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Donations Yet</h3>
                <p className="text-slate-600">Donation data will appear here once people start donating to your cause.</p>
              </div>
            )}
          </div>
        )}

        {/* Contacts Table */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No contact messages
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 text-slate-900">
                        {new Date(contact.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-3 text-slate-900 font-medium">{contact.name}</td>
                      <td className="px-6 py-3 text-slate-600 text-xs">{contact.email}</td>
                      <td className="px-6 py-3 text-slate-600 max-w-xs truncate">{contact.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Applications Table */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Position</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No job applications
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 text-slate-900">
                        {new Date(app.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-3 text-slate-900 font-medium">{app.name}</td>
                      <td className="px-6 py-3 text-slate-600 text-xs">{app.email}</td>
                      <td className="px-6 py-3 text-slate-900">{app.role}</td>
                      <td className="px-6 py-3">
                        {app.hasResume ? (
                          <button
                            type="button"
                            onClick={() => downloadResume(app.id, app.resumeFilename)}
                            className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-medium text-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {app.resumeFilename || "Download"}
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Support Cases Table */}
        {activeTab === "support" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Case ID</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Type</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {supportCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No support cases
                    </td>
                  </tr>
                ) : (
                  supportCases.map((case_) => (
                    <tr key={case_.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 text-slate-900 font-mono text-xs font-semibold">{case_.caseId}</td>
                      <td className="px-6 py-3 text-slate-900 font-medium">{case_.name}</td>
                      <td className="px-6 py-3 text-slate-600 text-xs">{case_.email}</td>
                      <td className="px-6 py-3">
                        {case_.serviceType === "Legal" && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                            Legal
                          </span>
                        )}
                        {case_.serviceType === "Grievance" && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                            Grievance
                          </span>
                        )}
                        {case_.serviceType === "Welfare" && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-700">
                            Welfare
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
                          {case_.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {new Date(case_.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
