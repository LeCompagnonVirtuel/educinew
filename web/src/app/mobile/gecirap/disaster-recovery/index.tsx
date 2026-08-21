'use client';

import { useState, useCallback } from 'react';
import { useDRPlans, useRecoveryTests } from '@/features/gecirap/hooks';

interface DRPlan {
  id: string;
  name: string;
  plan_type: string;
  priority: number;
  rto_hours: number;
  rpo_hours: number;
  status: string;
  is_active: boolean;
  last_tested_at?: string;
}

interface RecoveryTest {
  id: string;
  plan_id: string;
  test_type: string;
  status: string;
  passed: boolean;
  scheduled_at: string;
  rto_actual_minutes?: number;
}

const FALLBACK_PLANS: DRPlan[] = [
  { id: '1', name: 'Full Region Failover', plan_type: 'full', priority: 1, rto_hours: 4, rpo_hours: 1, status: 'ready', is_active: true, last_tested_at: '2026-07-15T10:00:00Z' },
  { id: '2', name: 'Database Recovery', plan_type: 'database', priority: 2, rto_hours: 2, rpo_hours: 0.5, status: 'ready', is_active: true, last_tested_at: '2026-08-01T14:00:00Z' },
  { id: '3', name: 'Partial Failover', plan_type: 'partial', priority: 3, rto_hours: 1, rpo_hours: 0.25, status: 'needs_test', is_active: true },
];

const FALLBACK_TESTS: RecoveryTest[] = [
  { id: '1', plan_id: '1', test_type: 'full_drill', status: 'completed', passed: true, scheduled_at: '2026-07-15T10:00:00Z', rto_actual_minutes: 180 },
  { id: '2', plan_id: '2', test_type: 'restore_test', status: 'completed', passed: true, scheduled_at: '2026-08-01T14:00:00Z', rto_actual_minutes: 45 },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'ready': return 'bg-green-500';
    case 'needs_test': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'full': return 'text-red-700 bg-red-50';
    case 'database': return 'text-blue-700 bg-blue-50';
    case 'partial': return 'text-yellow-700 bg-yellow-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DisasterRecoveryPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: planData, isLoading: plansLoading, error: plansError, refetch: refetchPlans } = useDRPlans('current-school');
  const { data: testData, isLoading: testsLoading, refetch: refetchTests } = useRecoveryTests('current-school');

  const plans = planData?.data ?? FALLBACK_PLANS;
  const tests = testData?.data ?? FALLBACK_TESTS;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchPlans(), refetchTests()]).finally(() => setRefreshing(false));
  }, [refetchPlans, refetchTests]);

  const activePlans = plans.filter((p) => p.is_active).length;
  const passedTests = tests.filter((t) => t.passed).length;

  if (plansLoading || testsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (plansError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load DR plans</p>
          <p className="text-sm text-gray-500 mb-4">{plansError.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Disaster Recovery</h1>
          <p className="text-sm text-gray-500">{activePlans} active plans</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activePlans}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{passedTests}/{tests.length}</p>
          <p className="text-xs text-gray-500">Tests Passed</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{plans.length}</p>
          <p className="text-xs text-gray-500">Plans</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recovery Plans</h2>
        <div className="space-y-2">
          {plans.map((plan) => (
            <div key={plan.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(plan.status)}`} />
                  <span className="text-sm font-medium text-gray-700">{plan.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(plan.plan_type)}`}>
                  {plan.plan_type}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">RTO: {plan.rto_hours}h</span>
                <span className="text-xs text-gray-500">RPO: {plan.rpo_hours}h</span>
                <span className="text-xs text-gray-500">P{plan.priority}</span>
              </div>
              {plan.last_tested_at && (
                <p className="text-xs text-gray-400 mt-1">Last tested: {formatDate(plan.last_tested_at)}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Tests</h2>
        <div className="space-y-2">
          {tests.map((test) => (
            <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${test.passed ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{test.test_type}</p>
                  <p className="text-xs text-gray-500">{formatDate(test.scheduled_at)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold ${test.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {test.passed ? 'PASSED' : 'FAILED'}
                </span>
                {test.rto_actual_minutes != null && (
                  <p className="text-xs text-gray-400">{test.rto_actual_minutes}min RTO</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
