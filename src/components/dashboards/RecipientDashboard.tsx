import React, { useState } from 'react';
import { Search, Heart, Clock, AlertCircle, Plus, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import BloodRequestForm from '../forms/BloodRequestForm';
import BloodSearch from '../search/BloodSearch';

const RecipientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const activeRequests = [
    {
      id: '1',
      bloodType: 'A+',
      unitsNeeded: 2,
      urgency: 'high',
      hospitalName: 'City General Hospital',
      status: 'pending',
      requestDate: '2024-01-15',
      requiredBy: '2024-01-18'
    }
  ];

  const requestHistory = [
    {
      id: '2',
      bloodType: 'A+',
      unitsNeeded: 1,
      hospitalName: 'Regional Medical Center',
      status: 'fulfilled',
      requestDate: '2023-12-10',
      fulfilledDate: '2023-12-11'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-blue-100">Find the blood you need quickly and safely.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Requests</p>
              <p className="text-2xl font-bold text-gray-800">{activeRequests.length}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-800">{activeRequests.length + requestHistory.length}</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blood Type</p>
              <p className="text-2xl font-bold text-red-600">{user?.bloodType}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-sm">💧</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fulfilled</p>
              <p className="text-2xl font-bold text-gray-800">{requestHistory.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowRequestForm(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Request Blood</span>
          </button>
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Search Blood Banks</span>
          </button>
        </div>
      </div>

      {/* Active Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Requests</h2>
        {activeRequests.length > 0 ? (
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">{request.bloodType}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{request.hospitalName}</h3>
                      <p className="text-sm text-gray-600">{request.unitsNeeded} units needed</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Requested:</span> {request.requestDate}
                  </div>
                  <div>
                    <span className="font-medium">Required by:</span> {request.requiredBy}
                  </div>
                </div>
                {request.urgency === 'high' && (
                  <div className="mt-3 flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">High priority request - requires immediate attention</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No active blood requests</p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Create your first request
            </button>
          </div>
        )}
      </div>

      {/* Request History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Request History</h2>
        <div className="space-y-3">
          {requestHistory.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{request.hospitalName}</p>
                  <p className="text-sm text-gray-600">
                    {request.bloodType} - {request.unitsNeeded} units
                  </p>
                  <p className="text-sm text-gray-500">
                    Requested: {request.requestDate} | Fulfilled: {request.fulfilledDate}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                Fulfilled
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blood Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BloodRequestForm onClose={() => setShowRequestForm(false)} />
          </div>
        </div>
      )}

      {/* Blood Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <BloodSearch onClose={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientDashboard;