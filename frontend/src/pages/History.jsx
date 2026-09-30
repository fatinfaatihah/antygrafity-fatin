import React, { useState, useMemo } from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  Calendar, 
  Filter, 
  Droplet, 
  ArrowUpDown, 
  Plus
} from 'lucide-react';
import { useWater } from '../context/WaterContext';

export const History = ({ onNavigate }) => {
  const { intakes, deleteWaterIntake, todayStr } = useWater();
  const [selectedDate, setSelectedDate] = useState(''); // empty means all or pick specific
  const [sortOrder, setSortOrder] = useState('newest'); // newest | oldest

  // Filter and sort history
  const filteredRecords = useMemo(() => {
    let list = [...intakes];

    if (selectedDate) {
      list = list.filter(item => item.date === selectedDate);
    }

    list.sort((a, b) => {
      const dateTimeA = `${a.date}T${a.time}`;
      const dateTimeB = `${b.date}T${b.time}`;
      return sortOrder === 'newest' 
        ? dateTimeB.localeCompare(dateTimeA)
        : dateTimeA.localeCompare(dateTimeB);
    });

    return list;
  }, [intakes, selectedDate, sortOrder]);

  // Calculate daily total for the viewed scope
  const totalAmount = useMemo(() => {
    return filteredRecords.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [filteredRecords]);

  // Unique available dates for quick filtering
  const availableDates = useMemo(() => {
    const dates = Array.from(new Set(intakes.map(item => item.date)));
    dates.sort((a, b) => b.localeCompare(a));
    return dates;
  }, [intakes]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Hapus catatan minum air ini? Total harian akan dihitung ulang secara otomatis.')) {
      deleteWaterIntake(id);
    }
  };

  const formatDateDisplay = (dateStr) => {
    if (dateStr === todayStr) return 'Hari Ini';
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-brand-600" />
            <h2 className="text-xl font-extrabold text-slate-800">Riwayat Minum Air 📊</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pantau catatan hidrasimu berdasarkan waktu dan tanggal.
          </p>
        </div>

        <button
          onClick={() => onNavigate('add-water')}
          className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Catatan</span>
        </button>
      </div>

      {/* Filter and Summary Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="">Semua Tanggal</option>
              <option value={todayStr}>Hari Ini ({todayStr})</option>
              {availableDates.filter(d => d !== todayStr).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-2xl transition"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>{sortOrder === 'newest' ? 'Terbaru ke Terlama' : 'Terlama ke Terbaru'}</span>
          </button>
        </div>

        {/* Dynamic Total Sum Card */}
        <div className="flex items-center gap-2 bg-brand-50 border border-brand-100 px-4 py-2 rounded-2xl self-start md:self-auto">
          <span className="text-xs font-medium text-slate-600">Total Periode Ini:</span>
          <span className="text-sm font-extrabold text-brand-700">
            {totalAmount.toLocaleString('id-ID')} ml
          </span>
        </div>
      </div>

      {/* History Records List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
        {filteredRecords.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">Belum Ada Catatan</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Belum ada riwayat minum pada tanggal yang dipilih.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredRecords.map((item) => (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-brand-50/30 px-3 rounded-2xl transition group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shadow-xs">
                    <Droplet className="w-5 h-5 fill-brand-400" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-800">
                        {item.amount} ml
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-brand-600">
                        {item.time} WIB
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <span className="font-medium">{formatDateDisplay(item.date)}</span>
                      <span>—</span>
                      <span className="italic text-slate-400 truncate max-w-[200px]">{item.note || 'Minum air'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  title="Hapus Catatan"
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-80 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
