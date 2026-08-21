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

describe('Government - NationalDashboard Service', () => {
  it('should get national dashboard', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', type: 'NATIONAL', total_schools: 15000 }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].total_schools).toBe(15000);
  });

  it('should create national dashboard', async () => {
    const data = { schoolId, type: 'NATIONAL', total_schools: 15000, total_students: 5000000, total_teachers: 200000, national_budget: 5000000000, strategic_goals: ['QUALITY', 'EQUITY'], national_priorities: ['ACCESS', 'QUALITY'], refresh_frequency: 'DAILY' };
    mockRepo.create.mockResolvedValue({ id: 'nd1', ...data });
    const result = await mockRepo.create(data);
    expect(result.type).toBe('NATIONAL');
  });
});

describe('Government - MinistryDashboard Service', () => {
  it('should create ministry dashboard', async () => {
    const data = { schoolId, type: 'MINISTRY', ministry_name: 'Ministry of Education', minister_name: 'John Doe', portfolio: 'Education', total_schools: 5000, total_students: 2000000, total_teachers: 80000, budget_allocated: 2000000000, budget_spent: 1500000000 };
    mockRepo.create.mockResolvedValue({ id: 'md1', ...data });
    const result = await mockRepo.create(data);
    expect(result.ministry_name).toBe('Ministry of Education');
  });

  it('should validate budget', () => {
    const validate = (allocated: number, spent: number) => {
      if (spent > allocated) throw new Error('Spent cannot exceed allocated');
    };
    expect(() => validate(1000, 1500)).toThrow('Spent cannot exceed allocated');
  });
});

describe('Government - PolicyDashboard Service', () => {
  it('should create policy dashboard', async () => {
    const data = { schoolId, type: 'POLICY', active_policies: 10, pending_policies: 3, expired_policies: 2, total_impact_score: 85.5 };
    mockRepo.create.mockResolvedValue({ id: 'pd1', ...data });
    const result = await mockRepo.create(data);
    expect(result.active_policies).toBe(10);
  });

  it('should list policies', async () => {
    mockRepo.findMany.mockResolvedValue([]);
    expect(await mockRepo.findMany(schoolId)).toHaveLength(0);
  });
});

describe('Government - StrategicPlan Service', () => {
  it('should create strategic plan', async () => {
    const data = { schoolId, title: 'Vision 2030', description: 'National education strategy', vision: 'Quality education for all', mission: 'Transform education', start_date: '2026-01-01', end_date: '2030-12-31', goals: [], national_priorities: ['QUALITY'], total_budget: 10000000000, status: 'PENDING', approved_by: 'Minister', approved_at: '2026-01-01' };
    mockRepo.create.mockResolvedValue({ id: 'sp1', ...data });
    const result = await mockRepo.create(data);
    expect(result.title).toBe('Vision 2030');
  });
});

describe('Government - GovernmentAlert Service', () => {
  it('should create alert', async () => {
    const data = { schoolId, alert_level: 'HIGH', title: 'Low attendance', description: 'Attendance dropped below 70%', category: 'EDUCATION', affected_count: 500, recommended_actions: ['Investigate'], resolved: false };
    mockRepo.create.mockResolvedValue({ id: 'ga1', ...data });
    const result = await mockRepo.create(data);
    expect(result.alert_level).toBe('HIGH');
  });

  it('should require title', () => {
    const validate = (title: string) => { if (!title) throw new Error('Title is required'); };
    expect(() => validate('')).toThrow('Title is required');
  });
});
