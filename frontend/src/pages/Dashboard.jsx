import React from 'react';
import { Plus, Sparkles, TrendingUp } from 'lucide-react';
import { useWater } from '../context/WaterContext';
import { MetricCard } from '../components/dashboard/MetricCard';
import { WaterProgressIndicator } from '../components/dashboard/WaterProgressIndicator';
import { NextReminderCard } from '../components/dashboard/NextReminderCard';
import { QuickAdd } from '../components/dashboard/QuickAdd';
import { TodayScheduleList } from '../components/dashboard/TodayScheduleList';

export const Dashboard = ({ onOpenAddModal, onNavigate }) => {
  const { 
    dailyGoal, 
    currentIntake, 
    remainingWater, 
    progressPercentage 
  } = useWater();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Hydration Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Target Harian"
          value={dailyGoal}
          unit="ml"
          subtitle="Kebutuhan ideal harianmu"
          iconType="goal"
          color="blue"
        />
        <MetricCard
          title="Sudah Diminum"
          value={currentIntake}
          unit="ml"
          subtitle={`${progressPercentage}% dari target tercapai`}
          iconType="intake"
          color="sky"
        />
        <MetricCard
          title="Sisa Air"
          value={remainingWater}
          unit="ml"
          subtitle={remainingWater === 0 ? "Target hari ini beres!" : "Perlu diminum hari ini"}
          iconType="remaining"
          color="indigo"
        />
      </div>

      {/* Main Hydration Visual & Next Reminder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive Circular Water Wave */}
        <div className="lg:col-span-5 flex">
          <div className="w-full">
            <WaterProgressIndicator
              currentIntake={currentIntake}
              dailyGoal={dailyGoal}
              progressPercentage={progressPercentage}
            />
          </div>
        </div>

        {/* Right: Next Reminder & Quick Add Section */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <NextReminderCard onOpenAddModal={onOpenAddModal} />
          <QuickAdd onOpenCustomModal={onOpenAddModal} />
        </div>
      </div>

      {/* Today's Schedule Overview */}
      <TodayScheduleList onNavigateToSchedule={() => onNavigate('schedule')} />
    </div>
  );
};
