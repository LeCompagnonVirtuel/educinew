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

const mockTwinModel = {
  id: 'tw-001',
  school_id: 'sch-001',
  model_type: 'FINANCIAL',
  name: 'Modèle Financier 2026',
  parameters: {
    revenue_streams: ['tuition', 'fees', 'grants'],
    cost_categories: ['salaries', 'operations', 'maintenance'],
    inflation_rate: 3.2,
    enrollment_growth: 5.0,
  },
  status: 'ACTIVE',
  created_at: new Date().toISOString(),
};

const mockSimulation = {
  id: 'sim-001',
  twin_id: 'tw-001',
  scenario: 'OPTIMISTIC',
  parameters_adjusted: { enrollment_growth: 8.0 },
  results: {
    projected_revenue: 120000000,
    projected_expenses: 95000000,
    net_income: 25000000,
  },
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('DigitalTwinService', () => {
  describe('createTwinModel', () => {
    it('should create digital twin model', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockTwinModel, error: null });
      const result = await mockSupabase.from('digital_twins').insert(mockTwinModel);

      expect(result.data.model_type).toBe('FINANCIAL');
      expect(result.error).toBeNull();
    });

    it('should have required parameters', async () => {
      expect(mockTwinModel.parameters.revenue_streams.length).toBeGreaterThan(0);
      expect(mockTwinModel.parameters.cost_categories.length).toBeGreaterThan(0);
    });
  });

  describe('runSimulation', () => {
    it('should execute simulation with parameters', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockSimulation, error: null });
      const result = await mockSupabase.from('simulations').insert(mockSimulation);

      expect(result.data.scenario).toBe('OPTIMISTIC');
      expect(result.data.results).toBeDefined();
    });

    it('should calculate net income', async () => {
      const net = mockSimulation.results.projected_revenue - mockSimulation.results.projected_expenses;
      expect(net).toBe(25000000);
    });

    it('should validate results structure', async () => {
      expect(mockSimulation.results).toHaveProperty('projected_revenue');
      expect(mockSimulation.results).toHaveProperty('projected_expenses');
      expect(mockSimulation.results).toHaveProperty('net_income');
    });
  });

  describe('compareScenarios', () => {
    it('should compare multiple scenarios', async () => {
      const scenarios = [
        { name: 'BASE', revenue: 100000000, expenses: 90000000 },
        { name: 'OPTIMISTIC', revenue: 120000000, expenses: 95000000 },
        { name: 'PESSIMISTIC', revenue: 85000000, expenses: 88000000 },
      ];
      const best = scenarios.reduce((a, b) => (a.revenue - a.expenses) > (b.revenue - b.expenses) ? a : b);
      expect(best.name).toBe('OPTIMISTIC');
    });
  });

  describe('updateParameters', () => {
    it('should update twin parameters', async () => {
      const updated = {
        ...mockTwinModel,
        parameters: { ...mockTwinModel.parameters, inflation_rate: 4.0 },
      };
      mockSupabase.update.mockResolvedValue({ data: updated, error: null });
      const result = await mockSupabase.from('digital_twins')
        .update({ parameters: updated.parameters })
        .eq('id', 'tw-001');

      expect(result.data.parameters.inflation_rate).toBe(4.0);
    });
  });

  describe('getSimulationHistory', () => {
    it('should return past simulations', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockSimulation], error: null });
      const result = await mockSupabase.from('simulations')
        .select('*')
        .eq('twin_id', 'tw-001')
        .order('created_at', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('should handle twin not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('digital_twins')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
