'use client';

import { useState } from 'react';

const stats = [
  { label: 'Active Courses', value: '6' },
  { label: 'Hours Completed', value: '142' },
  { label: 'Path Progress', value: '68%' },
];

const entities = [
  'Course Modules',
  'Learning Objectives',
  'Progress Tracker',
  'Assignment Queue',
  'Mentor Connect',
  'Peer Study Groups',
];

export default function LearningPathPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Learning Path</h1>
        <button
          key={key}
          onClick={() => setKey((k) => k + 1)}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white active:bg-teal-700"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold text-teal-600">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Learning Entities</h2>
        <ul className="space-y-2">
          {entities.map((e) => (
            <li key={e} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
