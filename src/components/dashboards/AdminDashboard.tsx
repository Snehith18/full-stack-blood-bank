import React, { useState } from 'react';
import { Users, Heart, AlertTriangle, TrendingUp, CheckCircle, X, Eye } from 'lucide-react';
import BloodInventoryManager from '../admin/BloodInventoryManager';
import RequestManagement from '../admin/RequestManagement';
import UserManagement from '../admin/UserManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'requests' | 'users'>('overview');

  const stats = {
    totalDonors: 1245,
    totalRecipients: 687,
    pendingRequests: 23,
    criticalStock: 5,
    todayDonations: 12,
    weeklyGrowth: 8.2
  };

  const recentActivities = [
    {
      id: '1',
      type: 'donation',
      user: 'John Smith',
      action: 'donated 1 unit of O+ blood',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'request',
      user: 'Sarah Johnson',
      action: 'requested 2 units of A+ blood',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'approval',
      user: 'Admin',
      action: 'approved blood request #BR-2024-001',
      time: '6 hours ago',
      status: 'completed'
    }
  ];

  const criticalAlerts = [
    {
      id: '1',
      type: 'low_stock',
      message: 'AB- blood type has only 2 units remaining',
      severity: 'critical',
      time: '1 hour ago'
    },
    {
      id: '2',
      type: 'urgent_request',
      message: 'Critical blood request awaiting approval',
      severity: 'high',
      time: '3 hours ago'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'inventory', label: 'Blood Inventory', icon: Heart },
    { id: 'requests', label: 'Requests', icon: AlertTriangle },
    { id: 'users', label: 'User Management', icon: Users }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <BloodInventoryManager />;
      case 'requests':
        return <RequestManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalDonors}</p>
              <p className="text-sm text-green-600 mt-1">+{stats.weeklyGrowth}% this week</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recipients</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalRecipients}</p>
              <p className="text-sm text-blue-600 mt-1">Active users</p>
            </div>
            <Heart className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pendingRequests}</p>
              <p className="text-sm text-orange-600 mt-1">Requires attention</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Donations</p>
              <p className="text-2xl font-bold text-gray-800">{stats.todayDonations}</p>
              <p className="text-sm text-green-600 mt-1">Units collected</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Critical Alerts
          </h2>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'critical' ? 'bg-red-50 border-red-500' : 'bg-orange-50 border-orange-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`font-medium ${
                      alert.severity === 'critical' ? 'text-red-800' : 'text-orange-800'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-full ${
                activity.type === 'donation' ? 'bg-green-100' :
                activity.type === 'request' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                {activity.type === 'donation' ? (
                  <Heart className={`h-4 w-4 ${
                    activity.type === 'donation' ? 'text-green-600' :
                    activity.type === 'request' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                ) : activity.type === 'request' ? (
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100">Manage blood bank operations and monitor system health.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;