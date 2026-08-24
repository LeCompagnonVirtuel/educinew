'use client'

import { useMobileApi } from '@/hooks/useMobileApi'

interface WalletItem {
  id: number
  name: string
  description: string
  status: string
  totalBalance?: string
  totalCredits?: string
  totalSchemes?: number
}

const getStatValue = (item: WalletItem) => {
  if (item.totalBalance) return item.totalBalance
  if (item.totalCredits) return item.totalCredits
  if (item.totalSchemes != null) return `${item.totalSchemes} schemes`
  return '—'
}

export default function WalletScreen() {
  const { data, loading, error, refresh } = useMobileApi<WalletItem>({
    endpoint: '/api/wallets/engine/wallets',
  })

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Education Wallet</h1>
        <p className="text-sm text-gray-500 mt-1">
          {loading ? 'Loading...' : data.map((d) => d.name).join(' · ') || 'No data'}
        </p>
      </div>

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
      )}

      <div className="mx-4 mb-4 bg-blue-600 rounded-2xl p-6 text-center shadow-md">
        <p className="text-sm text-white/80">Total Wallet Balance</p>
        {loading ? (
          <div className="h-9 bg-white/20 rounded w-40 mx-auto mt-1 animate-pulse" />
        ) : (
          <p className="text-3xl font-extrabold text-white mt-1">
            {data.find((d) => d.totalBalance)?.totalBalance ?? '—'}
          </p>
        )}
        <p className="text-xs text-white/60 mt-1">Across wallets</p>
      </div>

      <button onClick={refresh} disabled={loading} className="w-full px-4 pb-2 text-right">
        <span className="text-xs text-blue-600">{loading ? 'Refreshing...' : 'Pull to refresh'}</span>
      </button>

      <div className="px-4 space-y-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="w-2.5 h-2.5 bg-gray-200 rounded-full" />
                </div>
                <div className="h-3 bg-gray-200 rounded w-full mt-2" />
                <div className="h-3 bg-gray-200 rounded w-20 mt-2" />
              </div>
            ))
          : data.map((item) => (
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
  )
}
