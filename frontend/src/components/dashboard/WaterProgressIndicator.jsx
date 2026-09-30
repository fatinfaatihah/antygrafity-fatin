import React from 'react';
import { Droplet, Award, CheckCircle2 } from 'lucide-react';

export const WaterProgressIndicator = ({ currentIntake, dailyGoal, progressPercentage }) => {
  const isGoalReached = currentIntake >= dailyGoal;
  // Clamped fill height between 0% and 100% for the visual wave
  const fillPercent = Math.min(100, Math.max(5, progressPercentage));

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-100 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background soft water pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-2xl -z-0 opacity-60"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Circular Water Indicator */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-brand-100 p-2 shadow-inner bg-gradient-to-b from-brand-50/50 to-white flex items-center justify-center">
          
          {/* Inner animated water container */}
          <div className="w-full h-full rounded-full overflow-hidden relative bg-brand-50/40 flex items-center justify-center shadow-inner">
            
            {/* Water Wave Fill Layer */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-600 via-brand-500 to-brand-400 transition-all duration-700 ease-out opacity-90"
              style={{ height: `${fillPercent}%` }}
            >
              {/* Animated wave crest */}
              <div className="absolute -top-3 left-0 right-0 h-4 bg-brand-300/40 rounded-full blur-[2px] animate-wave"></div>
            </div>

            {/* Floating Droplets Effect */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/40 absolute top-10 left-12 animate-ping"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/50 absolute bottom-12 right-14 animate-pulse"></div>
            </div>

            {/* Central Information Overlay */}
            <div className="relative z-20 flex flex-col items-center justify-center p-4">
              <div className={`p-2 rounded-2xl mb-1 shadow-sm backdrop-blur-md ${
                fillPercent > 55 ? 'bg-white/30 text-white' : 'bg-white/80 text-brand-600'
              }`}>
                {isGoalReached ? (
                  <Award className="w-6 h-6 animate-bounce text-amber-300" />
                ) : (
                  <Droplet className="w-6 h-6 fill-current animate-pulse" />
                )}
              </div>

              <span className={`text-3xl md:text-4xl font-black tracking-tight drop-shadow-xs ${
                fillPercent > 55 ? 'text-white' : 'text-slate-800'
              }`}>
                {progressPercentage}%
              </span>

              <span className={`text-xs font-semibold uppercase tracking-wider mt-0.5 ${
                fillPercent > 55 ? 'text-brand-100' : 'text-slate-500'
              }`}>
                {currentIntake} / {dailyGoal} ml
              </span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-5 text-center">
          {isGoalReached ? (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Target Hidrasi Hari Ini Tercapai! Luar biasa 🎉</span>
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-medium">
              Tinggal <span className="font-bold text-brand-600">{Math.max(0, dailyGoal - currentIntake)} ml</span> lagi untuk mencapai target harianmu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
