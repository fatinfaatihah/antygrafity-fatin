import React from 'react';
import { Bell, Plus, Droplet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWater } from '../../context/WaterContext';

export const Header = ({ onOpenAddModal }) => {
  const { user } = useAuth();
  const { currentIntake, dailyGoal } = useWater();

  // Format today's date in Indonesian
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-brand-100/80 sticky top-0 z-20 px-4 md:px-8 py-4 flex items-center justify-between shadow-xs">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
          {formattedDate}
        </span>
        <h1 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
          Halo, {user?.name?.split(' ')[0] || 'Teman'} 👋
          <span className="hidden sm:inline text-xs font-medium text-slate-400">
            — Jaga tubuhmu tetap segar!
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Intake Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-brand-50 border border-brand-100 px-3.5 py-1.5 rounded-full">
          <Droplet className="w-4 h-4 text-brand-500 fill-brand-500" />
          <span className="text-xs font-bold text-brand-700">
            {currentIntake} / {dailyGoal} ml
          </span>
        </div>

        {/* Add Water Shortcut Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Air</span>
        </button>
      </div>
    </header>
  );
};
