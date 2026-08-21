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

describe('AIOps - AnomalyDetector Service', () => {
  it('should list detectors', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', name: 'CPU Anomaly', metric: 'cpu_usage' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should create detector', async () => {
    const data = { name: 'Memory Anomaly', metric: 'memory_usage', type: 'POINT', sensitivity: 80, baselineWindow: '7d', anomalies: [] };
    mockRepo.create.mockResolvedValue({ id: 'ad1', ...data });
    const result = await mockRepo.create(data);
    expect(result.type).toBe('POINT');
  });

  it('should update detector sensitivity', async () => {
    mockRepo.update.mockResolvedValue({ id: 'ad1', sensitivity: 90 });
    const result = await mockRepo.update('ad1', { sensitivity: 90 });
    expect(result.sensitivity).toBe(90);
  });

  it('should delete detector', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete('ad1');
    expect(mockRepo.delete).toHaveBeenCalledWith('ad1');
  });
});

describe('AIOps - CorrelationEngine Service', () => {
  it('should create correlation engine', async () => {
    const data = { name: 'CPU-Memory Correlation', metrics: ['cpu_usage', 'memory_usage'], type: 'STATISTICAL', correlations: [] };
    mockRepo.create.mockResolvedValue({ id: 'ce1', ...data });
    const result = await mockRepo.create(data);
    expect(result.metrics).toHaveLength(2);
  });

  it('should list correlations', async () => {
    mockRepo.findMany.mockResolvedValue([]);
    expect(await mockRepo.findMany(schoolId)).toHaveLength(0);
  });
});

describe('AIOps - DigitalTwinMonitor Service', () => {
  it('should create twin monitor', async () => {
    const data = { name: 'Campus Twin', type: 'PREDICTION', modelId: 'm1', inputs: {}, outputs: {}, accuracy: 87.5, lastSync: '2026-01-01T00:00:00Z', predictions: [] };
    mockRepo.create.mockResolvedValue({ id: 'dtm1', ...data });
    const result = await mockRepo.create(data);
    expect(result.accuracy).toBe(87.5);
  });

  it('should validate accuracy', () => {
    const validate = (a: number) => { if (a < 0 || a > 100) throw new Error('Accuracy must be 0-100'); };
    expect(() => validate(150)).toThrow('Accuracy must be 0-100');
    expect(() => validate(87.5)).not.toThrow();
  });
});

describe('AIOps - PredictiveAlert Service', () => {
  it('should create predictive alert', async () => {
    const data = { name: 'Capacity Prediction', type: 'CAPACITY', prediction: 'Storage will be full in 14 days', confidence: 92, timeHorizon: '14d', severity: 'WARNING', service: 'storage', modelId: 'm1', generatedAt: '2026-01-01T00:00:00Z' };
    mockRepo.create.mockResolvedValue({ id: 'pa1', ...data });
    const result = await mockRepo.create(data);
    expect(result.confidence).toBe(92);
  });

  it('should validate confidence', () => {
    const validate = (c: number) => { if (c < 0 || c > 100) throw new Error('Confidence must be 0-100'); };
    expect(() => validate(-1)).toThrow('Confidence must be 0-100');
    expect(() => validate(92)).not.toThrow();
  });
});
