'use client';

import React, { useState, useCallback } from 'react';

const ENTITIES = [
  { id: '1', name: 'EducationWallet', description: 'Student education fund wallet', status: 'active', totalBalance: '1,250,000 XOF' },
  { id: '2', name: 'WalletCredits', description: 'Credit-based payment system', status: 'active', totalCredits: '45,200' },
  { id: '3', name: 'Scholarship', description: 'Merit-based scholarship management', status: 'active', totalSchemes: 8 },
];

const getStatValue = (item: typeof ENTITIES[0]) => {
  if ('totalBalance' in item) return item.totalBalance;
  if ('totalCredits' in item) return item.totalCredits;
  if ('totalSchemes' in item) return `${item.totalSchemes} schemes`;
  return '—';
};

export default function WalletScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [data] = useState(ENTITIES);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Education Wallet</h1>
        <p className="text-sm text-gray-500 mt-1">EducationWallet · WalletCredits · Scholarship</p>
      </div>
      <div className="mx-4 mb-4 bg-blue-600 rounded-2xl p-6 text-center shadow-md">
        <p className="text-sm text-white/80">Total Wallet Balance</p>
        <p className="text-3xl font-extrabold text-white mt-1">1,250,000 XOF</p>
        <p className="text-xs text-white/60 mt-1">Across 2,450 student wallets</p>
      </div>
      <button onClick={onRefresh} disabled={refreshing} className="w-full px-4 pb-2 text-right">
        <span className="text-xs text-blue-600">{refreshing ? 'Refreshing...' : 'Pull to refresh'}</span>
      </button>
      <div className="px-4 space-y-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">{item.name}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <p className="text-xs text-blue-600 mt-2 font-semibold">{getStatValue(item)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
