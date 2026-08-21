import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusIncidentService } from '@/features/smart-campus/services/sc-bus-incident.service';

describe('ScBusIncidentService', () => {
  let service: ScBusIncidentService;
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
    service = new ScBusIncidentService(mockSupabase);
  });

  it('should get incident by id', async () => {
    const result = await service.getIncident('school-1', 'incident-1');
    expect(result).toBeDefined();
  });

  it('should return incident with correct data', async () => {
    const mockIncident = { id: 'incident-1', bus_id: 'bus-1', type: 'accident', severity: 'high' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockIncident, error: null });
    const result = await service.getIncident('school-1', 'incident-1');
    expect(result).toEqual(mockIncident);
  });

  it('should handle error when getting incident', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getIncident('school-1', 'incident-1');
    expect(result).toBeNull();
  });

  it('should get all incidents for a school', async () => {
    const mockIncidents = [{ id: 'incident-1' }, { id: 'incident-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockIncidents, error: null });
    const result = await service.getIncidents('school-1');
    expect(result).toEqual(mockIncidents);
  });

  it('should create a new incident', async () => {
    const newIncident = { bus_id: 'bus-1', type: 'breakdown', description: 'Engine failure' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'incident-3', ...newIncident }, error: null });
    const result = await service.createIncident('school-1', newIncident);
    expect(result).toBeDefined();
  });

  it('should update an incident', async () => {
    const updates = { status: 'resolved' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'incident-1', ...updates }, error: null });
    const result = await service.updateIncident('school-1', 'incident-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an incident', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteIncident('school-1', 'incident-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteIncident('school-1', 'incident-1');
    expect(result).toBe(false);
  });

  it('should get incidents by bus', async () => {
    const mockIncidents = [{ id: 'incident-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockIncidents, error: null });
    const result = await service.getIncidentsByBus('school-1', 'bus-1');
    expect(result).toEqual(mockIncidents);
  });

  it('should get open incidents', async () => {
    const mockIncidents = [{ id: 'incident-1', status: 'open' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockIncidents, error: null });
    const result = await service.getOpenIncidents('school-1');
    expect(result).toEqual(mockIncidents);
  });

  it('should resolve an incident', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'incident-1', status: 'resolved' }, error: null });
    const result = await service.resolveIncident('school-1', 'incident-1', 'Repaired');
    expect(result).toBeDefined();
  });

  it('should escalate an incident', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'incident-1', priority: 'urgent' }, error: null });
    const result = await service.escalateIncident('school-1', 'incident-1');
    expect(result).toBeDefined();
  });

  it('should get incident statistics', async () => {
    const mockStats = { total: 10, open: 3, resolved: 7 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getIncidentStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should validate incident type', () => {
    const result = service.validateIncidentType('accident');
    expect(result).toBe(true);
  });

  it('should reject invalid incident type', () => {
    const result = service.validateIncidentType('invalid_type');
    expect(result).toBe(false);
  });

  it('should get incidents by date range', async () => {
    const mockIncidents = [{ id: 'incident-1', date: '2026-08-01' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockIncidents, error: null });
    const result = await service.getIncidentsByDateRange('school-1', '2026-08-01', '2026-08-03');
    expect(result).toEqual(mockIncidents);
  });
});
