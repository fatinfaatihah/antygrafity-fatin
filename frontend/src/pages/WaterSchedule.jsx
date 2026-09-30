import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Circle, 
  Droplet, 
  Clock, 
  X,
  AlertCircle
} from 'lucide-react';
import { useWater } from '../context/WaterContext';

export const WaterSchedule = () => {
  const { 
    schedules, 
    addSchedule, 
    editSchedule, 
    deleteSchedule, 
    toggleScheduleCompleted 
  } = useWater();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [time, setTime] = useState('08:00');
  const [amount, setAmount] = useState('250');
  const [label, setLabel] = useState('Jadwal Minum');
  const [error, setError] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTime('08:00');
    setAmount('250');
    setLabel('Jadwal Minum');
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sched) => {
    setEditingId(sched.id);
    setTime(sched.time);
    setAmount(String(sched.amount));
    setLabel(sched.label);
    setError('');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError('');

    const parsed = parseInt(amount, 10);
    if (!time || isNaN(parsed) || parsed <= 0) {
      setError('Harap isi jam dan jumlah air yang valid!');
      return;
    }

    if (editingId) {
      editSchedule(editingId, { time, amount: parsed, label });
    } else {
      addSchedule(time, parsed, label);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Hapus jadwal minum ini?')) {
      deleteSchedule(id);
    }
  };

  // Sort schedules by time
  const sortedSchedules = [...schedules].sort((a, b) => a.time.localeCompare(b.time));
  const completedCount = sortedSchedules.filter(s => s.completed).length;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-brand-600" />
            <h2 className="text-xl font-extrabold text-slate-800">Jadwal Minum Air ⏰</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Atur pengingat minum teratur agar hidrasi harianmu tetap terjaga.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Jadwal</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between bg-brand-50/70 border border-brand-100 rounded-2xl px-5 py-3 text-xs font-medium text-slate-600">
        <span>Progress Jadwal Hari Ini:</span>
        <span className="font-bold text-brand-700">
          {completedCount} dari {sortedSchedules.length} Selesai ({sortedSchedules.length > 0 ? Math.round((completedCount / sortedSchedules.length) * 100) : 0}%)
        </span>
      </div>

      {/* Schedule List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedSchedules.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleScheduleCompleted(item.id, true)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
              item.completed
                ? 'bg-slate-50/70 border-slate-200 opacity-80'
                : 'bg-white border-brand-100 hover:border-brand-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                className="text-slate-400 hover:text-brand-600 transition"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 hover:text-brand-500" />
                )}
              </button>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-base font-extrabold ${item.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {item.time}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">WIB</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{item.label}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl">
                <Droplet className="w-3.5 h-3.5 fill-current" />
                <span>{item.amount} ml</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(item);
                }}
                className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                title="Edit Jadwal"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => handleDelete(item.id, e)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                title="Hapus Jadwal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-brand-100 relative animate-scale-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-800 mb-1">
              {editingId ? 'Edit Jadwal Minum' : 'Tambah Jadwal Minum'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Tentukan jam dan rekomendasi takaran air minum.
            </p>

            {error && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Waktu (Jam : Menit):
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-500 font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Rekomendasi Air (ml):
                </label>
                <input
                  type="number"
                  min="50"
                  max="2000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="250"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-500 font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Keterangan / Label:
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Misal: Pagi hari, Sebelum istirahat"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-brand-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
