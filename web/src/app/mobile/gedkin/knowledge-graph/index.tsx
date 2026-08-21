'use client';

import { useState, useCallback } from 'react';
import { useKnowledgeEntities, useKnowledgeRelations, useGraphTraversal } from '@/features/gedkin/hooks';

interface GraphEntity {
  id: string;
  name: string;
  entity_type: string;
  confidence: number;
}

interface GraphRelation {
  id: string;
  source_id: string;
  target_id: string;
  relation_type: string;
  weight: number;
}

const FALLBACK_ENTITIES: GraphEntity[] = [
  { id: '1', name: 'Student Performance Model', entity_type: 'MODEL', confidence: 0.95 },
  { id: '2', name: 'Fee Collection Process', entity_type: 'PROCESS', confidence: 0.88 },
  { id: '3', name: 'Teacher Evaluation Metric', entity_type: 'METRIC', confidence: 0.91 },
  { id: '4', name: 'Attendance Pattern', entity_type: 'PATTERN', confidence: 0.87 },
  { id: '5', name: 'Exam Results Dataset', entity_type: 'DATASET', confidence: 0.93 },
  { id: '6', name: 'Transport Route Optimization', entity_type: 'PROCESS', confidence: 0.82 },
];

const FALLBACK_RELATIONS: GraphRelation[] = [
  { id: '1', source_id: '1', target_id: '5', relation_type: 'DEPENDS_ON', weight: 0.9 },
  { id: '2', source_id: '1', target_id: '3', relation_type: 'MEASURED_BY', weight: 0.85 },
  { id: '3', source_id: '4', target_id: '1', relation_type: 'INFLUENCES', weight: 0.78 },
  { id: '4', source_id: '2', target_id: '1', relation_type: 'FUNDS', weight: 0.72 },
];

function getEntityTypeColor(type: string): string {
  switch (type) {
    case 'MODEL': return 'text-blue-600 bg-blue-50';
    case 'PROCESS': return 'text-green-600 bg-green-50';
    case 'METRIC': return 'text-purple-600 bg-purple-50';
    case 'PATTERN': return 'text-yellow-600 bg-yellow-50';
    case 'DATASET': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getRelationLabel(type: string): string {
  switch (type) {
    case 'DEPENDS_ON': return 'depends on';
    case 'MEASURED_BY': return 'measured by';
    case 'INFLUENCES': return 'influences';
    case 'FUNDS': return 'funds';
    default: return type.toLowerCase().replace(/_/g, ' ');
  }
}

export default function KnowledgeGraphPage() {
  const [refreshing, setRefreshing] = useState(false);
  const entitiesQuery = useKnowledgeEntities('current-school');
  const relationsQuery = useKnowledgeRelations('current-school');

  const isLoading = entitiesQuery.isLoading || relationsQuery.isLoading;
  const hasError = entitiesQuery.error || relationsQuery.error;

  const entities = entitiesQuery.data?.data ?? FALLBACK_ENTITIES;
  const relations = relationsQuery.data?.data ?? FALLBACK_RELATIONS;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([entitiesQuery.refetch(), relationsQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [entitiesQuery, relationsQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
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
          <p className="text-red-600 font-semibold mb-2">Failed to load knowledge graph</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching graph data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  const density = entities.length > 0 ? (relations.length / entities.length).toFixed(2) : '0';
  const avgConfidence = entities.length > 0
    ? (entities.reduce((sum, e) => sum + e.confidence, 0) / entities.length * 100).toFixed(0)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Knowledge Graph</h1>
          <p className="text-sm text-gray-500">Entities and relations visualization</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{entities.length}</p>
          <p className="text-xs text-gray-500">Entities</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{relations.length}</p>
          <p className="text-xs text-gray-500">Relations</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{density}</p>
          <p className="text-xs text-gray-500">Density</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Entities</h2>
          <p className="text-xs text-gray-500">Avg confidence: {avgConfidence}%</p>
        </div>
        <div className="divide-y divide-gray-50">
          {entities.map((entity) => (
            <div key={entity.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{entity.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEntityTypeColor(entity.entity_type)}`}>
                  {entity.entity_type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Confidence: {(entity.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Relations</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {relations.map((rel) => {
            const source = entities.find((e) => e.id === rel.source_id);
            const target = entities.find((e) => e.id === rel.target_id);
            return (
              <div key={rel.id} className="p-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-gray-700">{source?.name ?? 'Unknown'}</span>
                  <span className="text-gray-400">&rarr;</span>
                  <span className="text-gray-500">{getRelationLabel(rel.relation_type)}</span>
                  <span className="text-gray-400">&rarr;</span>
                  <span className="font-semibold text-gray-700">{target?.name ?? 'Unknown'}</span>
                </div>
                <div className="mt-1">
                  <span className="text-xs text-gray-500">Weight: {(rel.weight * 100).toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
