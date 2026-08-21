import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMetricService } from '../../src/features/integration/services/metric.service';

describe('MetricService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getMetrics: vi.fn(),
      getMetricById: vi.fn(),
      createMetric: vi.fn(),
      updateMetric: vi.fn(),
      deleteMetric: vi.fn(),
      recordMetric: vi.fn(),
      getMetricValues: vi.fn(),
      getMetricStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createMetricService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getMetrics).toBeInstanceOf(Function);
    expect(service.getMetricById).toBeInstanceOf(Function);
    expect(service.createMetric).toBeInstanceOf(Function);
    expect(service.updateMetric).toBeInstanceOf(Function);
    expect(service.deleteMetric).toBeInstanceOf(Function);
    expect(service.recordMetric).toBeInstanceOf(Function);
    expect(service.getMetricValues).toBeInstanceOf(Function);
    expect(service.getMetricStats).toBeInstanceOf(Function);
  });

  describe('getMetrics', () => {
    it('should return metrics list', async () => {
      mockRepository.getMetrics.mockResolvedValue([{ id: 'met-1', name: 'API Response Time', type: 'gauge' }]);
      const service = createMetricService(mockRepository);
      const result = await service.getMetrics('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return metrics with filters', async () => {
      mockRepository.getMetrics.mockResolvedValue([{ id: 'met-1' }]);
      const service = createMetricService(mockRepository);
      await service.getMetrics('school-1', { type: 'counter' });
      expect(mockRepository.getMetrics).toHaveBeenCalledWith('school-1', { type: 'counter' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.getMetrics('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getMetrics.mockResolvedValue([]);
      const service = createMetricService(mockRepository);
      const result = await service.getMetrics('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated metrics', async () => {
      mockRepository.getMetrics.mockResolvedValue({ data: [{ id: 'met-1' }], total: 20 });
      const service = createMetricService(mockRepository);
      const result = await service.getMetrics('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by category', async () => {
      mockRepository.getMetrics.mockResolvedValue([{ id: 'met-1', category: 'performance' }]);
      const service = createMetricService(mockRepository);
      const result = await service.getMetrics('school-1', { category: 'performance' });
      expect(result).toHaveLength(1);
    });

    it('should return metrics with last value', async () => {
      mockRepository.getMetrics.mockResolvedValue([{ id: 'met-1', lastValue: 150, lastRecordedAt: '2024-01-01' }]);
      const service = createMetricService(mockRepository);
      const result = await service.getMetrics('school-1');
      expect(result[0].lastValue).toBe(150);
    });

    it('should handle repository errors', async () => {
      mockRepository.getMetrics.mockRejectedValue(new Error('DB error'));
      const service = createMetricService(mockRepository);
      await expect(service.getMetrics('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getMetricById', () => {
    it('should return a single metric', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1', name: 'API Response Time', type: 'gauge' });
      const service = createMetricService(mockRepository);
      const result = await service.getMetricById('met-1');
      expect(result.id).toBe('met-1');
    });

    it('should throw if metric not found', async () => {
      mockRepository.getMetricById.mockResolvedValue(null);
      const service = createMetricService(mockRepository);
      await expect(service.getMetricById('nonexistent')).rejects.toThrow('Metric not found');
    });

    it('should throw if id is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.getMetricById('')).rejects.toThrow('Metric ID is required');
    });

    it('should return metric with config', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1', config: { unit: 'ms', aggregation: 'avg' } });
      const service = createMetricService(mockRepository);
      const result = await service.getMetricById('met-1');
      expect(result.config.unit).toBe('ms');
    });

    it('should return metric with thresholds', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1', thresholds: [{ warning: 500, critical: 1000 }] });
      const service = createMetricService(mockRepository);
      const result = await service.getMetricById('met-1');
      expect(result.thresholds).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getMetricById.mockRejectedValue(new Error('Query timeout'));
      const service = createMetricService(mockRepository);
      await expect(service.getMetricById('met-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createMetric', () => {
    it('should create a metric', async () => {
      mockRepository.createMetric.mockResolvedValue({ id: 'met-1', name: 'API Response Time', type: 'gauge', status: 'active' });
      const service = createMetricService(mockRepository);
      const result = await service.createMetric('school-1', 'user-1', { name: 'API Response Time', type: 'gauge', category: 'performance' });
      expect(result.id).toBe('met-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.createMetric('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.createMetric('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.createMetric('school-1', 'user-1', { name: '' })).rejects.toThrow('Metric name is required');
    });

    it('should create metric with config', async () => {
      mockRepository.createMetric.mockResolvedValue({ id: 'met-1', config: { unit: 'ms', aggregation: 'avg' } });
      const service = createMetricService(mockRepository);
      const result = await service.createMetric('school-1', 'user-1', { name: 'T', type: 'gauge', config: { unit: 'ms', aggregation: 'avg' } });
      expect(result.config.unit).toBe('ms');
    });

    it('should create metric with thresholds', async () => {
      mockRepository.createMetric.mockResolvedValue({ id: 'met-1', thresholds: [{ warning: 500, critical: 1000 }] });
      const service = createMetricService(mockRepository);
      const result = await service.createMetric('school-1', 'user-1', { name: 'T', type: 'gauge', thresholds: [{ warning: 500, critical: 1000 }] });
      expect(result.thresholds).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createMetric.mockRejectedValue(new Error('Invalid metric'));
      const service = createMetricService(mockRepository);
      await expect(service.createMetric('school-1', 'user-1', { name: 'T', type: 'gauge' })).rejects.toThrow('Invalid metric');
    });
  });

  describe('updateMetric', () => {
    it('should update a metric', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1', name: 'Old' });
      mockRepository.updateMetric.mockResolvedValue({ id: 'met-1', name: 'Updated' });
      const service = createMetricService(mockRepository);
      const result = await service.updateMetric('met-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if metric not found', async () => {
      mockRepository.getMetricById.mockResolvedValue(null);
      const service = createMetricService(mockRepository);
      await expect(service.updateMetric('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.updateMetric('', 'user-1', { name: 'New' })).rejects.toThrow('Metric ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.updateMetric('met-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update metric config', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1' });
      mockRepository.updateMetric.mockResolvedValue({ id: 'met-1', config: { unit: 'seconds' } });
      const service = createMetricService(mockRepository);
      const result = await service.updateMetric('met-1', 'user-1', { config: { unit: 'seconds' } });
      expect(result.config.unit).toBe('seconds');
    });

    it('should handle update failure', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1' });
      mockRepository.updateMetric.mockRejectedValue(new Error('Cannot update'));
      const service = createMetricService(mockRepository);
      await expect(service.updateMetric('met-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteMetric', () => {
    it('should delete a metric', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1' });
      mockRepository.deleteMetric.mockResolvedValue({ success: true });
      const service = createMetricService(mockRepository);
      await service.deleteMetric('met-1', 'user-1');
      expect(mockRepository.deleteMetric).toHaveBeenCalledWith('met-1');
    });

    it('should throw if metric not found', async () => {
      mockRepository.getMetricById.mockResolvedValue(null);
      const service = createMetricService(mockRepository);
      await expect(service.deleteMetric('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.deleteMetric('', 'user-1')).rejects.toThrow('Metric ID is required');
    });

    it('should handle deletion with active alerts', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1' });
      mockRepository.deleteMetric.mockRejectedValue(new Error('Metric has active alerts'));
      const service = createMetricService(mockRepository);
      await expect(service.deleteMetric('met-1', 'user-1')).rejects.toThrow('Metric has active alerts');
    });

    it('should force delete metric', async () => {
      mockRepository.getMetricById.mockResolvedValue({ id: 'met-1' });
      mockRepository.deleteMetric.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createMetricService(mockRepository);
      const result = await service.deleteMetric('met-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('recordMetric', () => {
    it('should record a metric value', async () => {
      mockRepository.recordMetric.mockResolvedValue({ metricId: 'met-1', value: 150, recordedAt: '2024-01-01' });
      const service = createMetricService(mockRepository);
      const result = await service.recordMetric('met-1', { value: 150, tags: { endpoint: '/api/documents' } });
      expect(result.value).toBe(150);
    });

    it('should throw if metricId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.recordMetric('', { value: 100 })).rejects.toThrow('Metric ID is required');
    });

    it('should throw if value is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.recordMetric('met-1', {})).rejects.toThrow('Metric value is required');
    });

    it('should record with tags', async () => {
      mockRepository.recordMetric.mockResolvedValue({ metricId: 'met-1', value: 150, tags: { endpoint: '/api/documents' } });
      const service = createMetricService(mockRepository);
      const result = await service.recordMetric('met-1', { value: 150, tags: { endpoint: '/api/documents' } });
      expect(result.tags.endpoint).toBe('/api/documents');
    });

    it('should handle recording failure', async () => {
      mockRepository.recordMetric.mockRejectedValue(new Error('Invalid value'));
      const service = createMetricService(mockRepository);
      await expect(service.recordMetric('met-1', { value: -1 })).rejects.toThrow('Invalid value');
    });
  });

  describe('getMetricValues', () => {
    it('should return metric values', async () => {
      mockRepository.getMetricValues.mockResolvedValue([{ value: 150, recordedAt: '2024-01-01' }]);
      const service = createMetricService(mockRepository);
      const result = await service.getMetricValues('met-1');
      expect(result).toHaveLength(1);
    });

    it('should return values with filters', async () => {
      mockRepository.getMetricValues.mockResolvedValue([{ value: 150 }]);
      const service = createMetricService(mockRepository);
      await service.getMetricValues('met-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getMetricValues).toHaveBeenCalledWith('met-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should throw if metricId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.getMetricValues('')).rejects.toThrow('Metric ID is required');
    });

    it('should return paginated values', async () => {
      mockRepository.getMetricValues.mockResolvedValue({ data: [{ value: 150 }], total: 100 });
      const service = createMetricService(mockRepository);
      const result = await service.getMetricValues('met-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty values', async () => {
      mockRepository.getMetricValues.mockResolvedValue([]);
      const service = createMetricService(mockRepository);
      const result = await service.getMetricValues('met-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getMetricValues.mockRejectedValue(new Error('DB error'));
      const service = createMetricService(mockRepository);
      await expect(service.getMetricValues('met-1')).rejects.toThrow('DB error');
    });
  });

  describe('getMetricStats', () => {
    it('should return metric stats', async () => {
      mockRepository.getMetricStats.mockResolvedValue({ metricId: 'met-1', minValue: 50, maxValue: 300, avgValue: 150, totalRecords: 1000 });
      const service = createMetricService(mockRepository);
      const result = await service.getMetricStats('met-1');
      expect(result.minValue).toBe(50);
      expect(result.maxValue).toBe(300);
    });

    it('should return stats with filters', async () => {
      mockRepository.getMetricStats.mockResolvedValue({ stats: {} });
      const service = createMetricService(mockRepository);
      await service.getMetricStats('met-1', { since: '2024-01-01' });
      expect(mockRepository.getMetricStats).toHaveBeenCalledWith('met-1', { since: '2024-01-01' });
    });

    it('should throw if metricId is missing', async () => {
      const service = createMetricService(mockRepository);
      await expect(service.getMetricStats('')).rejects.toThrow('Metric ID is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getMetricStats.mockResolvedValue({ metricId: 'met-1', minValue: 0, maxValue: 0, avgValue: 0, totalRecords: 0 });
      const service = createMetricService(mockRepository);
      const result = await service.getMetricStats('met-1');
      expect(result.totalRecords).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getMetricStats.mockRejectedValue(new Error('DB error'));
      const service = createMetricService(mockRepository);
      await expect(service.getMetricStats('met-1')).rejects.toThrow('DB error');
    });
  });
});
