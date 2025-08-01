import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, X, Filter } from 'lucide-react';
import { BloodType, BloodInventory } from '../../types';

interface BloodSearchProps {
  onClose: () => void;
}

const BloodSearch: React.FC<BloodSearchProps> = ({ onClose }) => {
  const [searchFilters, setSearchFilters] = useState({
    bloodType: '' as BloodType | '',
    location: '',
    radius: '10',
    availability: 'available'
  });

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const mockResults: (BloodInventory & { centerName: string; phone: string; distance: number })[] = [
    {
      centerName: 'City Medical Center Blood Bank',
      bloodType: 'A+',
      unitsAvailable: 25,
      unitsReserved: 5,
      expiryDates: ['2024-02-15', '2024-02-20'],
      lastUpdated: '2024-01-15T10:30:00Z',
      location: '123 Healthcare Ave, City, ST 12345',
      phone: '+1 (555) 123-4567',
      distance: 2.3
    },
    {
      centerName: 'Regional Blood Center',
      bloodType: 'A+',
      unitsAvailable: 18,
      unitsReserved: 3,
      expiryDates: ['2024-02-18', '2024-02-25'],
      lastUpdated: '2024-01-15T09:15:00Z',
      location: '456 Donation St, City, ST 12345',
      phone: '+1 (555) 234-5678',
      distance: 4.7
    },
    {
      centerName: 'Community Hospital Blood Bank',
      bloodType: 'A+',
      unitsAvailable: 12,
      unitsReserved: 2,
      expiryDates: ['2024-02-16', '2024-02-22'],
      lastUpdated: '2024-01-15T11:45:00Z',
      location: '789 Community Blvd, City, ST 12345',
      phone: '+1 (555) 345-6789',
      distance: 6.1
    }
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getAvailabilityStatus = (available: number, reserved: number) => {
    const total = available + reserved;
    if (available === 0) return { status: 'out-of-stock', color: 'text-red-600 bg-red-100' };
    if (available <= 5) return { status: 'low-stock', color: 'text-orange-600 bg-orange-100' };
    if (available <= 10) return { status: 'moderate', color: 'text-yellow-600 bg-yellow-100' };
    return { status: 'good-stock', color: 'text-green-600 bg-green-100' };
  };

  const formatDistance = (distance: number) => {
    return distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Search Blood Banks</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Search Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Search Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              name="bloodType"
              value={searchFilters.bloodType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Blood Types</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={searchFilters.location}
              onChange={handleFilterChange}
              placeholder="Enter city or zip code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Radius
            </label>
            <select
              name="radius"
              value={searchFilters.radius}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              name="availability"
              value={searchFilters.availability}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="available">Available Now</option>
              <option value="low">Low Stock</option>
              <option value="all">All Centers</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search Blood Banks
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Search Results ({mockResults.length} centers found)
          </h3>
          <div className="text-sm text-gray-600">
            Sorted by distance
          </div>
        </div>

        {mockResults.map((result, index) => {
          const availability = getAvailabilityStatus(result.unitsAvailable, result.unitsReserved);
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">
                    {result.centerName}
                  </h4>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{result.location}</span>
                    <span className="ml-2 text-sm text-blue-600">
                      {formatDistance(result.distance)} away
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    <span className="text-sm">{result.phone}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-red-600">
                      {result.bloodType}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${availability.color}`}>
                      {result.unitsAvailable} units
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Clock className="inline h-3 w-3 mr-1" />
                    Updated {new Date(result.lastUpdated).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-800">Available</div>
                  <div className="text-green-600">{result.unitsAvailable} units</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="font-medium text-yellow-800">Reserved</div>
                  <div className="text-yellow-600">{result.unitsReserved} units</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-800">Next Expiry</div>
                  <div className="text-blue-600">
                    {new Date(result.expiryDates[0]).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Request Blood
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {mockResults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No blood banks found matching your criteria</p>
          <p className="text-sm mt-1">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default BloodSearch;