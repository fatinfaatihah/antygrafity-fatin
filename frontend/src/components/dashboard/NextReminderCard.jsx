import React from 'react';
import { Bell, Check, Clock, Droplet, Sparkles } from 'lucide-react';
import { useWater } from '../../context/WaterContext';

export const NextReminderCard = ({ onOpenAddModal }) => {
  const { nextReminder, toggleScheduleCompleted } = useWater();

  if (!nextReminder) {
    return (
      <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-6 border border-brand-100 shadow-xs flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-800 text-sm">Semua Jadwal Selesai!</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Kamu sudah menyelesaikan semua jadwal minum untuk hari ini. Luar biasa!
        </p>
      </div>
    );
  }

  const handleQuickDrink = () => {
    toggleScheduleCompleted(nextReminder.id, true);
  };

  return (
    <div className="bg-gradient-to-br from-sky-500 to-brand-600 rounded-3xl p-6 text-white shadow-lg shadow-brand-500/25 relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
            <Bell className="w-4 h-4 text-white animate-bounce" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-100">
            Jadwal Minum Berikutnya
          </span>
        </div>

        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md ${
          nextReminder.isPastDue 
            ? 'bg-amber-400 text-amber-950' 
            : 'bg-white/20 text-white'
        }`}>
          {nextReminder.isPastDue ? 'Belum Diminum' : nextReminder.isTomorrow ? 'Besok Pagi' : 'Hari Ini'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {nextReminder.time}
            </span>
            <span className="text-sm text-brand-100 font-medium">WIB</span>
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-brand-50">
            <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-lg">
              <Droplet className="w-3.5 h-3.5 text-brand-200 fill-brand-200" />
              <span className="font-semibold">{nextReminder.amount} ml</span>
            </div>
            <span>•</span>
            <span className="font-medium truncate max-w-[150px]">{nextReminder.label}</span>
          </div>
        </div>

        <button
          onClick={handleQuickDrink}
          className="flex items-center justify-center gap-2 bg-white text-brand-700 hover:bg-brand-50 active:scale-95 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all whitespace-nowrap"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Minum Sekarang</span>
        </button>
      </div>
    </div>
  );
};
