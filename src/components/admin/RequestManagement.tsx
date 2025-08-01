import React, { useState } from 'react';
import { CheckCircle, X, Clock, AlertTriangle, Eye, Filter } from 'lucide-react';
import { BloodRequest } from '../../types';

const RequestManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'fulfilled' | 'rejected'>('pending');

  const mockRequests: BloodRequest[] = [
    {
      id: 'BR-2024-001',
      recipientId: '1',
      recipientName: 'Sarah Johnson',
      bloodType: 'A+',
      unitsNeeded: 2,
      urgency: 'high',
      hospitalName: 'City General Hospital',
      hospitalAddress: '123 Medical Center Dr, City, ST',
      contactNumber: '+1 (555) 123-4567',
      medicalReason: 'Emergency surgery following car accident',
      status: 'pending',
      requestDate: '2024-01-15T14:30:00Z',
      requiredBy: '2024-01-18T08:00:00Z',
      notes: 'Patient is stable but requires blood for upcoming surgery'
    },
    {
      id: 'BR-2024-002',
      recipientId: '2',
      recipientName: 'Michael Chen',
      bloodType: 'O-',
      unitsNeeded: 1,
      urgency: 'critical',
      hospitalName: 'Regional Medical Center',
      hospitalAddress: '456 Healthcare Ave, City, ST',
      contactNumber: '+1 (555) 234-5678',
      medicalReason: 'Severe anemia, urgent transfusion required',
      status: 'pending',
      requestDate: '2024-01-15T16:45:00Z',
      requiredBy: '2024-01-16T12:00:00Z',
      notes: 'Critical case - patient condition deteriorating'
    },
    {
      id: 'BR-2024-003',
      recipientId: '3',
      recipientName: 'Emily Rodriguez',
      bloodType: 'B+',
      unitsNeeded: 3,
      urgency: 'medium',
      hospitalName: 'Community Hospital',
      hospitalAddress: '789 Community Blvd, City, ST',
      contactNumber: '+1 (555) 345-6789',
      medicalReason: 'Scheduled surgery for kidney transplant',
      status: 'approved',
      requestDate: '2024-01-14T10:15:00Z',
      requiredBy: '2024-01-20T09:00:00Z'
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

  const handleApprove = (requestId: string) => {
    console.log('Approving request:', requestId);
  };

  const handleReject = (requestId: string) => {
    console.log('Rejecting request:', requestId);
  };

  const filteredRequests = mockRequests.filter(request => request.status === activeTab);

  const getTabCount = (status: string) => {
    return mockRequests.filter(request => request.status === status).length;
  };

  const tabs = [
    { id: 'pending', label: 'Pending', count: getTabCount('pending'), color: 'text-yellow-600' },
    { id: 'approved', label: 'Approved', count: getTabCount('approved'), color: 'text-blue-600' },
    { id: 'fulfilled', label: 'Fulfilled', count: getTabCount('fulfilled'), color: 'text-green-600' },
    { id: 'rejected', label: 'Rejected', count: getTabCount('rejected'), color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-800">{getTabCount('pending')}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Approved</p>
              <p className="text-2xl font-bold text-blue-800">{getTabCount('approved')}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Fulfilled</p>
              <p className="text-2xl font-bold text-green-800">{getTabCount('fulfilled')}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Critical Requests</p>
              <p className="text-2xl font-bold text-red-800">
                {mockRequests.filter(r => r.urgency === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Request Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-100 ${tab.color}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {filteredRequests.length > 0 ? (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold">{request.bloodType}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{request.recipientName}</h3>
                        <p className="text-sm text-gray-600">Request ID: {request.id}</p>
                        <p className="text-sm text-gray-600">{request.hospitalName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Units Needed:</span>
                      <p className="font-semibold">{request.unitsNeeded}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Requested Date:</span>
                      <p className="font-semibold">{new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Required By:</span>
                      <p className="font-semibold">{new Date(request.requiredBy).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Contact:</span>
                      <p className="font-semibold">{request.contactNumber}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Medical Reason:</span>
                    <p className="text-gray-800 mt-1">{request.medicalReason}</p>
                  </div>

                  {request.notes && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-600">Notes:</span>
                      <p className="text-gray-800 mt-1">{request.notes}</p>
                    </div>
                  )}

                  {request.urgency === 'critical' && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Critical Request</span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">
                        This request requires immediate attention due to critical medical condition.
                      </p>
                    </div>
                  )}

                  {request.status === 'pending' && (
                    <div className="flex justify-end space-x-3">
                      <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No {activeTab} requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;