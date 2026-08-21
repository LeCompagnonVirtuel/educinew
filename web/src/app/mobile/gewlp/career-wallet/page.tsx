'use client';

import { useState } from 'react';

const stats = [
  { label: 'Total Credentials', value: '23' },
  { label: 'Share Count', value: '156' },
  { label: 'Validity Rate', value: '100%' },
];

const entities = [
  'Digital Certificates',
  'Achievement Tokens',
  'Skill Tokens',
  'Credential Sharing',
  'Validity Checker',
  'Export Manager',
];

export default function CareerWalletPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Career Wallet</h1>
        <button
          key={key}
          onClick={() => setKey((k) => k + 1)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white active:bg-violet-700"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold text-violet-600">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Wallet Entities</h2>
        <ul className="space-y-2">
          {entities.map((e) => (
            <li key={e} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
