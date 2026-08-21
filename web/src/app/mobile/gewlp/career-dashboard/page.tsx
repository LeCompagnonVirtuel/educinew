'use client';

import { useState } from 'react';

const stats = [
  { label: 'Active Paths', value: '12' },
  { label: 'Skills Mastered', value: '84' },
  { label: 'Career Score', value: '87%' },
];

const entities = [
  'Career Overview',
  'Skill Radar',
  'Goal Tracker',
  'Milestone Timeline',
  'Achievement Badges',
  'Recommendation Feed',
];

export default function CareerDashboardPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Career Dashboard</h1>
        <button
          key={key}
          onClick={() => setKey((k) => k + 1)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white active:bg-indigo-700"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold text-indigo-600">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Career Entities</h2>
        <ul className="space-y-2">
          {entities.map((e) => (
            <li key={e} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
