import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFinancialAnalyticsService } from '../../src/features/analytics/services/financial-analytics.service';

const mockRepository = {
  getFinancialAnalytics: vi.fn(),
  getRevenueAnalytics: vi.fn(),
  getExpenseAnalytics: vi.fn(),
  getProfitAnalytics: vi.fn(),
  getCashFlowAnalytics: vi.fn(),
  getPaymentAnalytics: vi.fn(),
  getFinancialForecast: vi.fn(),
  getBudgetVsActual: vi.fn(),
};

describe('FinancialAnalyticsService', () => {
  let service: ReturnType<typeof createFinancialAnalyticsService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createFinancialAnalyticsService(mockRepository as any);
  });

  it('should call repository.getFinancialAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', period: 'monthly' };
    mockRepository.getFinancialAnalytics.mockResolvedValue({ revenue: 50000 });
    const result = await service.getFinancialAnalytics(filters);
    expect(mockRepository.getFinancialAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ revenue: 50000 });
  });

  it('should call getFinancialAnalytics without filters', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({});
    await service.getFinancialAnalytics();
    expect(mockRepository.getFinancialAnalytics).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from getFinancialAnalytics', async () => {
    mockRepository.getFinancialAnalytics.mockRejectedValue(new Error('Financial error'));
    await expect(service.getFinancialAnalytics()).rejects.toThrow('Financial error');
  });

  it('should call getRevenueAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateFrom: '2025-01-01' };
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 75000 });
    const result = await service.getRevenueAnalytics(filters);
    expect(mockRepository.getRevenueAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ total: 75000 });
  });

  it('should propagate errors from getRevenueAnalytics', async () => {
    mockRepository.getRevenueAnalytics.mockRejectedValue(new Error('Revenue error'));
    await expect(service.getRevenueAnalytics()).rejects.toThrow('Revenue error');
  });

  it('should call getExpenseAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1', dateTo: '2025-12-31' };
    mockRepository.getExpenseAnalytics.mockResolvedValue({ total: 30000 });
    const result = await service.getExpenseAnalytics(filters);
    expect(mockRepository.getExpenseAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ total: 30000 });
  });

  it('should propagate errors from getExpenseAnalytics', async () => {
    mockRepository.getExpenseAnalytics.mockRejectedValue(new Error('Expense error'));
    await expect(service.getExpenseAnalytics()).rejects.toThrow('Expense error');
  });

  it('should call getProfitAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getProfitAnalytics.mockResolvedValue({ total: 20000, margin: 40 });
    const result = await service.getProfitAnalytics(filters);
    expect(mockRepository.getProfitAnalytics).toHaveBeenCalledWith(filters);
    expect(result.total).toBe(20000);
    expect(result.margin).toBe(40);
  });

  it('should propagate errors from getProfitAnalytics', async () => {
    mockRepository.getProfitAnalytics.mockRejectedValue(new Error('Profit error'));
    await expect(service.getProfitAnalytics()).rejects.toThrow('Profit error');
  });

  it('should call getCashFlowAnalytics with filters', async () => {
    const filters = { dateFrom: '2025-01-01' };
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ netFlow: 15000 });
    const result = await service.getCashFlowAnalytics(filters);
    expect(mockRepository.getCashFlowAnalytics).toHaveBeenCalledWith(filters);
    expect(result).toEqual({ netFlow: 15000 });
  });

  it('should propagate errors from getCashFlowAnalytics', async () => {
    mockRepository.getCashFlowAnalytics.mockRejectedValue(new Error('CashFlow error'));
    await expect(service.getCashFlowAnalytics()).rejects.toThrow('CashFlow error');
  });

  it('should call getPaymentAnalytics with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getPaymentAnalytics.mockResolvedValue({ collected: 45000, pending: 5000 });
    const result = await service.getPaymentAnalytics(filters);
    expect(mockRepository.getPaymentAnalytics).toHaveBeenCalledWith(filters);
    expect(result.collected).toBe(45000);
    expect(result.pending).toBe(5000);
  });

  it('should propagate errors from getPaymentAnalytics', async () => {
    mockRepository.getPaymentAnalytics.mockRejectedValue(new Error('Payment error'));
    await expect(service.getPaymentAnalytics()).rejects.toThrow('Payment error');
  });

  it('should call getFinancialForecast with filters', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.getFinancialForecast.mockResolvedValue({ nextMonth: { predicted: 55000 } });
    const result = await service.getFinancialForecast(filters);
    expect(mockRepository.getFinancialForecast).toHaveBeenCalledWith(filters);
    expect(result.nextMonth.predicted).toBe(55000);
  });

  it('should propagate errors from getFinancialForecast', async () => {
    mockRepository.getFinancialForecast.mockRejectedValue(new Error('Forecast error'));
    await expect(service.getFinancialForecast()).rejects.toThrow('Forecast error');
  });

  it('should call getBudgetVsActual with filters', async () => {
    const filters = { dateFrom: '2025-01-01', dateTo: '2025-06-30' };
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 100000, actual: 85000 });
    const result = await service.getBudgetVsActual(filters);
    expect(mockRepository.getBudgetVsActual).toHaveBeenCalledWith(filters);
    expect(result.budget).toBe(100000);
    expect(result.actual).toBe(85000);
  });

  it('should propagate errors from getBudgetVsActual', async () => {
    mockRepository.getBudgetVsActual.mockRejectedValue(new Error('Budget error'));
    await expect(service.getBudgetVsActual()).rejects.toThrow('Budget error');
  });

  it('should handle null filters gracefully', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ total: 0 });
    const result = await service.getFinancialAnalytics(null as any);
    expect(result).toEqual({ total: 0 });
  });

  it('should return revenue data with numeric values', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 120000, growth: { daily: 2.5, monthly: 8.3, yearly: 15.0 } });
    const result = await service.getRevenueAnalytics();
    expect(typeof result.total).toBe('number');
    expect(typeof result.growth.monthly).toBe('number');
  });

  it('should handle empty payment analytics result', async () => {
    mockRepository.getPaymentAnalytics.mockResolvedValue({ total: 0, collected: 0, pending: 0, overdue: 0 });
    const result = await service.getPaymentAnalytics();
    expect(result.total).toBe(0);
    expect(result.collected).toBe(0);
  });

  it('should return cash flow with inflows and outflows', async () => {
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ current: 5000, inflows: 50000, outflows: 45000, netFlow: 5000 });
    const result = await service.getCashFlowAnalytics();
    expect(result.inflows).toBeGreaterThan(result.outflows);
    expect(result.netFlow).toBe(5000);
  });

  it('should handle forecast with confidence level', async () => {
    mockRepository.getFinancialForecast.mockResolvedValue({ confidence: 0.85, model: 'linear_regression' });
    const result = await service.getFinancialForecast();
    expect(result.confidence).toBe(0.85);
    expect(result.model).toBe('linear_regression');
  });

  it('should handle budget variance calculation', async () => {
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 100000, actual: 110000, variance: 10000, variancePercent: 10 });
    const result = await service.getBudgetVsActual();
    expect(result.variance).toBeGreaterThan(0);
    expect(result.variancePercent).toBe(10);
  });

  it('should handle multiple date range filter combinations', async () => {
    const filters = { dateFrom: '2025-01-01', dateTo: '2025-06-30', period: 'quarterly' };
    mockRepository.getFinancialAnalytics.mockResolvedValue({ total: 80000 });
    await service.getFinancialAnalytics(filters);
    expect(mockRepository.getFinancialAnalytics).toHaveBeenCalledWith(filters);
  });

  it('should get financial analytics with revenue breakdown', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ revenue: { tuition: 50000, grants: 20000, donations: 10000 } });
    const result = await service.getFinancialAnalytics();
    expect(result.revenue.tuition).toBe(50000);
  });

  it('should get revenue analytics by category', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 75000, byCategory: [{ category: 'Tuition', amount: 60000 }, { category: 'Grants', amount: 15000 }] });
    const result = await service.getRevenueAnalytics();
    expect(result.byCategory).toHaveLength(2);
  });

  it('should get revenue analytics with monthly trend', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 75000, monthlyTrend: [{ month: 'Jan', amount: 6000 }, { month: 'Feb', amount: 6500 }] });
    const result = await service.getRevenueAnalytics();
    expect(result.monthlyTrend).toHaveLength(2);
  });

  it('should get expense analytics by department', async () => {
    mockRepository.getExpenseAnalytics.mockResolvedValue({ total: 30000, byDepartment: [{ dept: 'Salaries', amount: 20000 }, { dept: 'Utilities', amount: 5000 }] });
    const result = await service.getExpenseAnalytics();
    expect(result.byDepartment).toHaveLength(2);
  });

  it('should get expense analytics with fixed vs variable', async () => {
    mockRepository.getExpenseAnalytics.mockResolvedValue({ total: 30000, fixed: 18000, variable: 12000 });
    const result = await service.getExpenseAnalytics();
    expect(result.fixed).toBe(18000);
    expect(result.variable).toBe(12000);
  });

  it('should get profit analytics with margins by service', async () => {
    mockRepository.getProfitAnalytics.mockResolvedValue({ total: 20000, byService: [{ service: 'Tuition', margin: 45 }, { service: 'Cafeteria', margin: 15 }] });
    const result = await service.getProfitAnalytics();
    expect(result.byService).toHaveLength(2);
  });

  it('should get profit analytics with quarterly data', async () => {
    mockRepository.getProfitAnalytics.mockResolvedValue({ total: 20000, quarterly: [{ q: 'Q1', profit: 4500 }, { q: 'Q2', profit: 5200 }, { q: 'Q3', profit: 5800 }, { q: 'Q4', profit: 4500 }] });
    const result = await service.getProfitAnalytics();
    expect(result.quarterly).toHaveLength(4);
  });

  it('should get cash flow analytics with projections', async () => {
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ netFlow: 15000, projections: { nextMonth: 12000, nextQuarter: 35000 } });
    const result = await service.getCashFlowAnalytics();
    expect(result.projections.nextMonth).toBe(12000);
  });

  it('should get cash flow analytics with runway', async () => {
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ netFlow: 15000, runway: 18, burnRate: 8500 });
    const result = await service.getCashFlowAnalytics();
    expect(result.runway).toBe(18);
  });

  it('should get payment analytics with collection rate', async () => {
    mockRepository.getPaymentAnalytics.mockResolvedValue({ collected: 45000, pending: 5000, collectionRate: 90 });
    const result = await service.getPaymentAnalytics();
    expect(result.collectionRate).toBe(90);
  });

  it('should get payment analytics with aging data', async () => {
    mockRepository.getPaymentAnalytics.mockResolvedValue({ collected: 45000, aging: { current: 40000, days30: 3000, days60: 1500, days90: 500 } });
    const result = await service.getPaymentAnalytics();
    expect(result.aging.current).toBe(40000);
  });

  it('should get payment analytics by payment method', async () => {
    mockRepository.getPaymentAnalytics.mockResolvedValue({ collected: 45000, byMethod: [{ method: 'Credit Card', amount: 25000 }, { method: 'Bank Transfer', amount: 20000 }] });
    const result = await service.getPaymentAnalytics();
    expect(result.byMethod).toHaveLength(2);
  });

  it('should get financial forecast with scenario analysis', async () => {
    mockRepository.getFinancialForecast.mockResolvedValue({ scenarios: { best: 65000, base: 55000, worst: 45000 } });
    const result = await service.getFinancialForecast();
    expect(result.scenarios.best).toBe(65000);
  });

  it('should get financial forecast with seasonal adjustment', async () => {
    mockRepository.getFinancialForecast.mockResolvedValue({ nextMonth: { predicted: 55000, seasonal: true, adjustment: 5000 } });
    const result = await service.getFinancialForecast();
    expect(result.nextMonth.seasonal).toBe(true);
  });

  it('should get budget vs actual by category', async () => {
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 100000, actual: 85000, byCategory: [{ category: 'Salaries', budget: 60000, actual: 58000 }, { category: 'Supplies', budget: 15000, actual: 14000 }] });
    const result = await service.getBudgetVsActual();
    expect(result.byCategory).toHaveLength(2);
  });

  it('should get budget vs actual with variance analysis', async () => {
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 100000, actual: 85000, variance: -15000, status: 'under-budget' });
    const result = await service.getBudgetVsActual();
    expect(result.status).toBe('under-budget');
  });

  it('should get financial analytics with KPIs', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ kpis: { revenuePerStudent: 15000, costPerStudent: 10000, margin: 33.3 } });
    const result = await service.getFinancialAnalytics();
    expect(result.kpis.revenuePerStudent).toBe(15000);
  });

  it('should get revenue analytics with growth rate', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 75000, growth: { monthly: 5.2, yearly: 12.8 } });
    const result = await service.getRevenueAnalytics();
    expect(result.growth.yearly).toBe(12.8);
  });

  it('should get expense analytics with cost reduction opportunities', async () => {
    mockRepository.getExpenseAnalytics.mockResolvedValue({ total: 30000, opportunities: [{ area: 'Energy', savings: 2500 }, { area: 'Supplies', savings: 1500 }] });
    const result = await service.getExpenseAnalytics();
    expect(result.opportunities).toHaveLength(2);
  });

  it('should get profit analytics with breakeven analysis', async () => {
    mockRepository.getProfitAnalytics.mockResolvedValue({ total: 20000, breakeven: { revenue: 45000, units: 300 } });
    const result = await service.getProfitAnalytics();
    expect(result.breakeven.revenue).toBe(45000);
  });

  it('should get cash flow analytics with working capital', async () => {
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ netFlow: 15000, workingCapital: { current: 25000, ratio: 1.5 } });
    const result = await service.getCashFlowAnalytics();
    expect(result.workingCapital.current).toBe(25000);
  });

  it('should get payment analytics with late fee analysis', async () => {
    mockRepository.getPaymentAnalytics.mockResolvedValue({ collected: 45000, lateFees: { total: 2500, count: 45 } });
    const result = await service.getPaymentAnalytics();
    expect(result.lateFees.total).toBe(2500);
  });

  it('should get financial forecast with external factors', async () => {
    mockRepository.getFinancialForecast.mockResolvedValue({ nextMonth: { predicted: 55000, factors: ['inflation', 'enrollment-change'] } });
    const result = await service.getFinancialForecast();
    expect(result.nextMonth.factors).toHaveLength(2);
  });

  it('should get budget vs actual with department breakdown', async () => {
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 100000, actual: 85000, byDepartment: [{ dept: 'Academic', budget: 50000, actual: 45000 }, { dept: 'Operations', budget: 30000, actual: 28000 }] });
    const result = await service.getBudgetVsActual();
    expect(result.byDepartment).toHaveLength(2);
  });

  it('should get financial analytics with compliance status', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ compliance: { auditStatus: 'Passed', issues: 0, lastAudit: '2025-06-01' } });
    const result = await service.getFinancialAnalytics();
    expect(result.compliance.auditStatus).toBe('Passed');
  });

  it('should get revenue analytics with scholarship impact', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 75000, scholarships: { total: 12000, recipients: 45, netRevenue: 63000 } });
    const result = await service.getRevenueAnalytics();
    expect(result.scholarships.total).toBe(12000);
  });

  it('should get expense analytics with vendor analysis', async () => {
    mockRepository.getExpenseAnalytics.mockResolvedValue({ total: 30000, topVendors: [{ vendor: 'Supplier A', amount: 8000 }, { vendor: 'Supplier B', amount: 5000 }] });
    const result = await service.getExpenseAnalytics();
    expect(result.topVendors).toHaveLength(2);
  });

  it('should get profit analytics with ROI calculation', async () => {
    mockRepository.getProfitAnalytics.mockResolvedValue({ total: 20000, roi: { investment: 50000, return: 15000, roiPercent: 30 } });
    const result = await service.getProfitAnalytics();
    expect(result.roi.roiPercent).toBe(30);
  });

  it('should get cash flow analytics with seasonality', async () => {
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ netFlow: 15000, seasonality: { peak: 'September', low: 'June' } });
    const result = await service.getCashFlowAnalytics();
    expect(result.seasonality.peak).toBe('September');
  });

  it('should get payment analytics with payment plan data', async () => {
    mockRepository.getPaymentAnalytics.mockResolvedValue({ collected: 45000, paymentPlans: { active: 120, totalValue: 180000, avgMonthly: 1500 } });
    const result = await service.getPaymentAnalytics();
    expect(result.paymentPlans.active).toBe(120);
  });

  it('should get financial forecast with accuracy metrics', async () => {
    mockRepository.getFinancialForecast.mockResolvedValue({ nextMonth: { predicted: 55000, accuracy: 0.88, confidenceInterval: { lower: 50000, upper: 60000 } } });
    const result = await service.getFinancialForecast();
    expect(result.nextMonth.accuracy).toBe(0.88);
  });

  it('should get budget vs actual with trend data', async () => {
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 100000, actual: 85000, trend: [{ month: 'Jan', budget: 8500, actual: 7200 }, { month: 'Feb', budget: 8500, actual: 7100 }] });
    const result = await service.getBudgetVsActual();
    expect(result.trend).toHaveLength(2);
  });

  it('should get financial analytics with investment data', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ investments: { total: 250000, return: 18000, allocation: { bonds: 0.4, stocks: 0.6 } } });
    const result = await service.getFinancialAnalytics();
    expect(result.investments.total).toBe(250000);
  });

  it('should get revenue analytics with enrollment correlation', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 75000, enrollment: { total: 500, revenuePerStudent: 1500, correlation: 0.92 } });
    const result = await service.getRevenueAnalytics();
    expect(result.enrollment.correlation).toBe(0.92);
  });

  it('should get expense analytics with depreciation', async () => {
    mockRepository.getExpenseAnalytics.mockResolvedValue({ total: 30000, depreciation: { assets: 500000, annualDep: 25000, bookValue: 475000 } });
    const result = await service.getExpenseAnalytics();
    expect(result.depreciation.annualDep).toBe(25000);
  });

  it('should handle empty financial analytics', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ revenue: {}, expenses: {}, profit: {} });
    const result = await service.getFinancialAnalytics();
    expect(Object.keys(result.revenue)).toHaveLength(0);
  });

  it('should handle zero revenue scenario', async () => {
    mockRepository.getRevenueAnalytics.mockResolvedValue({ total: 0, growth: { monthly: 0, yearly: 0 } });
    const result = await service.getRevenueAnalytics();
    expect(result.total).toBe(0);
  });

  it('should handle negative profit scenario', async () => {
    mockRepository.getProfitAnalytics.mockResolvedValue({ total: -5000, margin: -10 });
    const result = await service.getProfitAnalytics();
    expect(result.total).toBe(-5000);
  });

  it('should handle negative cash flow scenario', async () => {
    mockRepository.getCashFlowAnalytics.mockResolvedValue({ netFlow: -10000, burnRate: 12000 });
    const result = await service.getCashFlowAnalytics();
    expect(result.netFlow).toBe(-10000);
  });

  it('should handle zero budget scenario', async () => {
    mockRepository.getBudgetVsActual.mockResolvedValue({ budget: 0, actual: 0, variance: 0 });
    const result = await service.getBudgetVsActual();
    expect(result.budget).toBe(0);
  });

  it('should handle full financial analytics structure', async () => {
    mockRepository.getFinancialAnalytics.mockResolvedValue({ revenue: {}, expenses: {}, profit: {}, cashFlow: {}, payments: {}, forecast: {}, budget: {} });
    const result = await service.getFinancialAnalytics();
    expect(result).toHaveProperty('revenue');
    expect(result).toHaveProperty('expenses');
    expect(result).toHaveProperty('profit');
    expect(result).toHaveProperty('cashFlow');
    expect(result).toHaveProperty('payments');
    expect(result).toHaveProperty('forecast');
    expect(result).toHaveProperty('budget');
  });
});
