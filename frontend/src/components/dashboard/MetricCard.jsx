import React from 'react';
import { Target, Droplets, Hourglass, TrendingUp } from 'lucide-react';

export const MetricCard = ({ title, value, unit = 'ml', subtitle, iconType, color = 'blue' }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'goal':
        return <Target className="w-5 h-5 text-brand-600" />;
      case 'intake':
        return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'remaining':
        return <Hourglass className="w-5 h-5 text-indigo-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-brand-600" />;
    }
  };

  const getThemeStyles = () => {
    switch (color) {
      case 'sky':
        return {
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-100',
          iconBg: 'bg-sky-100/60'
        };
      case 'indigo':
        return {
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
          iconBg: 'bg-indigo-100/60'
        };
      default:
        return {
          badgeBg: 'bg-brand-50 text-brand-700 border-brand-100',
          iconBg: 'bg-brand-100/60'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${styles.iconBg}`}>
          {getIcon()}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
          {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
        </span>
        <span className="text-xs font-semibold text-slate-400">{unit}</span>
      </div>

      {subtitle && (
        <p className="text-xs text-slate-500 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
