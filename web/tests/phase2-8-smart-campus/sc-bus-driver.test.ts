import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusDriverService } from '@/features/smart-campus/services/sc-bus-driver.service';

describe('ScBusDriverService', () => {
  let service: ScBusDriverService;
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
    service = new ScBusDriverService(mockSupabase);
  });

  it('should get driver by id', async () => {
    const result = await service.getDriver('school-1', 'driver-1');
    expect(result).toBeDefined();
  });

  it('should return driver with correct data', async () => {
    const mockDriver = { id: 'driver-1', name: 'John Doe', license_number: 'DL-12345' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockDriver, error: null });
    const result = await service.getDriver('school-1', 'driver-1');
    expect(result).toEqual(mockDriver);
  });

  it('should handle error when getting driver', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getDriver('school-1', 'driver-1');
    expect(result).toBeNull();
  });

  it('should get all drivers for a school', async () => {
    const mockDrivers = [{ id: 'driver-1' }, { id: 'driver-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockDrivers, error: null });
    const result = await service.getDrivers('school-1');
    expect(result).toEqual(mockDrivers);
  });

  it('should create a new driver', async () => {
    const newDriver = { name: 'Jane Smith', license_number: 'DL-67890' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'driver-3', ...newDriver }, error: null });
    const result = await service.createDriver('school-1', newDriver);
    expect(result).toBeDefined();
  });

  it('should update a driver', async () => {
    const updates = { phone: '+1234567890' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'driver-1', ...updates }, error: null });
    const result = await service.updateDriver('school-1', 'driver-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a driver', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteDriver('school-1', 'driver-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteDriver('school-1', 'driver-1');
    expect(result).toBe(false);
  });

  it('should get driver by license number', async () => {
    const mockDriver = { id: 'driver-1', license_number: 'DL-12345' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockDriver, error: null });
    const result = await service.getDriverByLicense('school-1', 'DL-12345');
    expect(result).toEqual(mockDriver);
  });

  it('should get active drivers', async () => {
    const mockDrivers = [{ id: 'driver-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockDrivers, error: null });
    const result = await service.getActiveDrivers('school-1');
    expect(result).toEqual(mockDrivers);
  });

  it('should get available drivers', async () => {
    const mockDrivers = [{ id: 'driver-1', is_available: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockDrivers, error: null });
    const result = await service.getAvailableDrivers('school-1');
    expect(result).toEqual(mockDrivers);
  });

  it('should update driver availability', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'driver-1', is_available: false }, error: null });
    const result = await service.updateDriverAvailability('school-1', 'driver-1', false);
    expect(result).toBeDefined();
  });

  it('should validate license number format', () => {
    const result = service.validateLicenseNumber('DL-12345');
    expect(result).toBe(true);
  });

  it('should reject invalid license number', () => {
    const result = service.validateLicenseNumber('INVALID');
    expect(result).toBe(false);
  });

  it('should get driver trips history', async () => {
    const mockTrips = [{ id: 'trip-1', driver_id: 'driver-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTrips, error: null });
    const result = await service.getDriverTrips('school-1', 'driver-1');
    expect(result).toEqual(mockTrips);
  });
});
