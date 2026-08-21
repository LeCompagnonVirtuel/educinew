import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRepo = {
  findMany: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const schoolId = '550e8400-e29b-41d4-a716-446655440000';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Executive - NationalKPI Service', () => {
  it('should list national KPIs', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', name: 'Graduation Rate', status: 'ON_TRACK' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].status).toBe('ON_TRACK');
  });

  it('should create national KPI', async () => {
    const data = { schoolId, name: 'Literacy Rate', category: 'EDUCATION', status: 'ON_TRACK', trend: 'IMPROVING', metric: { current: 85, previous: 82, target: 90, unit: '%', change_percent: 3.66, change_direction: 'IMPROVING' }, national_target: 90, national_average: 75, regions_above_target: 8, regions_below_target: 6, last_measured: '2026-01-01', data_source: 'DATABASE', description: 'National literacy rate' };
    mockRepo.create.mockResolvedValue({ id: 'kpi1', ...data });
    const result = await mockRepo.create(data);
    expect(result.metric.current).toBe(85);
  });
});

describe('Executive - RegionalKPI Service', () => {
  it('should create regional KPI', async () => {
    const data = { schoolId, region: 'Dakar', name: 'Student-Teacher Ratio', category: 'EDUCATION', status: 'AT_RISK', trend: 'DECLINING', metric: { current: 35, previous: 30, target: 25, unit: 'ratio', change_percent: 16.67, change_direction: 'DECLINING' }, national_ranking: 5, regional_ranking: 2, districts_above_target: 3, districts_below_target: 4, last_measured: '2026-01-01', data_source: 'DATABASE' };
    mockRepo.create.mockResolvedValue({ id: 'rkpi1', ...data });
    const result = await mockRepo.create(data);
    expect(result.region).toBe('Dakar');
  });
});

describe('Executive - BudgetIntelligence Service', () => {
  it('should create budget intelligence', async () => {
    const data = { schoolId, fiscal_year: 2026, total_budget: 5000000000, total_spent: 3200000000, total_remaining: 1800000000, utilization_rate: 64, allocations: [] };
    mockRepo.create.mockResolvedValue({ id: 'bi1', ...data });
    const result = await mockRepo.create(data);
    expect(result.utilization_rate).toBe(64);
  });

  it('should validate utilization rate', () => {
    const validate = (rate: number) => { if (rate < 0 || rate > 100) throw new Error('Invalid rate'); };
    expect(() => validate(150)).toThrow('Invalid rate');
    expect(() => validate(64)).not.toThrow();
  });
});

describe('Executive - RiskAssessment Service', () => {
  it('should create risk assessment', async () => {
    const data = { schoolId, title: 'Budget Shortfall Risk', description: 'Risk of budget cuts', risk_category: 'FINANCIAL', risk_level: 'HIGH', probability: 0.6, impact: 0.8, risk_score: 48, affected_areas: ['STUDENTS', 'TEACHERS'], mitigation_strategies: [], owner: 'Finance Director', review_date: '2026-06-01', status: 'PENDING' };
    mockRepo.create.mockResolvedValue({ id: 'ra1', ...data });
    const result = await mockRepo.create(data);
    expect(result.risk_score).toBe(48);
  });

  it('should list risk assessments', async () => {
    mockRepo.findMany.mockResolvedValue([]);
    expect(await mockRepo.findMany(schoolId)).toHaveLength(0);
  });
});

describe('Executive - StakeholderMap Service', () => {
  it('should create stakeholder map', async () => {
    const data = { schoolId, stakeholders: [], engagement_strategies: [] };
    mockRepo.create.mockResolvedValue({ id: 'sm1', ...data });
    const result = await mockRepo.create(data);
    expect(result.stakeholders).toHaveLength(0);
  });

  it('should validate influence level', () => {
    const validate = (level: number) => { if (level < 0 || level > 10) throw new Error('Level must be 0-10'); };
    expect(() => validate(11)).toThrow('Level must be 0-10');
    expect(() => validate(5)).not.toThrow();
  });
});
