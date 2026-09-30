import React from 'react';
import { 
  Droplets, 
  LayoutDashboard, 
  CalendarClock, 
  PlusCircle, 
  History, 
  User, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'Water Schedule', icon: CalendarClock },
    { id: 'add-water', label: 'Add Water', icon: PlusCircle },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-brand-100 shadow-sm min-h-screen p-5 sticky top-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 py-3 mb-8 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
          <Droplets className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-slate-800">KIMI</span>
            <span className="font-bold text-xl tracking-tight text-brand-600">WATER</span>
            <span className="text-sm">💧</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Hydration Tracker</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Menu Utama
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm border border-brand-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.id === 'add-water' && (
                <span className="ml-auto text-[10px] bg-brand-500 text-white font-bold px-2 py-0.5 rounded-full">
                  Baru
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Daily Motivation Card */}
      <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-4 text-white shadow-lg shadow-brand-500/20 mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-brand-200" />
          <span className="text-xs font-semibold text-brand-100 uppercase tracking-wider">Tips Hidrasi</span>
        </div>
        <p className="text-xs text-white/90 leading-relaxed font-normal">
          Minum 1 gelas air putih setelah bangun tidur membantu mengaktifkan organ tubuhmu!
        </p>
      </div>

      {/* User Info & Logout */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          onClick={() => setActiveTab('profile')}
        >
          <div className="w-9 h-9 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center font-bold text-brand-700 text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="max-w-[110px] truncate">
            <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'User'}</p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email || 'user@kimi.app'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          title="Keluar"
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
