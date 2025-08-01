import React, { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, Search, Filter, MoreVertical } from 'lucide-react';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'donors' | 'recipients'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers: User[] = [
    {
      id: '1',
      email: 'john.smith@email.com',
      name: 'John Smith',
      role: 'donor',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, ST 12345',
      bloodType: 'O+',
      dateOfBirth: '1985-03-15',
      createdAt: '2023-08-15T10:30:00Z'
    },
    {
      id: '2',
      email: 'sarah.johnson@email.com',
      name: 'Sarah Johnson',
      role: 'recipient',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, City, ST 12345',
      bloodType: 'A+',
      dateOfBirth: '1992-07-22',
      createdAt: '2023-09-02T14:15:00Z'
    },
    {
      id: '3',
      email: 'michael.chen@email.com',
      name: 'Michael Chen',
      role: 'donor',
      phone: '+1 (555) 345-6789',
      address: '789 Pine St, City, ST 12345',
      bloodType: 'B-',
      dateOfBirth: '1988-11-08',
      createdAt: '2023-07-10T09:45:00Z'
    },
    {
      id: '4',
      email: 'emily.rodriguez@email.com',
      name: 'Emily Rodriguez',
      role: 'recipient',
      phone: '+1 (555) 456-7890',
      address: '321 Elm Rd, City, ST 12345',
      bloodType: 'AB+',
      dateOfBirth: '1990-02-14',
      createdAt: '2023-10-20T16:20:00Z'
    },
    {
      id: '5',
      email: 'david.wilson@email.com',
      name: 'David Wilson',
      role: 'donor',
      phone: '+1 (555) 567-8901',
      address: '654 Maple Dr, City, ST 12345',
      bloodType: 'O-',
      dateOfBirth: '1983-05-30',
      createdAt: '2023-06-05T11:10:00Z'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'donor': return 'bg-green-100 text-green-800';
      case 'recipient': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBloodTypeColor = (bloodType: string) => {
    return 'bg-red-100 text-red-800';
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesTab = activeTab === 'all' || user.role === activeTab.slice(0, -1);
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabCount = (tab: string) => {
    if (tab === 'all') return mockUsers.length;
    return mockUsers.filter(user => user.role === tab.slice(0, -1)).length;
  };

  const tabs = [
    { id: 'all', label: 'All Users', count: getTabCount('all') },
    { id: 'donors', label: 'Donors', count: getTabCount('donors') },
    { id: 'recipients', label: 'Recipients', count: getTabCount('recipients') }
  ];

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-800">{mockUsers.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Active Donors</p>
              <p className="text-2xl font-bold text-green-800">
                {mockUsers.filter(u => u.role === 'donor').length}
              </p>
            </div>
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Recipients</p>
              <p className="text-2xl font-bold text-purple-800">
                {mockUsers.filter(u => u.role === 'recipient').length}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </button>
        </div>
      </div>

      {/* User Tabs */}
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
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Blood Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Age</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBloodTypeColor(user.bloodType)}`}>
                          {user.bloodType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-800">
                          {user.dateOfBirth ? calculateAge(user.dateOfBirth) : 'N/A'} years
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-gray-800">{user.phone}</p>
                          <p className="text-xs text-gray-600">{user.address}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;