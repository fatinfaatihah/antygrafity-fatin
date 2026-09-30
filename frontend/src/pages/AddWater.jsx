import React, { useState } from 'react';
import { PlusCircle, Droplets, Check, AlertCircle, Sparkles, Clock, Calendar } from 'lucide-react';
import { useWater } from '../context/WaterContext';

export const AddWater = ({ onNavigate }) => {
  const { addWaterIntake, currentIntake, dailyGoal, remainingWater } = useWater();
  const [amount, setAmount] = useState('250');
  const [note, setNote] = useState('Air Mineral');
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const quickPicks = [
    { ml: 150, title: 'Cangkir Kecil', icon: '☕' },
    { ml: 250, title: 'Gelas Standar', icon: '🥛' },
    { ml: 350, title: 'Gelas Besar', icon: '🥤' },
    { ml: 500, title: 'Botol Sedang', icon: '🍶' },
    { ml: 600, title: 'Tumbler Besar', icon: '🧃' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const parsed = parseInt(amount, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Masukkan jumlah air yang valid!');
      return;
    }

    if (parsed > 5000) {
      setError('Jumlah air sekali minum maksimal 5000 ml.');
      return;
    }

    const res = addWaterIntake(parsed, note, time);
    if (res.success) {
      setSuccessMsg(`Berhasil menambahkan ${parsed} ml air! 💧`);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 1200);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-xs flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center">
          <PlusCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Catat Minum Air 💧</h2>
          <p className="text-xs text-slate-400">Pilih takaran cepat atau masukkan jumlah kustom.</p>
        </div>
      </div>

      {/* Progress Glance */}
      <div className="bg-gradient-to-r from-brand-600 to-sky-500 rounded-3xl p-5 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-100 uppercase tracking-wider">Status Hidrasi Hari Ini</span>
          <div className="text-2xl font-extrabold tracking-tight mt-0.5">
            {currentIntake} <span className="text-sm font-medium text-brand-100">/ {dailyGoal} ml</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-brand-100 uppercase tracking-wider">Sisa Kebutuhan</span>
          <div className="text-xl font-bold">{remainingWater} ml</div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-100 shadow-xs">
        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-bold flex items-center gap-2 border border-emerald-200 animate-fade-in">
            <Check className="w-5 h-5" />
            <span>{successMsg} Mengarahkan ke Dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Pilihan Takaran Cepat:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickPicks.map((p) => (
                <button
                  key={p.ml}
                  type="button"
                  onClick={() => setAmount(String(p.ml))}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                    amount === String(p.ml)
                      ? 'border-brand-600 bg-brand-50/80 ring-2 ring-brand-200'
                      : 'border-slate-100 hover:border-brand-200 bg-slate-50/50'
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className="text-sm font-extrabold text-slate-800">{p.ml} ml</div>
                    <div className="text-[11px] text-slate-400">{p.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Takaran Air Minum:
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-4 pr-16 py-3.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-slate-800 font-extrabold text-xl"
              />
              <span className="absolute right-5 top-4 font-bold text-slate-400 text-sm">
                ml
              </span>
            </div>
          </div>

          {/* Time & Note Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Waktu Minum:
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 text-sm font-semibold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Keterangan / Catatan:
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: Air mineral dingin"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 text-sm text-slate-700"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="w-1/3 py-3 rounded-2xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50 transition"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 active:scale-95 transition"
            >
              Simpan Minum Air 💧
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
