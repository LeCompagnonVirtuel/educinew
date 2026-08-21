import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScEmergencyAlertService } from '@/features/smart-campus/services/sc-emergency-alert.service';

describe('ScEmergencyAlertService', () => {
  let service: ScEmergencyAlertService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScEmergencyAlertService(mockSupabase);
  });

  it('should get emergency alert by id', async () => {
    const result = await service.getEmergencyAlert('school-1', 'alert-1');
    expect(result).toBeDefined();
  });

  it('should return emergency alert with correct data', async () => {
    const mockAlert = { id: 'alert-1', type: 'accident', severity: 'critical', status: 'active' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAlert, error: null });
    const result = await service.getEmergencyAlert('school-1', 'alert-1');
    expect(result).toEqual(mockAlert);
  });

  it('should handle error when getting emergency alert', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getEmergencyAlert('school-1', 'alert-1');
    expect(result).toBeNull();
  });

  it('should get all emergency alerts for a school', async () => {
    const mockAlerts = [{ id: 'alert-1' }, { id: 'alert-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAlerts, error: null });
    const result = await service.getEmergencyAlerts('school-1');
    expect(result).toEqual(mockAlerts);
  });

  it('should create a new emergency alert', async () => {
    const newAlert = { type: 'accident', severity: 'critical', message: 'Bus accident reported' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'alert-3', ...newAlert }, error: null });
    const result = await service.createEmergencyAlert('school-1', newAlert);
    expect(result).toBeDefined();
  });

  it('should update an emergency alert', async () => {
    const updates = { status: 'resolved' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'alert-1', ...updates }, error: null });
    const result = await service.updateEmergencyAlert('school-1', 'alert-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an emergency alert', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteEmergencyAlert('school-1', 'alert-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteEmergencyAlert('school-1', 'alert-1');
    expect(result).toBe(false);
  });

  it('should get active emergency alerts', async () => {
    const mockAlerts = [{ id: 'alert-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAlerts, error: null });
    const result = await service.getActiveAlerts('school-1');
    expect(result).toEqual(mockAlerts);
  });

  it('should send emergency notification', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'notification-1' }, error: null });
    const result = await service.sendEmergencyNotification('school-1', 'alert-1', ['parent-1', 'parent-2']);
    expect(result).toBeDefined();
  });

  it('should resolve emergency alert', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'alert-1', status: 'resolved' }, error: null });
    const result = await service.resolveAlert('school-1', 'alert-1', 'All clear');
    expect(result).toBeDefined();
  });

  it('should get alerts by severity', async () => {
    const mockAlerts = [{ id: 'alert-1', severity: 'critical' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAlerts, error: null });
    const result = await service.getAlertsBySeverity('school-1', 'critical');
    expect(result).toEqual(mockAlerts);
  });

  it('should get alerts by type', async () => {
    const mockAlerts = [{ id: 'alert-1', type: 'accident' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAlerts, error: null });
    const result = await service.getAlertsByType('school-1', 'accident');
    expect(result).toEqual(mockAlerts);
  });

  it('should validate alert data', () => {
    const result = service.validateAlertData({ type: 'accident', severity: 'critical', message: 'Test' });
    expect(result).toBe(true);
  });

  it('should reject invalid alert data', () => {
    const result = service.validateAlertData({ type: '', severity: '', message: '' });
    expect(result).toBe(false);
  });

  it('should get alert statistics', async () => {
    const mockStats = { total: 5, active: 2, resolved: 3 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getAlertStatistics('school-1');
    expect(result).toBeDefined();
  });
});
