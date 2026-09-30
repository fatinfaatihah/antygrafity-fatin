export const initialUserData = {
  id: 1,
  name: "Fatin Ashari",
  email: "fatin@kimiwater.app",
  dailyGoal: 2000,
  weight: 60,
  activityLevel: "Sedang",
  joinedDate: "2026-09-01"
};

const getTodayDateString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split('T')[0];
};

export const initialIntakeHistory = [
  {
    id: 1,
    userId: 1,
    amount: 250,
    date: getTodayDateString(0),
    time: "08:02",
    note: "Segelas air hangat setelah bangun tidur"
  },
  {
    id: 2,
    userId: 1,
    amount: 250,
    date: getTodayDateString(0),
    time: "09:35",
    note: "Air mineral saat mulai kerja"
  },
  {
    id: 3,
    userId: 1,
    amount: 350,
    date: getTodayDateString(0),
    time: "11:10",
    note: "Air putih sejuk sebelum istirahat"
  },
  // Yesterday's records
  {
    id: 4,
    userId: 1,
    amount: 300,
    date: getTodayDateString(1),
    time: "08:00",
    note: "Air mineral pagi"
  },
  {
    id: 5,
    userId: 1,
    amount: 500,
    date: getTodayDateString(1),
    time: "12:30",
    note: "Makan siang"
  },
  {
    id: 6,
    userId: 1,
    amount: 350,
    date: getTodayDateString(1),
    time: "15:45",
    note: "Sore hari"
  },
  {
    id: 7,
    userId: 1,
    amount: 500,
    date: getTodayDateString(1),
    time: "19:30",
    note: "Makan malam"
  },
  {
    id: 8,
    userId: 1,
    amount: 350,
    date: getTodayDateString(1),
    time: "21:15",
    note: "Sebelum tidur"
  }
];

export const initialSchedules = [
  {
    id: 1,
    userId: 1,
    time: "08:00",
    amount: 250,
    completed: true,
    label: "Bangun Pagi"
  },
  {
    id: 2,
    userId: 1,
    time: "09:30",
    amount: 250,
    completed: true,
    label: "Mulai Aktivitas"
  },
  {
    id: 3,
    userId: 1,
    time: "11:00",
    amount: 250,
    completed: false,
    label: "Menjelang Siang"
  },
  {
    id: 4,
    userId: 1,
    time: "13:00",
    amount: 300,
    completed: false,
    label: "Setelah Makan Siang"
  },
  {
    id: 5,
    userId: 1,
    time: "15:00",
    amount: 250,
    completed: false,
    label: "Selingan Sore"
  },
  {
    id: 6,
    userId: 1,
    time: "17:00",
    amount: 250,
    completed: false,
    label: "Selesai Aktivitas"
  },
  {
    id: 7,
    userId: 1,
    time: "19:00",
    amount: 250,
    completed: false,
    label: "Malam Hari"
  },
  {
    id: 8,
    userId: 1,
    time: "21:00",
    amount: 200,
    completed: false,
    label: "Sebelum Tidur"
  }
];
