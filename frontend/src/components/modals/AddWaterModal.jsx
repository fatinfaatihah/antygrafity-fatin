import React, { useState } from 'react';
import { X, Droplets, Clock, FileText, Check } from 'lucide-react';
import { useWater } from '../../context/WaterContext';

export const AddWaterModal = ({ isOpen, onClose }) => {
  const { addWaterIntake } = useWater();
  const [amount, setAmount] = useState('250');
  const [note, setNote] = useState('Air Mineral');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const quickPicks = [150, 250, 350, 500, 600];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const parsed = parseInt(amount, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Masukkan jumlah air yang valid (lebih dari 0 ml)!');
      return;
    }

    if (parsed > 5000) {
      setError('Takaran sekali minum maksimal 5000 ml demi kesehatan.');
      return;
    }

    const res = addWaterIntake(parsed, note);
    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 700);
    } else {
      setError(res.message || 'Gagal menambahkan data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-brand-100 relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shadow-xs">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">Catat Minum Air</h3>
            <p className="text-xs text-slate-400">Tambahkan jumlah air yang baru saja kamu minum</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <p className="text-base font-bold text-slate-800">Berhasil Dicatat! 💧</p>
            <p className="text-xs text-slate-400 mt-1">Hidrasi harianmu berhasil diperbarui.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quick Pick Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Pilih Cepat Takaran:
              </label>
              <div className="flex flex-wrap gap-2">
                {quickPicks.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(String(q))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      amount === String(q)
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                    }`}
                  >
                    {q} ml
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Jumlah Air (ml):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="250"
                  required
                  className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-slate-800 font-bold text-lg"
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">
                  ml
                </span>
              </div>
            </div>

            {/* Note Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Catatan (Opsional):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Air mineral, Air kelapa, Teh hangat"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-slate-800 text-xs"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs text-slate-600 hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 active:scale-95 transition"
              >
                Simpan Minum
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
