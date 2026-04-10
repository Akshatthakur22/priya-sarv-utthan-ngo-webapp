/**
 * Admin Dashboard - Main Page
 * Shows overview of all data
 */

"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

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

      if (donRes.ok) setDonations(await donRes.json().then(r => r.data));
      if (conRes.ok) setContacts(await conRes.json().then(r => r.data));
      if (appRes.ok) setApplications(await appRes.json().then(r => r.data));
      if (supRes.ok) setSupportCases(await supRes.json().then(r => r.data));
    } catch (error) {
      console.error("Failed to fetch data:", error);
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
    if (stored) {
      setApiKey(stored);
      setAuthenticated(true);
      fetchAllData(stored);
    }
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Panel</h1>
          <p className="text-slate-600 text-sm mb-6">Enter your admin API key to access the dashboard</p>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter admin API key"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleAuth()}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <button
              onClick={handleAuth}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Login
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Set <code className="bg-blue-100 px-1 rounded">ADMIN_API_KEY</code> in .env.local to enable admin access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Priya Sarv Utthan NGO</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview" },
              { id: "donations", label: `Donations (${donations.length})` },
              { id: "contacts", label: `Contacts (${contacts.length})` },
              { id: "applications", label: `Job Apps (${applications.length})` },
              { id: "support", label: `Support Cases (${supportCases.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <p className="text-sm font-medium text-emerald-600">Total Donations</p>
              <p className="text-3xl font-bold text-emerald-900 mt-2">{donations.length}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-sm font-medium text-blue-600">Total Contacts</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{contacts.length}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-sm font-medium text-orange-600">Job Applications</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">{applications.length}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-sm font-medium text-red-600">Support Cases</p>
              <p className="text-3xl font-bold text-red-900 mt-2">{supportCases.length}</p>
            </div>
          </div>
        )}

        {/* Donations Table */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Donor</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Payment ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No donations yet
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 text-slate-900">
                        {new Date(donation.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-3 text-slate-900">{donation.donorName}</td>
                      <td className="px-6 py-3 text-slate-600 text-xs">{donation.donorEmail}</td>
                      <td className="px-6 py-3 font-semibold text-emerald-600">₹{donation.amount.toFixed(2)}</td>
                      <td className="px-6 py-3 text-slate-500 text-xs font-mono">{donation.paymentId.slice(0, 15)}...</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Phone</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">Position</th>
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
                      <td className="px-6 py-3 text-slate-600">{app.phone || "—"}</td>
                      <td className="px-6 py-3 text-slate-900">{app.role}</td>
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
