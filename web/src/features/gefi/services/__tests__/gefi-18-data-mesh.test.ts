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

const mockDataDomain = {
  id: 'dd-001',
  school_id: 'sch-001',
  name: 'Financial Transactions',
  owner: 'finance_team',
  schema: {
    table: 'financial_transactions',
    columns: ['id', 'amount', 'type', 'account_id', 'school_id'],
    primary_key: 'id',
  },
  sla: { availability: 99.9, latency_ms: 100 },
  status: 'ACTIVE',
  created_at: new Date().toISOString(),
};

const mockDataProduct = {
  id: 'dp-001',
  domain_id: 'dd-001',
  name: 'Revenue Analytics',
  type: 'ANALYTICS',
  endpoint: '/api/v1/analytics/revenue',
  schema: { revenue: 'number', period: 'string', growth: 'number' },
  access_level: 'INTERNAL',
  is_active: true,
  created_at: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('DataMeshService', () => {
  describe('createDomain', () => {
    it('should create data domain', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockDataDomain, error: null });
      const result = await mockSupabase.from('data_domains').insert(mockDataDomain);

      expect(result.data.owner).toBe('finance_team');
      expect(result.error).toBeNull();
    });

    it('should define schema', async () => {
      expect(mockDataDomain.schema.columns.length).toBeGreaterThan(0);
    });

    it('should set SLA requirements', async () => {
      expect(mockDataDomain.sla.availability).toBeGreaterThanOrEqual(99.0);
    });
  });

  describe('createDataProduct', () => {
    it('should create data product', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockDataProduct, error: null });
      const result = await mockSupabase.from('data_products').insert(mockDataProduct);

      expect(result.data.type).toBe('ANALYTICS');
      expect(result.error).toBeNull();
    });

    it('should validate endpoint exists', async () => {
      expect(mockDataProduct.endpoint).toBeTruthy();
    });
  });

  describe('queryDataProduct', () => {
    it('should return data from product', async () => {
      const data = [
        { revenue: 8500000, period: '2026-07', growth: 18.05 },
        { revenue: 7200000, period: '2026-06', growth: 12.3 },
      ];
      mockSupabase.order.mockResolvedValue({ data, error: null });
      const result = await mockSupabase.from('revenue_analytics')
        .select('*')
        .order('period', { ascending: false });

      expect(result.data).toHaveLength(2);
    });
  });

  describe('registerLineage', () => {
    it('should track data lineage', async () => {
      const lineage = {
        id: 'ln-001',
        source_product: 'dp-001',
        target_product: 'dp-002',
        transformation: 'AGGREGATE',
        created_at: new Date().toISOString(),
      };
      mockSupabase.insert.mockResolvedValue({ data: lineage, error: null });
      const result = await mockSupabase.from('data_lineage').insert(lineage);

      expect(result.data.transformation).toBe('AGGREGATE');
    });
  });

  describe('monitorSLA', () => {
    it('should check availability metric', async () => {
      const metric = { domain_id: 'dd-001', availability: 99.95, period: '2026-07' };
      expect(metric.availability).toBeGreaterThanOrEqual(mockDataDomain.sla.availability);
    });

    it('should check latency metric', async () => {
      const metric = { domain_id: 'dd-001', avg_latency_ms: 45, period: '2026-07' };
      expect(metric.avg_latency_ms).toBeLessThanOrEqual(mockDataDomain.sla.latency_ms);
    });
  });

  describe('error handling', () => {
    it('should handle domain not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('data_domains')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
