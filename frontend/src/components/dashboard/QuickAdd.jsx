import React, { useState } from 'react';
import { Plus, Check, Droplets } from 'lucide-react';
import { useWater } from '../../context/WaterContext';

export const QuickAdd = ({ onOpenCustomModal }) => {
  const { addWaterIntake } = useWater();
  const [successToast, setSuccessToast] = useState(null);

  const quickAmounts = [
    { amount: 150, label: '150 ml', sub: 'Cangkir kecil' },
    { amount: 250, label: '250 ml', sub: 'Gelas standar' },
    { amount: 350, label: '350 ml', sub: 'Gelas besar' },
    { amount: 500, label: '500 ml', sub: 'Botol sedang' },
  ];

  const handleQuickAdd = (amount) => {
    const res = addWaterIntake(amount, `Quick Add ${amount} ml`);
    if (res.success) {
      setSuccessToast(`+${amount} ml berhasil dicatat! 💧`);
      setTimeout(() => setSuccessToast(null), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm md:text-base">Catat Cepat Minum</h3>
          <p className="text-xs text-slate-400">Pilih takaran air untuk langsung menambahkan</p>
        </div>

        <button
          onClick={onOpenCustomModal}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Jumlah Kustom</span>
        </button>
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickAmounts.map(({ amount, label, sub }) => (
          <button
            key={amount}
            onClick={() => handleQuickAdd(amount)}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-brand-100/80 bg-brand-50/40 hover:bg-brand-50 hover:border-brand-300 active:scale-95 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-full bg-white text-brand-600 flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-110 transition-transform">
              <Droplets className="w-4 h-4 text-brand-500" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-brand-700">
              +{label}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">{sub}</span>
          </button>
        ))}
      </div>

      {/* Floating Success Toast */}
      {successToast && (
        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 animate-fade-in z-20">
          <Check className="w-3.5 h-3.5" />
          <span>{successToast}</span>
        </div>
      )}
    </div>
  );
};
