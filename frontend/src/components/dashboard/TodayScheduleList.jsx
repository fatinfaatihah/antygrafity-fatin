import React from 'react';
import { CheckCircle2, Circle, Clock, Droplet, ArrowRight, Calendar } from 'lucide-react';
import { useWater } from '../../context/WaterContext';

export const TodayScheduleList = ({ onNavigateToSchedule }) => {
  const { schedules, toggleScheduleCompleted } = useWater();

  // Show top 4 schedules on dashboard
  const displaySchedules = schedules.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-800 text-sm md:text-base">Jadwal Minum Hari Ini</h3>
        </div>

        <button
          onClick={onNavigateToSchedule}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {displaySchedules.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-xs">
          Belum ada jadwal yang disetel.
        </div>
      ) : (
        <div className="space-y-2.5">
          {displaySchedules.map((schedule) => (
            <div
              key={schedule.id}
              onClick={() => toggleScheduleCompleted(schedule.id, true)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                schedule.completed
                  ? 'bg-slate-50/70 border-slate-100 opacity-75'
                  : 'bg-white border-brand-100 hover:border-brand-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-slate-400 hover:text-brand-600 transition"
                >
                  {schedule.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-brand-500" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${schedule.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {schedule.time}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">WIB</span>
                  </div>
                  <p className="text-xs text-slate-500">{schedule.label}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl">
                <Droplet className="w-3 h-3 fill-current" />
                <span>{schedule.amount} ml</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
