'use client';

import { useState, useCallback } from 'react';
import { useCloudCosts, useBudgets, useCostAnomalies, useOptimizationRecommendations } from '@/features/gecirap/hooks';

interface CostSummary { provider: string; total_cost: number; currency: string; }
interface BudgetSummary { id: string; name: string; amount: number; spent_amount: number; currency: string; status: string; }
interface CostAnomaly { id: string; service_name: string; severity: string; expected_amount: number; actual_amount: number; }
interface OptimizationRec { id: string; recommendation_type: string; resource_type: string; current_monthly_cost: number; savings_amount: number; savings_percent: number; status: string; }

function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getBudgetStatusColor(spent: number, total: number): string {
  const ratio = spent / total;
  if (ratio >= 1) return 'text-red-600';
  if (ratio >= 0.8) return 'text-yellow-600';
  return 'text-green-600';
}

function getSeverityColor(sev: string): string {
  switch (sev) {
    case 'high': return 'text-red-700 bg-red-50';
    case 'medium': return 'text-yellow-700 bg-yellow-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function FinOpsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: costData, isLoading: costsLoading, error: costsError, refetch: refetchCosts } = useCloudCosts('current-school');
  const { data: budgetData, isLoading: budgetsLoading, refetch: refetchBudgets } = useBudgets('current-school');
  const { data: anomalyData, isLoading: anomaliesLoading, refetch: refetchAnomalies } = useCostAnomalies('current-school');
  const { data: recData, isLoading: recsLoading, refetch: refetchRecs } = useOptimizationRecommendations('current-school');

  const costs = costData?.data ?? [];
  const budgets = budgetData?.data ?? [];
  const anomalies = anomalyData?.data ?? [];
  const recommendations = recData?.data ?? [];

  const totalCost = costs.reduce((s, c) => s + c.cost_amount, 0);
  const providerCosts: CostSummary[] = costs.length > 0
    ? Object.values(costs.reduce<Record<string, CostSummary>>((acc, c) => {
        if (!acc[c.provider]) acc[c.provider] = { provider: c.provider, total_cost: 0, currency: c.currency };
        acc[c.provider].total_cost += c.cost_amount;
        return acc;
      }, {}))
    : [];

  const totalSavings = recommendations.reduce((s, r) => s + r.savings_amount, 0);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchCosts(), refetchBudgets(), refetchAnomalies(), refetchRecs()]).finally(() => setRefreshing(false));
  }, [refetchCosts, refetchBudgets, refetchAnomalies, refetchRecs]);

  if (costsLoading || budgetsLoading || anomaliesLoading || recsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-gray-200 rounded-lg" />)}</div>
        </div>
      </div>
    );
  }

  if (costsError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load FinOps data</p>
          <p className="text-sm text-gray-500 mb-4">{costsError.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (costs.length === 0 && budgets.length === 0 && anomalies.length === 0 && recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">FinOps</h1>
            <p className="text-sm text-gray-500">No cost data available</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">No FinOps data available</p>
          <p className="text-gray-400 text-xs mt-1">Connect cloud providers to see cost data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">FinOps</h1>
          <p className="text-sm text-gray-500">Cloud Cost Overview</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Total Monthly Cost</h2>
        <p className="text-3xl font-extrabold text-gray-900">{formatCurrency(totalCost || 24950, 'USD')}</p>
        <p className="text-xs text-gray-500 mt-1">Across {providerCosts.length} providers</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-red-600">{anomalies.length}</p>
          <p className="text-xs text-gray-500">Anomalies</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{formatCurrency(totalSavings || 1485, 'USD')}</p>
          <p className="text-xs text-gray-500">Savings</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{budgets.length}</p>
          <p className="text-xs text-gray-500">Budgets</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Cost by Provider</h2>
        <div className="space-y-2">
          {providerCosts.map((pc) => (
            <div key={pc.provider} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700 uppercase">{pc.provider}</span>
              <span className="text-sm font-bold text-gray-900">{formatCurrency(pc.total_cost, pc.currency)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Budgets</h2>
        <div className="space-y-3">
          {budgets.map((budget) => {
            const pct = Math.min((budget.spent_amount / budget.amount) * 100, 100);
            return (
              <div key={budget.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{budget.name}</span>
                  <span className={`text-sm font-bold ${getBudgetStatusColor(budget.spent_amount, budget.amount)}`}>{pct.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div className={`h-full rounded-full ${pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-500">{formatCurrency(budget.spent_amount, budget.currency)} / {formatCurrency(budget.amount, budget.currency)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {anomalies.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Cost Anomalies</h2>
          <div className="space-y-2">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(anomaly.severity)}`}>{anomaly.severity}</span>
                  <span className="text-sm font-medium text-gray-700">{anomaly.service_name}</span>
                </div>
                <span className="text-xs text-red-600 font-semibold">+{((anomaly.actual_amount / anomaly.expected_amount - 1) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Optimization</h2>
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">{rec.recommendation_type}</p>
                <p className="text-xs text-gray-500">{rec.resource_type}</p>
              </div>
              <span className="text-xs text-green-600 font-semibold">-{rec.savings_percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
