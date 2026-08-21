'use client';

import { useState } from 'react';

const stats = [
  { label: 'Total Credentials', value: '27' },
  { label: 'Shared This Month', value: '45' },
  { label: 'Verification Rate', value: '98%' },
];

const entities = [
  'Credential Vault',
  'Blockchain Verify',
  'Share Portal',
  'Issuer Registry',
  'Trust Network',
  'Audit Trail',
];

export default function CredentialsPage() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Credentials</h1>
        <button
          key={key}
          onClick={() => setKey((k) => k + 1)}
          className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white active:bg-pink-700"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold text-pink-600">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Credential Entities</h2>
        <ul className="space-y-2">
          {entities.map((e) => (
            <li key={e} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
