import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useEnterpriseDashboard service', () => {
  const mockRepo = {
    getDashboard: vi.fn(),
    getKPIs: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return dashboard data', async () => {
    const dashboard = { schools: 10, users: 500, revenue: 50000 };
    mockRepo.getDashboard.mockResolvedValue(dashboard);
    const result = await mockRepo.getDashboard('ent-1');
    expect(result).toEqual(dashboard);
  });

  it('should throw when enterpriseId is missing for getDashboard', async () => {
    mockRepo.getDashboard.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.getDashboard('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should call repo.getDashboard with correct id', async () => {
    mockRepo.getDashboard.mockResolvedValue({ schools: 0 });
    await mockRepo.getDashboard('ent-1');
    expect(mockRepo.getDashboard).toHaveBeenCalledWith('ent-1');
  });

  it('should return KPIs data', async () => {
    const kpis = { activeUsers: 100, uptime: 99.9 };
    mockRepo.getKPIs.mockResolvedValue(kpis);
    const result = await mockRepo.getKPIs('ent-1');
    expect(result).toEqual(kpis);
  });

  it('should throw when enterpriseId is missing for getKPIs', async () => {
    mockRepo.getKPIs.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.getKPIs('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should call repo.getKPIs with correct id', async () => {
    mockRepo.getKPIs.mockResolvedValue({ activeUsers: 0 });
    await mockRepo.getKPIs('ent-1');
    expect(mockRepo.getKPIs).toHaveBeenCalledWith('ent-1');
  });

  it('should handle getDashboard repo error', async () => {
    mockRepo.getDashboard.mockRejectedValue(new Error('DB connection failed'));
    await expect(mockRepo.getDashboard('ent-1')).rejects.toThrow('DB connection failed');
  });

  it('should handle getKPIs repo error', async () => {
    mockRepo.getKPIs.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.getKPIs('ent-1')).rejects.toThrow('Timeout');
  });

  it('should return correct shape from getDashboard', async () => {
    const dashboard = { schools: 5, users: 100, revenue: 10000, alerts: [] };
    mockRepo.getDashboard.mockResolvedValue(dashboard);
    const result = await mockRepo.getDashboard('ent-1');
    expect(result).toHaveProperty('schools');
    expect(result).toHaveProperty('users');
    expect(result).toHaveProperty('revenue');
  });

  it('should return correct shape from getKPIs', async () => {
    const kpis = { activeUsers: 50, uptime: 99.5, errorRate: 0.1 };
    mockRepo.getKPIs.mockResolvedValue(kpis);
    const result = await mockRepo.getKPIs('ent-1');
    expect(result).toHaveProperty('activeUsers');
    expect(result).toHaveProperty('uptime');
  });

  it('should handle getDashboard with null result', async () => {
    mockRepo.getDashboard.mockResolvedValue(null);
    const result = await mockRepo.getDashboard('ent-1');
    expect(result).toBeNull();
  });

  it('should handle getKPIs with empty object', async () => {
    mockRepo.getKPIs.mockResolvedValue({});
    const result = await mockRepo.getKPIs('ent-1');
    expect(result).toEqual({});
  });

  it('should call getDashboard only once per invocation', async () => {
    mockRepo.getDashboard.mockResolvedValue({ schools: 0 });
    await mockRepo.getDashboard('ent-1');
    expect(mockRepo.getDashboard).toHaveBeenCalledTimes(1);
  });

  it('should call getKPIs only once per invocation', async () => {
    mockRepo.getKPIs.mockResolvedValue({ activeUsers: 0 });
    await mockRepo.getKPIs('ent-1');
    expect(mockRepo.getKPIs).toHaveBeenCalledTimes(1);
  });

  it('should handle network error on getDashboard', async () => {
    mockRepo.getDashboard.mockRejectedValue(new Error('Network error'));
    await expect(mockRepo.getDashboard('ent-1')).rejects.toThrow('Network error');
  });
});
