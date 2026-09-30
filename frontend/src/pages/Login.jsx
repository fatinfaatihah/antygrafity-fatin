import React, { useState } from 'react';
import { Droplets, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('fatin@kimiwater.app');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Harap isi email dan kata sandi!');
      return;
    }
    login(email, password);
  };

  const handleDemoLogin = () => {
    login('fatin@kimiwater.app', 'demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-sky-50">
      {/* Container */}
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white shadow-xl shadow-brand-500/30 mb-4 animate-bounce">
            <Droplets className="w-9 h-9" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-2xl font-black tracking-tight text-slate-800">
            <span>KIMI</span>
            <span className="text-brand-600">WATER</span>
            <span>💧</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Aplikasi Pemantau & Jadwal Minum Air Pribadi
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-brand-100 shadow-xl shadow-brand-500/5">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-800">Selamat Datang Kembali! 👋</h2>
            <p className="text-xs text-slate-400 mt-0.5">Masuk untuk melihat progres hidrasimu hari ini</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email:
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm font-medium text-slate-800"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm font-medium text-slate-800"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 active:scale-98 transition flex items-center justify-center gap-2 mt-2"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Masuk Cepat Sebagai Demo User</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="text-center mt-5 text-xs text-slate-500">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-bold text-brand-600 hover:underline cursor-pointer"
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>

        {/* Feature Highlights Footer */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[11px] font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" /> Target Air Otomatis
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" /> Pengingat Terjadwal
          </span>
        </div>
      </div>
    </div>
  );
};
