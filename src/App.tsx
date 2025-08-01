import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DonorDashboard from './components/dashboards/DonorDashboard';
import RecipientDashboard from './components/dashboards/RecipientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Header from './components/layout/Header';
import { User } from './types';

function AppContent() {
  const { user, login, register, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  const handleLogin = async (email: string, password: string) => {
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      email,
      name: email === 'admin@bloodbank.com' ? 'Admin User' : 
            email === 'donor@test.com' ? 'John Donor' : 'Jane Recipient',
      role: email === 'admin@bloodbank.com' ? 'admin' : 
            email === 'donor@test.com' ? 'donor' : 'recipient',
      phone: '+1234567890',
      address: '123 Main St, City, State',
      bloodType: email === 'donor@test.com' ? 'O+' : 'A+',
      createdAt: new Date().toISOString()
    };
    login(mockUser);
  };

  const handleRegister = async (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    register(newUser);
  };

  const renderDashboard = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'donor':
        return <DonorDashboard />;
      case 'recipient':
        return <RecipientDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Blood Bank Management</h1>
            <p className="text-gray-600">Connecting donors with recipients, saving lives together</p>
          </div>
          
          <div className="max-w-md mx-auto">
            {currentView === 'login' ? (
              <LoginForm 
                onLogin={handleLogin}
                onSwitchToRegister={() => setCurrentView('register')}
              />
            ) : (
              <RegisterForm 
                onRegister={handleRegister}
                onSwitchToLogin={() => setCurrentView('login')}
              />
            )}
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      <main className="container mx-auto px-4 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;