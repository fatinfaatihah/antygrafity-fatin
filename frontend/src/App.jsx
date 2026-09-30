import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WaterProvider } from './context/WaterContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { AddWaterModal } from './components/modals/AddWaterModal';
import { Dashboard } from './pages/Dashboard';
import { WaterSchedule } from './pages/WaterSchedule';
import { AddWater } from './pages/AddWater';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // If user is not authenticated, show Login or Register view
  if (!isAuthenticated) {
    if (authView === 'register') {
      return <Register onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onSwitchToRegister={() => setAuthView('register')} />;
  }

  // Render current tab page
  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onOpenAddModal={() => setIsAddModalOpen(true)} 
            onNavigate={(tab) => setActiveTab(tab)} 
          />
        );
      case 'schedule':
        return <WaterSchedule />;
      case 'add-water':
        return <AddWater onNavigate={(tab) => setActiveTab(tab)} />;
      case 'history':
        return <History onNavigate={(tab) => setActiveTab(tab)} />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <Dashboard 
            onOpenAddModal={() => setIsAddModalOpen(true)} 
            onNavigate={(tab) => setActiveTab(tab)} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Desktop Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header onOpenAddModal={() => setIsAddModalOpen(true)} />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAddModal={() => setIsAddModalOpen(true)} 
      />

      {/* Global Quick Add Water Modal */}
      <AddWaterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <WaterProvider>
        <MainLayout />
      </WaterProvider>
    </AuthProvider>
  );
}
