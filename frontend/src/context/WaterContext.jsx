import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialIntakeHistory, initialSchedules } from '../data/demoData';
import { useAuth } from './AuthContext';

const WaterContext = createContext(null);

export const WaterProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();

  // Daily goal from user or default 2000 ml
  const dailyGoal = user?.dailyGoal || 2000;

  // Intakes list initialized from localStorage or demo data
  const [intakes, setIntakes] = useState(() => {
    const saved = localStorage.getItem('kimi_water_intakes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialIntakeHistory; }
    }
    return initialIntakeHistory;
  });

  // Schedules list initialized from localStorage or demo data
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem('kimi_water_schedules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialSchedules; }
    }
    return initialSchedules;
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('kimi_water_intakes', JSON.stringify(intakes));
  }, [intakes]);

  useEffect(() => {
    localStorage.setItem('kimi_water_schedules', JSON.stringify(schedules));
  }, [schedules]);

  // Today's date in YYYY-MM-DD format
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Filter today's intakes
  const todayIntakes = useMemo(() => {
    return intakes.filter(item => item.date === todayStr);
  }, [intakes, todayStr]);

  // Current water intake sum
  const currentIntake = useMemo(() => {
    return todayIntakes.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  }, [todayIntakes]);

  // Remaining water (never negative)
  const remainingWater = useMemo(() => {
    return Math.max(0, dailyGoal - currentIntake);
  }, [dailyGoal, currentIntake]);

  // Progress percentage (rounded to 1 decimal place, safe check)
  const progressPercentage = useMemo(() => {
    if (dailyGoal <= 0) return 0;
    const pct = (currentIntake / dailyGoal) * 100;
    return Math.round(pct * 10) / 10;
  }, [currentIntake, dailyGoal]);

  // Next drinking reminder calculation
  const nextReminder = useMemo(() => {
    if (!schedules || schedules.length === 0) return null;

    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;

    // Sort schedules ascending by time
    const sorted = [...schedules].sort((a, b) => a.time.localeCompare(b.time));

    // First, find the first upcoming uncompleted schedule today
    const upcoming = sorted.find(s => !s.completed && s.time >= currentTimeStr);
    if (upcoming) return { ...upcoming, isToday: true, isPastDue: false };

    // Next, find any uncompleted schedule from earlier today that was missed
    const missed = sorted.find(s => !s.completed);
    if (missed) return { ...missed, isToday: true, isPastDue: true };

    // If all completed today, return the first one for tomorrow morning
    if (sorted.length > 0) {
      return { ...sorted[0], isTomorrow: true, isPastDue: false };
    }

    return null;
  }, [schedules]);

  // Add water intake
  const addWaterIntake = (amount, note = "Minum Air", customTime = null, customDate = null) => {
    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return { success: false, message: "Jumlah air harus berupa angka positif!" };
    }

    const now = new Date();
    const timeStr = customTime || `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = customDate || todayStr;

    const newRecord = {
      id: Date.now(),
      userId: user?.id || 1,
      amount: parsedAmount,
      date: dateStr,
      time: timeStr,
      note: note.trim() || "Minum Air"
    };

    setIntakes(prev => [newRecord, ...prev]);

    // Check if any scheduled reminder matches closely to mark it complete
    return { success: true, record: newRecord };
  };

  // Delete water intake
  const deleteWaterIntake = (id) => {
    setIntakes(prev => prev.filter(item => item.id !== id));
    return { success: true };
  };

  // Update daily goal
  const updateDailyGoal = (newGoal) => {
    const goalVal = parseInt(newGoal, 10);
    if (!isNaN(goalVal) && goalVal > 0) {
      updateUserProfile({ dailyGoal: goalVal });
      return true;
    }
    return false;
  };

  // Schedule management methods
  const addSchedule = (time, amount, label = "Jadwal Minum") => {
    const parsedAmount = parseInt(amount, 10);
    if (!time || isNaN(parsedAmount) || parsedAmount <= 0) {
      return { success: false, message: "Waktu dan takaran air harus valid!" };
    }

    const newSchedule = {
      id: Date.now(),
      userId: user?.id || 1,
      time,
      amount: parsedAmount,
      completed: false,
      label: label.trim() || "Jadwal Minum"
    };

    setSchedules(prev => [...prev, newSchedule]);
    return { success: true, schedule: newSchedule };
  };

  const editSchedule = (id, updatedFields) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          ...updatedFields,
          amount: updatedFields.amount ? parseInt(updatedFields.amount, 10) : s.amount
        };
      }
      return s;
    }));
    return { success: true };
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    return { success: true };
  };

  const toggleScheduleCompleted = (id, autoAddIntake = true) => {
    let target = null;
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        target = s;
        return { ...s, completed: !s.completed };
      }
      return s;
    }));

    // If marked as completed and autoAddIntake is requested, add intake automatically
    if (target && !target.completed && autoAddIntake) {
      addWaterIntake(target.amount, `Jadwal ${target.time} - ${target.label}`);
    }

    return { success: true };
  };

  return (
    <WaterContext.Provider value={{
      dailyGoal,
      updateDailyGoal,
      intakes,
      todayIntakes,
      currentIntake,
      remainingWater,
      progressPercentage,
      schedules,
      nextReminder,
      addWaterIntake,
      deleteWaterIntake,
      addSchedule,
      editSchedule,
      deleteSchedule,
      toggleScheduleCompleted,
      todayStr
    }}>
      {children}
    </WaterContext.Provider>
  );
};

export const useWater = () => {
  const context = useContext(WaterContext);
  if (!context) {
    throw new Error('useWater must be used within a WaterProvider');
  }
  return context;
};
