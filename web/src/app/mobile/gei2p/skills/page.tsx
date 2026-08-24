'use client';

import { useMobileApi } from '@/hooks/useMobileApi';

interface SkillItem {
  id?: string | number;
  name?: string;
  title?: string;
  status?: string;
  category?: string;
  level?: string;
  certified?: boolean;
  [key: string]: unknown;
}

function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-9 w-20 bg-gray-200 rounded-lg" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="h-5 w-12 bg-gray-200 rounded mb-2 mx-auto" />
            <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="h-4 w-16 bg-gray-200 rounded m-3" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 border-b last:border-0">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-40 bg-gray-100 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsPassportPage() {
  const { data, loading, error, refresh } = useMobileApi<SkillItem>({
    endpoint: '/api/interoperability/skills',
  });

  if (loading) return <Skeleton />;

  const stats = data.slice(0, 3).map((item) => ({
    label: (item.name ?? item.title ?? 'Item') as string,
    value: (item.count ?? item.total ?? item.value ?? '-') as string | number,
  }));

  const entities = data.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Skills Passport</h1>
        <button
          onClick={() => refresh()}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-lg font-bold text-gray-900">{String(stat.value)}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 border-b font-medium text-gray-700">Skills</div>
        {entities.map((entity, i) => (
          <div key={entity.id ?? i} className="flex items-center justify-between p-3 border-b last:border-0">
            <div>
              <div className="font-medium text-gray-900">{(entity.name ?? entity.title ?? 'Untitled') as string}</div>
              <div className="text-xs text-gray-500">{entity.category ?? ''} {entity.level ? `• ${entity.level}` : ''}</div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              entity.certified || entity.status === 'certified' || entity.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {entity.certified ? 'Certified' : entity.status ?? 'In Progress'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
