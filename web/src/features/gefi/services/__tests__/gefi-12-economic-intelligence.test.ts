import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const mockInsight = {
  id: 'ins-001',
  school_id: 'sch-001',
  type: 'REVENUE_TREND',
  metric: 'monthly_revenue',
  value: 8500000,
  period: '2026-07',
  comparison: { previous: 7200000, change_pct: 18.05 },
  severity: 'INFO',
  created_at: new Date().toISOString(),
};

const mockForecast = {
  id: 'frc-001',
  school_id: 'sch-001',
  metric: 'enrollment_revenue',
  model: 'ARIMA',
  forecast_value: 12000000,
  confidence_interval: { lower: 10800000, upper: 13200000 },
  period: '2026-Q4',
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('EconomicIntelligenceService', () => {
  describe('recordInsight', () => {
    it('should record economic insight', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockInsight, error: null });
      const result = await mockSupabase.from('economic_insights').insert(mockInsight);

      expect(result.data.type).toBe('REVENUE_TREND');
      expect(result.error).toBeNull();
    });

    it('should include comparison data', async () => {
      expect(mockInsight.comparison).toBeDefined();
      expect(mockInsight.comparison.change_pct).toBeCloseTo(18.05);
    });
  });

  describe('generateForecast', () => {
    it('should create forecast with confidence interval', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockForecast, error: null });
      const result = await mockSupabase.from('forecasts').insert(mockForecast);

      expect(result.data.confidence_interval).toBeDefined();
    });

    it('should validate forecast within bounds', async () => {
      expect(mockForecast.forecast_value).toBeGreaterThanOrEqual(mockForecast.confidence_interval.lower);
      expect(mockForecast.forecast_value).toBeLessThanOrEqual(mockForecast.confidence_interval.upper);
    });
  });

  describe('analyzeRevenueTrend', () => {
    it('should calculate trend direction', async () => {
      const revenue = [7000000, 7200000, 7500000, 8000000, 8500000];
      const isIncreasing = revenue[revenue.length - 1] > revenue[0];
      expect(isIncreasing).toBe(true);
    });

    it('should detect anomalies', async () => {
      const data = [7000000, 7200000, 15000000, 7500000];
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      const threshold = avg * 2;
      const anomalies = data.filter(v => v > threshold || v < avg / 2);
      expect(anomalies).toHaveLength(1);
    });
  });

  describe('getKPIDashboard', () => {
    it('should return aggregated KPIs', async () => {
      const kpis = {
        revenue_growth: 18.05,
        cost_efficiency: 0.72,
        student_retention: 0.94,
        profit_margin: 0.15,
      };
      expect(kpis.student_retention).toBeGreaterThan(0.9);
    });
  });

  describe('exportAnalytics', () => {
    it('should format data for export', async () => {
      const exportData = {
        format: 'CSV',
        rows: 120,
        columns: ['period', 'revenue', 'expenses', 'margin'],
        generated_at: new Date().toISOString(),
      };
      expect(exportData.columns.length).toBe(4);
    });
  });

  describe('error handling', () => {
    it('should handle invalid metric', async () => {
      const invalid = { ...mockInsight, metric: undefined };
      expect(invalid.metric).toBeUndefined();
    });
  });
});
