import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useEnterpriseMonitoring service', () => {
  const mockRepo = {
    getMonitoringEvents: vi.fn(),
    resolveMonitoringEvent: vi.fn(),
    getHealth: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return monitoring events', async () => {
    const events = [{ id: 'e1', type: 'alert', message: 'High CPU' }];
    mockRepo.getMonitoringEvents.mockResolvedValue(events);
    const result = await mockRepo.getMonitoringEvents('ent-1');
    expect(result).toHaveLength(1);
  });

  it('should throw when enterpriseId is missing', async () => {
    mockRepo.getMonitoringEvents.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.getMonitoringEvents('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should resolve a monitoring event', async () => {
    const resolved = { id: 'e1', status: 'resolved' };
    mockRepo.resolveMonitoringEvent.mockResolvedValue(resolved);
    const result = await mockRepo.resolveMonitoringEvent('ent-1', 'e1', 'Fixed by restarting');
    expect(result.status).toBe('resolved');
  });

  it('should return health status', async () => {
    const health = { status: 'healthy', uptime: 99.99 };
    mockRepo.getHealth.mockResolvedValue(health);
    const result = await mockRepo.getHealth('ent-1');
    expect(result.status).toBe('healthy');
  });

  it('should throw when enterpriseId is empty for getHealth', async () => {
    mockRepo.getHealth.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.getHealth('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should handle empty events list', async () => {
    mockRepo.getMonitoringEvents.mockResolvedValue([]);
    const result = await mockRepo.getMonitoringEvents('ent-1');
    expect(result).toEqual([]);
  });

  it('should pass filters to getMonitoringEvents', async () => {
    mockRepo.getMonitoringEvents.mockResolvedValue([]);
    const filters = { severity: 'critical' };
    await mockRepo.getMonitoringEvents('ent-1', filters);
    expect(mockRepo.getMonitoringEvents).toHaveBeenCalledWith('ent-1', filters);
  });

  it('should resolve event without resolution text', async () => {
    const resolved = { id: 'e2', status: 'resolved' };
    mockRepo.resolveMonitoringEvent.mockResolvedValue(resolved);
    const result = await mockRepo.resolveMonitoringEvent('ent-1', 'e2');
    expect(result.status).toBe('resolved');
  });

  it('should return degraded health', async () => {
    const health = { status: 'degraded', uptime: 95.0 };
    mockRepo.getHealth.mockResolvedValue(health);
    const result = await mockRepo.getHealth('ent-1');
    expect(result.status).toBe('degraded');
  });

  it('should handle repo error on getMonitoringEvents', async () => {
    mockRepo.getMonitoringEvents.mockRejectedValue(new Error('Connection timeout'));
    await expect(mockRepo.getMonitoringEvents('ent-1')).rejects.toThrow('Connection timeout');
  });

  it('should handle repo error on resolveMonitoringEvent', async () => {
    mockRepo.resolveMonitoringEvent.mockRejectedValue(new Event('Event not found'));
    await expect(mockRepo.resolveMonitoringEvent('ent-1', 'bad-id')).rejects.toThrow();
  });

  it('should handle repo error on getHealth', async () => {
    mockRepo.getHealth.mockRejectedValue(new Error('Service unavailable'));
    await expect(mockRepo.getHealth('ent-1')).rejects.toThrow('Service unavailable');
  });

  it('should return multiple events', async () => {
    const events = [
      { id: 'e1', type: 'cpu' },
      { id: 'e2', type: 'memory' },
      { id: 'e3', type: 'disk' },
    ];
    mockRepo.getMonitoringEvents.mockResolvedValue(events);
    const result = await mockRepo.getMonitoringEvents('ent-1');
    expect(result).toHaveLength(3);
  });

  it('should call resolveMonitoringEvent with correct params', async () => {
    mockRepo.resolveMonitoringEvent.mockResolvedValue({ id: 'e1' });
    await mockRepo.resolveMonitoringEvent('ent-1', 'e1', 'Resolved');
    expect(mockRepo.resolveMonitoringEvent).toHaveBeenCalledWith('ent-1', 'e1', 'Resolved');
  });

  it('should return unhealthy status', async () => {
    const health = { status: 'unhealthy', uptime: 80.0 };
    mockRepo.getHealth.mockResolvedValue(health);
    const result = await mockRepo.getHealth('ent-1');
    expect(result.status).toBe('unhealthy');
  });
});
