'use client';

import React, { useState, useCallback } from 'react';

const ENTITIES = [
  { id: '1', name: 'MarketplaceProduct', description: 'Physical and digital education products', status: 'listed', count: 342 },
  { id: '2', name: 'MarketplaceCourse', description: 'Online courses and learning materials', status: 'listed', count: 89 },
];

export default function MarketplaceScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [data] = useState(ENTITIES);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Enterprise Marketplace</h1>
        <p className="text-sm text-gray-500 mt-1">MarketplaceProduct · MarketplaceCourse</p>
      </div>
      <div className="flex mx-4 mb-4 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex-1 text-center">
          <div className="text-xl font-extrabold text-blue-600">{data[0].count}</div>
          <div className="text-xs text-gray-500 mt-1">Products</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-xl font-extrabold text-blue-600">{data[1].count}</div>
          <div className="text-xs text-gray-500 mt-1">Courses</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-xl font-extrabold text-green-500">1,247</div>
          <div className="text-xs text-gray-500 mt-1">Sales</div>
        </div>
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
            <p className="text-xs text-blue-600 mt-2 font-semibold">{item.count} listed items</p>
          </div>
        ))}
      </div>
    </div>
  );
}
