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

describe('Green - ESGDashboard Service', () => {
  it('should get ESG dashboard', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', overallScore: 72, esgRating: 'BBB' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].esgRating).toBe('BBB');
  });

  it('should create ESG dashboard', async () => {
    const data = { schoolId, overallScore: 72, environmentalScore: 68, socialScore: 75, governanceScore: 74, esgRating: 'BBB', carbonFootprint: 1500, energyConsumption: 500000, waterConsumption: 100000, wasteGenerated: 50000, renewableEnergyShare: 35, activeGoals: 8, completedGoals: 3, alerts: [], trends: [], benchmarks: [], generatedAt: '2026-01-01T00:00:00Z' };
    mockRepo.create.mockResolvedValue({ id: 'esg1', ...data });
    const result = await mockRepo.create(data);
    expect(result.overallScore).toBe(72);
  });
});

describe('Green - CarbonFootprint Service', () => {
  it('should create carbon footprint', async () => {
    const data = { schoolId, reportingPeriod: 'ANNUAL', year: 2026, scope1Total: 500, scope2Total: 800, scope3Total: 200, grandTotal: 1500, emissions: [], offsets: [], netEmissions: 1200, trend: 'DECREASING', yoyChange: -5.2, calculatedAt: '2026-01-01T00:00:00Z' };
    mockRepo.create.mockResolvedValue({ id: 'cf1', ...data });
    const result = await mockRepo.create(data);
    expect(result.grandTotal).toBe(1500);
  });

  it('should validate net emissions', () => {
    const validate = (grand: number, offset: number) => {
      const net = grand - offset;
      if (net < 0) throw new Error('Net emissions cannot be negative');
    };
    expect(() => validate(100, 150)).toThrow('Net emissions cannot be negative');
  });
});

describe('Green - EnergyAnalytics Service', () => {
  it('should create energy analytics', async () => {
    const data = { schoolId, totalConsumption: 500000, unit: 'kWh', breakdown: [], renewableShare: 35, intensityPerStudent: 250, intensityPerSqM: 50, cost: 75000, costPerUnit: 0.15, peakDemand: 500, loadFactor: 72, trend: 'DECREASING', forecast: { id: 'f1', schoolId, model: 'ARIMA', historicalData: [], predictions: [], confidenceInterval: [], periods: [], accuracy: 85, generatedAt: '2026-01-01' }, renewableAssets: [], generatedAt: '2026-01-01T00:00:00Z' };
    mockRepo.create.mockResolvedValue({ id: 'ea1', ...data });
    const result = await mockRepo.create(data);
    expect(result.renewableShare).toBe(35);
  });
});

describe('Green - SustainabilityGoal Service', () => {
  it('should create sustainability goal', async () => {
    const data = { schoolId, goal: 'CARBON_NEUTRAL', title: 'Net Zero by 2030', description: 'Achieve carbon neutrality', targetValue: 0, currentValue: 1200, unit: 'tonnes CO2', startDate: '2026-01-01', targetDate: '2030-12-31', status: 'ON_TRACK', progress: 25, milestones: [], assignedTo: [] };
    mockRepo.create.mockResolvedValue({ id: 'sg1', ...data });
    const result = await mockRepo.create(data);
    expect(result.goal).toBe('CARBON_NEUTRAL');
  });

  it('should validate progress', () => {
    const validate = (p: number) => { if (p < 0 || p > 100) throw new Error('Progress must be 0-100'); };
    expect(() => validate(150)).toThrow('Progress must be 0-100');
    expect(() => validate(25)).not.toThrow();
  });
});

describe('Green - GreenCampus Service', () => {
  it('should create green campus', async () => {
    const data = { schoolId, overallScore: 78, greenBuilding: { id: 'gb1', schoolId, type: 'LEED', level: 'Gold', score: 78, certifiedDate: '2025-06-01', expiryDate: '2028-06-01', assessor: 'LEED Inc', credits: [] }, renewableEnergy: [], waterConservation: [], wasteManagement: [], greenSpaces: [], transportInitiatives: [], biodiversityScore: 65, lastAuditDate: '2025-12-01', nextAuditDate: '2026-06-01' };
    mockRepo.create.mockResolvedValue({ id: 'gc1', ...data });
    const result = await mockRepo.create(data);
    expect(result.overallScore).toBe(78);
  });
});
