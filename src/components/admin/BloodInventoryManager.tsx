import React, { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { BloodType, BloodInventory } from '../../types';

const BloodInventoryManager: React.FC = () => {
  const [inventory, setInventory] = useState<BloodInventory[]>([
    {
      bloodType: 'A+',
      unitsAvailable: 25,
      unitsReserved: 5,
      expiryDates: ['2024-02-15', '2024-02-20', '2024-02-25'],
      lastUpdated: '2024-01-15T10:30:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'A-',
      unitsAvailable: 12,
      unitsReserved: 3,
      expiryDates: ['2024-02-18', '2024-02-22'],
      lastUpdated: '2024-01-15T09:15:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'B+',
      unitsAvailable: 18,
      unitsReserved: 2,
      expiryDates: ['2024-02-16', '2024-02-19', '2024-02-24'],
      lastUpdated: '2024-01-15T11:45:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'B-',
      unitsAvailable: 8,
      unitsReserved: 1,
      expiryDates: ['2024-02-17', '2024-02-21'],
      lastUpdated: '2024-01-15T08:20:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'AB+',
      unitsAvailable: 15,
      unitsReserved: 4,
      expiryDates: ['2024-02-14', '2024-02-18', '2024-02-23'],
      lastUpdated: '2024-01-15T12:10:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'AB-',
      unitsAvailable: 3,
      unitsReserved: 1,
      expiryDates: ['2024-02-16'],
      lastUpdated: '2024-01-15T07:45:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'O+',
      unitsAvailable: 32,
      unitsReserved: 8,
      expiryDates: ['2024-02-13', '2024-02-17', '2024-02-21', '2024-02-26'],
      lastUpdated: '2024-01-15T13:30:00Z',
      location: 'Main Storage'
    },
    {
      bloodType: 'O-',
      unitsAvailable: 6,
      unitsReserved: 2,
      expiryDates: ['2024-02-15', '2024-02-19'],
      lastUpdated: '2024-01-15T06:55:00Z',
      location: 'Main Storage'
    }
  ]);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | null>(null);

  const getStockStatus = (available: number, reserved: number) => {
    const total = available + reserved;
    if (available <= 5) return { status: 'critical', color: 'text-red-600 bg-red-100', icon: AlertTriangle };
    if (available <= 10) return { status: 'low', color: 'text-orange-600 bg-orange-100', icon: TrendingDown };
    if (available <= 20) return { status: 'moderate', color: 'text-yellow-600 bg-yellow-100', icon: TrendingUp };
    return { status: 'good', color: 'text-green-600 bg-green-100', icon: TrendingUp };
  };

  const getNextExpiry = (expiryDates: string[]) => {
    const sortedDates = expiryDates.sort();
    const nextExpiry = new Date(sortedDates[0]);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((nextExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      date: nextExpiry.toLocaleDateString(),
      daysUntil: daysUntilExpiry,
      isUrgent: daysUntilExpiry <= 3
    };
  };

  const handleUpdateStock = (bloodType: BloodType) => {
    setSelectedBloodType(bloodType);
    setShowUpdateForm(true);
  };

  const getTotalUnits = () => {
    return inventory.reduce((total, item) => total + item.unitsAvailable + item.unitsReserved, 0);
  };

  const getCriticalStock = () => {
    return inventory.filter(item => item.unitsAvailable <= 5).length;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Units</p>
              <p className="text-2xl font-bold text-blue-800">{getTotalUnits()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Available</p>
              <p className="text-2xl font-bold text-green-800">
                {inventory.reduce((total, item) => total + item.unitsAvailable, 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Reserved</p>
              <p className="text-2xl font-bold text-yellow-800">
                {inventory.reduce((total, item) => total + item.unitsReserved, 0)}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Critical Stock</p>
              <p className="text-2xl font-bold text-red-800">{getCriticalStock()}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Blood Type Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventory.map((item) => {
          const stockStatus = getStockStatus(item.unitsAvailable, item.unitsReserved);
          const nextExpiry = getNextExpiry(item.expiryDates);
          const StatusIcon = stockStatus.icon;

          return (
            <div key={item.bloodType} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">{item.bloodType}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                  <StatusIcon className="inline h-3 w-3 mr-1" />
                  {stockStatus.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-semibold text-green-600">{item.unitsAvailable} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reserved:</span>
                  <span className="font-semibold text-yellow-600">{item.unitsReserved} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Expiry:</span>
                  <span className={`font-semibold ${nextExpiry.isUrgent ? 'text-red-600' : 'text-gray-800'}`}>
                    {nextExpiry.daysUntil}d
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateStock(item.bloodType)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Update
                </button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                Updated: {new Date(item.lastUpdated).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expiring Soon Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-orange-800">Units Expiring Soon</h3>
            <div className="mt-2 space-y-1">
              {inventory
                .filter(item => {
                  const nextExpiry = getNextExpiry(item.expiryDates);
                  return nextExpiry.daysUntil <= 7;
                })
                .map(item => {
                  const nextExpiry = getNextExpiry(item.expiryDates);
                  return (
                    <p key={item.bloodType} className="text-sm text-orange-700">
                      {item.bloodType}: {nextExpiry.daysUntil} days until expiry ({nextExpiry.date})
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Stock
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodInventoryManager;