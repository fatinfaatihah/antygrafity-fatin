import React, { useState } from 'react';
import { Droplets, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Semua kolom wajib diisi!');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter demi keamanan!');
      return;
    }
    register(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white shadow-xl shadow-brand-500/30 mb-4">
            <Droplets className="w-9 h-9" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-2xl font-black tracking-tight text-slate-800">
            <span>KIMI</span>
            <span className="text-brand-600">WATER</span>
            <span>💧</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Mulai Kebiasaan Minum Air yang Lebih Sehat
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-brand-100 shadow-xl shadow-brand-500/5">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-800">Buat Akun Baru 🚀</h2>
            <p className="text-xs text-slate-400 mt-0.5">Daftar gratis untuk mulai melacak hidrasi harianmu</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Fatin Ashari"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm font-medium text-slate-800"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email:
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
                  placeholder="Minimal 6 karakter"
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
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center mt-6 text-xs text-slate-500">
            Sudah memiliki akun?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-bold text-brand-600 hover:underline cursor-pointer"
            >
              Masuk di Sini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
