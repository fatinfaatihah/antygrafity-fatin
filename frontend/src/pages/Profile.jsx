import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Target, 
  ShieldCheck, 
  LogOut, 
  Check, 
  Calculator,
  Droplets,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWater } from '../context/WaterContext';

export const Profile = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const { dailyGoal, updateDailyGoal } = useWater();

  const [name, setName] = useState(user?.name || '');
  const [goal, setGoal] = useState(String(dailyGoal || 2000));
  const [weight, setWeight] = useState(String(user?.weight || 60));
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Recommended water intake based on body weight formula (Weight kg * 35 ml)
  const calculatedRecommendedIntake = Math.round(Number(weight || 60) * 35);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const newGoal = parseInt(goal, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      updateDailyGoal(newGoal);
      updateUserProfile({
        name,
        weight: Number(weight) || 60,
        dailyGoal: newGoal
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleApplyRecommended = () => {
    setGoal(String(calculatedRecommendedIntake));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-brand-500/20">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">{name || 'Pengguna'}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{user?.email || 'fatin@kimiwater.app'}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200 px-2.5 py-0.5 rounded-full">
              Akun Aktif
            </span>
            <span className="text-[10px] text-slate-400">
              Bergabung sejak {user?.joinedDate || '2026'}
            </span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Pengaturan profil dan target hidrasi berhasil disimpan!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-100 shadow-xs">
        <h3 className="font-extrabold text-base text-slate-800 mb-4">Pengaturan Target & Profil</h3>
        
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap:
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 text-sm font-semibold text-slate-800"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Terdaftar:
            </label>
            <div className="relative">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500 cursor-not-allowed"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Weight & Goal Calculation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Berat Badan (kg):
              </label>
              <input
                type="number"
                min="30"
                max="250"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Minum Harian (ml):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  max="6000"
                  step="50"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                  className="w-full pl-4 pr-12 py-2.5 rounded-2xl border border-brand-200 focus:outline-hidden focus:border-brand-500 text-sm font-black text-brand-700 bg-brand-50/30"
                />
                <span className="absolute right-4 top-3 text-xs font-bold text-brand-400">ml</span>
              </div>
            </div>
          </div>

          {/* Smart Recommendation Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-sky-50 border border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Calculator className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800">Rekomendasi Medis (35 ml / kg)</span>
                <p className="text-[11px] text-slate-500">
                  Untuk berat {weight || 60} kg, kebutuhan hidrasimu sekitar <span className="font-bold text-brand-700">{calculatedRecommendedIntake} ml/hari</span>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApplyRecommended}
              className="text-xs font-bold text-brand-700 bg-white hover:bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-xl transition whitespace-nowrap self-start sm:self-auto"
            >
              Gunakan Rekomendasi
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-brand-500/20 active:scale-98 transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Logout Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Keluar dari Sesi</h4>
          <p className="text-xs text-slate-400">Kamu dapat masuk kembali kapan saja.</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-2.5 rounded-xl transition active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </div>
  );
};
