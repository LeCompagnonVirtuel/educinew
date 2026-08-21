import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusInsuranceService } from '@/features/smart-campus/services/sc-bus-insurance.service';

describe('ScBusInsuranceService', () => {
  let service: ScBusInsuranceService;
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
    service = new ScBusInsuranceService(mockSupabase);
  });

  it('should get insurance record by id', async () => {
    const result = await service.getInsuranceRecord('school-1', 'insurance-1');
    expect(result).toBeDefined();
  });

  it('should return insurance record with correct data', async () => {
    const mockRecord = { id: 'insurance-1', bus_id: 'bus-1', provider: 'Insurance Co', policy_number: 'POL-123' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.getInsuranceRecord('school-1', 'insurance-1');
    expect(result).toEqual(mockRecord);
  });

  it('should handle error when getting insurance record', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getInsuranceRecord('school-1', 'insurance-1');
    expect(result).toBeNull();
  });

  it('should get all insurance records for a school', async () => {
    const mockRecords = [{ id: 'insurance-1' }, { id: 'insurance-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getInsuranceRecords('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should create a new insurance record', async () => {
    const newRecord = { bus_id: 'bus-1', provider: 'New Insurance', policy_number: 'POL-456', premium: 50000 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'insurance-3', ...newRecord }, error: null });
    const result = await service.createInsuranceRecord('school-1', newRecord);
    expect(result).toBeDefined();
  });

  it('should update an insurance record', async () => {
    const updates = { premium: 55000 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'insurance-1', ...updates }, error: null });
    const result = await service.updateInsuranceRecord('school-1', 'insurance-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an insurance record', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteInsuranceRecord('school-1', 'insurance-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteInsuranceRecord('school-1', 'insurance-1');
    expect(result).toBe(false);
  });

  it('should get insurance by bus', async () => {
    const mockRecords = [{ id: 'insurance-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getInsuranceByBus('school-1', 'bus-1');
    expect(result).toEqual(mockRecords);
  });

  it('should get active insurance records', async () => {
    const mockRecords = [{ id: 'insurance-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getActiveInsurance('school-1');
    expect(result).toEqual(mockRecords);
  });

  it('should check if insurance is expired', async () => {
    const mockRecord = { id: 'insurance-1', expiry_date: '2025-01-01' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.isInsuranceExpired('school-1', 'insurance-1');
    expect(result).toBe(true);
  });

  it('should check if insurance is valid', async () => {
    const mockRecord = { id: 'insurance-1', expiry_date: '2027-01-01' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.isInsuranceValid('school-1', 'insurance-1');
    expect(result).toBe(true);
  });

  it('should get expiring insurance records', async () => {
    const mockRecords = [{ id: 'insurance-1', expiry_date: '2026-08-15' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getExpiringInsurance('school-1', 30);
    expect(result).toEqual(mockRecords);
  });

  it('should calculate total insurance cost', async () => {
    const mockRecords = [{ premium: 50000 }, { premium: 60000 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRecords, error: null });
    const result = await service.getTotalInsuranceCost('school-1');
    expect(result).toBe(110000);
  });

  it('should validate insurance data', () => {
    const result = service.validateInsuranceData({ provider: 'Test', policy_number: 'POL-123', premium: 50000 });
    expect(result).toBe(true);
  });

  it('should reject invalid insurance data', () => {
    const result = service.validateInsuranceData({ provider: '', policy_number: '', premium: -1 });
    expect(result).toBe(false);
  });

  it('should get insurance by policy number', async () => {
    const mockRecord = { id: 'insurance-1', policy_number: 'POL-123' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockRecord, error: null });
    const result = await service.getInsuranceByPolicyNumber('school-1', 'POL-123');
    expect(result).toEqual(mockRecord);
  });
});
