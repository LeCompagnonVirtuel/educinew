import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovRealTimeAlertsService } from '../gov-real-time-alerts.service';
import { GovOfflineSyncService } from '../gov-offline-sync.service';
import { GovComplianceMonitoringService } from '../gov-compliance-monitoring.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findRealTimeAlertsById: vi.fn(),
  createRealTimeAlerts: vi.fn(),
  updateRealTimeAlerts: vi.fn(),
  deleteRealTimeAlerts: vi.fn(),
  findOfflineSyncById: vi.fn(),
  findAllOfflineSyncs: vi.fn(),
  createOfflineSync: vi.fn(),
  findComplianceMonitoringById: vi.fn(),
  createComplianceMonitoring: vi.fn(),
  deleteComplianceMonitoring: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovRealTimeAlertsService (Emergency)', () => {
  const service = new GovRealTimeAlertsService(mockSupabase);

  it('should create an emergency alert', async () => {
    mockRepo.createRealTimeAlerts.mockResolvedValue({ id: '1' });
    const result = await service.createRealTimeAlerts('school1', { type: 'earthquake' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should get an emergency alert', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue({ id: '1', type: 'flood' });
    const result = await service.getRealTimeAlerts('school1', '1');
    expect(result).toHaveProperty('type', 'flood');
  });

  it('should throw when not found', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue(null);
    await expect(service.getRealTimeAlerts('school1', '999')).rejects.toThrow();
  });

  it('should update an emergency alert', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue({ id: '1' });
    mockRepo.updateRealTimeAlerts.mockResolvedValue({ id: '1', status: 'resolved' });
    const result = await service.updateRealTimeAlerts('school1', '1', { status: 'resolved' });
    expect(result).toHaveProperty('status', 'resolved');
  });

  it('should delete an emergency alert', async () => {
    mockRepo.findRealTimeAlertsById.mockResolvedValue({ id: '1' });
    mockRepo.deleteRealTimeAlerts.mockResolvedValue(undefined);
    await expect(service.deleteRealTimeAlerts('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovOfflineSyncService', () => {
  const service = new GovOfflineSyncService(mockSupabase);

  it('should create an offline sync', async () => {
    mockRepo.createOfflineSync.mockResolvedValue({ id: '1' });
    const result = await service.createOfflineSync('school1', { data: 'test' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findOfflineSyncById.mockResolvedValue(null);
    await expect(service.getOfflineSync('school1', '999')).rejects.toThrow();
  });

  it('should list offline syncs', async () => {
    mockRepo.findAllOfflineSyncs.mockResolvedValue([]);
    const result = await service.listOfflineSyncs('school1');
    expect(result).toEqual([]);
  });
});

describe('GovComplianceMonitoringService', () => {
  const service = new GovComplianceMonitoringService(mockSupabase);

  it('should create a compliance check', async () => {
    mockRepo.createComplianceMonitoring.mockResolvedValue({ id: '1' });
    const result = await service.createComplianceMonitoring('school1', { rule: 'R01' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findComplianceMonitoringById.mockResolvedValue(null);
    await expect(service.getComplianceMonitoring('school1', '999')).rejects.toThrow();
  });

  it('should delete a compliance check', async () => {
    mockRepo.findComplianceMonitoringById.mockResolvedValue({ id: '1' });
    mockRepo.deleteComplianceMonitoring.mockResolvedValue(undefined);
    await expect(service.deleteComplianceMonitoring('school1', '1')).resolves.toBeUndefined();
  });
});
