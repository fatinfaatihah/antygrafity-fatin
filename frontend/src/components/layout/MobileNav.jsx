import React from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Plus, 
  History, 
  User 
} from 'lucide-react';

export const MobileNav = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
          activeTab === 'dashboard' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Dashboard</span>
      </button>

      <button
        onClick={() => setActiveTab('schedule')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
          activeTab === 'schedule' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <CalendarClock className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Jadwal</span>
      </button>

      {/* Prominent Center Add Button */}
      <button
        onClick={onOpenAddModal}
        className="-mt-5 bg-gradient-to-tr from-brand-600 to-brand-400 text-white p-3.5 rounded-full shadow-lg shadow-brand-500/40 active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={() => setActiveTab('history')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
          activeTab === 'history' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <History className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Riwayat</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
          activeTab === 'profile' ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Profil</span>
      </button>
    </div>
  );
};
