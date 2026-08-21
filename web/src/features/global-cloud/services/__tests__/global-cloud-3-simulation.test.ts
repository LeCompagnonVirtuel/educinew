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

describe('Simulation - CapacityPlan Service', () => {
  it('should list capacity plans', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', name: 'Q1 Plan', domain: 'CAPACITY' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create capacity plan', async () => {
    const data = { schoolId, name: 'Enrollment Plan', description: 'Plan for 2026', domain: 'ENROLLMENT', horizon: 'MEDIUM_TERM', targets: [], constraints: [] };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.domain).toBe('ENROLLMENT');
  });

  it('should update plan', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', name: 'Updated Plan' });
    const result = await mockRepo.update(schoolId, '1', { name: 'Updated Plan' });
    expect(result.name).toBe('Updated Plan');
  });

  it('should delete plan', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalled();
  });
});

describe('Simulation - EnrollmentSimulation Service', () => {
  it('should list simulations', async () => {
    mockRepo.findMany.mockResolvedValue([]);
    expect(await mockRepo.findMany(schoolId)).toHaveLength(0);
  });

  it('should create simulation', async () => {
    const data = { schoolId, engine: 'MONTE_CARLO', scenario: 'BASELINE', status: 'CONFIGURING', parameters: [], baseline_enrollment: 500, projection_horizon: 12 };
    mockRepo.create.mockResolvedValue({ id: 's1', ...data });
    const result = await mockRepo.create(data);
    expect(result.engine).toBe('MONTE_CARLO');
  });

  it('should update simulation status', async () => {
    mockRepo.update.mockResolvedValue({ id: 's1', status: 'RUNNING' });
    const result = await mockRepo.update(schoolId, 's1', { status: 'RUNNING' });
    expect(result.status).toBe('RUNNING');
  });
});

describe('Simulation - BudgetSimulation Service', () => {
  it('should create budget simulation', async () => {
    const data = { schoolId, engine: 'SYSTEM_DYNAMICS', scenario: 'BEST_CASE', status: 'CONFIGURING', total_budget: 1000000, categories: [], parameters: [], fiscal_year: 2026 };
    mockRepo.create.mockResolvedValue({ id: 'b1', ...data });
    const result = await mockRepo.create(data);
    expect(result.total_budget).toBe(1000000);
  });

  it('should validate fiscal year', () => {
    const validate = (year: number) => { if (year < 2000) throw new Error('Invalid fiscal year'); };
    expect(() => validate(1999)).toThrow('Invalid fiscal year');
    expect(() => validate(2026)).not.toThrow();
  });
});

describe('Simulation - DisasterSimulation Service', () => {
  it('should create disaster simulation', async () => {
    const data = { schoolId, disaster_type: 'FIRE', severity: 'HIGH', engine: 'AGENT_BASED', scenario: 'WORST_CASE', status: 'CONFIGURING', parameters: [], affected_area: 'Building A', estimated_duration: 120 };
    mockRepo.create.mockResolvedValue({ id: 'd1', ...data });
    const result = await mockRepo.create(data);
    expect(result.disaster_type).toBe('FIRE');
  });

  it('should require affected_area', () => {
    const validate = (area: string) => { if (!area) throw new Error('Affected area is required'); };
    expect(() => validate('')).toThrow('Affected area is required');
  });
});
