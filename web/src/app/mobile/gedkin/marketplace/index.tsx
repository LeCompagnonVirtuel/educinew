'use client';

import { useState, useCallback } from 'react';
import { useMarketplaceProducts, useSubscriptions, useProductReviews } from '@/features/gedkin/hooks';

interface MarketplaceProduct {
  id: string;
  name: string;
  provider: string;
  category: string;
  price_per_month: number;
  rating: number;
  subscribers: number;
  status: string;
}

const FALLBACK_PRODUCTS: MarketplaceProduct[] = [
  { id: '1', name: 'Student Analytics Suite', provider: 'EduMetrics', category: 'Analytics', price_per_month: 49, rating: 4.7, subscribers: 128, status: 'active' },
  { id: '2', name: 'Smart Attendance AI', provider: 'AttendanceIQ', category: 'Automation', price_per_month: 29, rating: 4.5, subscribers: 256, status: 'active' },
  { id: '3', name: 'Fee Management Pro', provider: 'FinEdu', category: 'Financial', price_per_month: 39, rating: 4.3, subscribers: 89, status: 'active' },
  { id: '4', name: 'Teacher Performance Hub', provider: 'TeachInsight', category: 'HR', price_per_month: 59, rating: 4.8, subscribers: 67, status: 'active' },
  { id: '5', name: 'Parent Communication Portal', provider: 'ConnectEdu', category: 'Communication', price_per_month: 19, rating: 4.1, subscribers: 342, status: 'active' },
];

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Analytics': return 'text-blue-600 bg-blue-50';
    case 'Automation': return 'text-green-600 bg-green-50';
    case 'Financial': return 'text-yellow-600 bg-yellow-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'Communication': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function MarketplacePage() {
  const [refreshing, setRefreshing] = useState(false);
  const productsQuery = useMarketplaceProducts('current-school');
  const subscriptionsQuery = useSubscriptions('current-school');
  const reviewsQuery = useProductReviews('current-school');

  const isLoading = productsQuery.isLoading || subscriptionsQuery.isLoading || reviewsQuery.isLoading;
  const hasError = productsQuery.error || subscriptionsQuery.error || reviewsQuery.error;

  const products = productsQuery.data?.data ?? FALLBACK_PRODUCTS;
  const totalSubscriptions = subscriptionsQuery.data?.total ?? 12;
  const totalReviews = reviewsQuery.data?.total ?? 45;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([productsQuery.refetch(), subscriptionsQuery.refetch(), reviewsQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [productsQuery, subscriptionsQuery, reviewsQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load marketplace</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching marketplace data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Marketplace</h1>
          <p className="text-sm text-gray-500">{products.length} products available</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{products.length}</p>
          <p className="text-xs text-gray-500">Products</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalSubscriptions}</p>
          <p className="text-xs text-gray-500">Subscriptions</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{totalReviews}</p>
          <p className="text-xs text-gray-500">Reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Available Products</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {products.map((product) => (
            <div key={product.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{product.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">by {product.provider}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="text-yellow-500 font-semibold">
                  {'\u2605'} {product.rating.toFixed(1)}
                </span>
                <span>&middot;</span>
                <span>{product.subscribers} subscribers</span>
                <span>&middot;</span>
                <span className="font-bold text-gray-900">${product.price_per_month}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
