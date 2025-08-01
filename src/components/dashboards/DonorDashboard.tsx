import React, { useState } from 'react';
import { Calendar, Heart, Clock, MapPin, Plus, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DonationForm from '../forms/DonationForm';

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showDonationForm, setShowDonationForm] = useState(false);

  const upcomingDonations = [
    {
      id: '1',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'City Medical Center',
      address: '123 Healthcare Ave, City, ST',
      status: 'confirmed'
    }
  ];

  const donationHistory = [
    {
      id: '1',
      date: '2023-10-15',
      location: 'Regional Blood Center',
      unitsCollected: 1,
      status: 'completed'
    },
    {
      id: '2',
      date: '2023-07-10',
      location: 'City Medical Center',
      unitsCollected: 1,
      status: 'completed'
    }
  ];

  const nextEligibleDate = '2024-02-15';
  const totalDonations = donationHistory.length;
  const livesImpacted = totalDonations * 3; // Approximate lives saved per donation

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-red-100">Thank you for being a life-saving blood donor.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-800">{totalDonations}</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lives Impacted</p>
              <p className="text-2xl font-bold text-gray-800">{livesImpacted}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
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
              <p className="text-sm text-gray-600">Next Eligible</p>
              <p className="text-sm font-semibold text-gray-800">{nextEligibleDate}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowDonationForm(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule Donation</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>View Calendar</span>
          </button>
        </div>
      </div>

      {/* Upcoming Donations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Donations</h2>
        {upcomingDonations.length > 0 ? (
          <div className="space-y-3">
            {upcomingDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{donation.location}</p>
                    <p className="text-sm text-gray-600">
                      {donation.date} at {donation.time}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {donation.address}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming donations scheduled</p>
            <button
              onClick={() => setShowDonationForm(true)}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Schedule your next donation
            </button>
          </div>
        )}
      </div>

      {/* Donation History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Donation History</h2>
        <div className="space-y-3">
          {donationHistory.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-400 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{donation.location}</p>
                  <p className="text-sm text-gray-600">{donation.date}</p>
                  <p className="text-sm text-gray-500">{donation.unitsCollected} unit collected</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <DonationForm onClose={() => setShowDonationForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;