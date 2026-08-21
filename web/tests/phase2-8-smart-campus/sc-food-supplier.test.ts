import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScFoodSupplierService } from '@/features/smart-campus/services/sc-food-supplier.service';

describe('ScFoodSupplierService', () => {
  let service: ScFoodSupplierService;
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
    service = new ScFoodSupplierService(mockSupabase);
  });

  it('should get supplier by id', async () => {
    const result = await service.getSupplier('school-1', 'supplier-1');
    expect(result).toBeDefined();
  });

  it('should return supplier with correct data', async () => {
    const mockSupplier = { id: 'supplier-1', name: 'Fresh Foods Ltd', contact: '+2348012345678' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockSupplier, error: null });
    const result = await service.getSupplier('school-1', 'supplier-1');
    expect(result).toEqual(mockSupplier);
  });

  it('should handle error when getting supplier', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getSupplier('school-1', 'supplier-1');
    expect(result).toBeNull();
  });

  it('should get all suppliers for a school', async () => {
    const mockSuppliers = [{ id: 'supplier-1' }, { id: 'supplier-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSuppliers, error: null });
    const result = await service.getSuppliers('school-1');
    expect(result).toEqual(mockSuppliers);
  });

  it('should create a new supplier', async () => {
    const newSupplier = { name: 'Green Market', contact: '+2348098765432', address: '123 Market St' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'supplier-3', ...newSupplier }, error: null });
    const result = await service.createSupplier('school-1', newSupplier);
    expect(result).toBeDefined();
  });

  it('should update a supplier', async () => {
    const updates = { contact: '+2348011112222' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'supplier-1', ...updates }, error: null });
    const result = await service.updateSupplier('school-1', 'supplier-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a supplier', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteSupplier('school-1', 'supplier-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteSupplier('school-1', 'supplier-1');
    expect(result).toBe(false);
  });

  it('should get active suppliers', async () => {
    const mockSuppliers = [{ id: 'supplier-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSuppliers, error: null });
    const result = await service.getActiveSuppliers('school-1');
    expect(result).toEqual(mockSuppliers);
  });

  it('should search suppliers', async () => {
    const mockSuppliers = [{ id: 'supplier-1', name: 'Fresh Foods Ltd' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockSuppliers, error: null });
    const result = await service.searchSuppliers('school-1', 'Fresh');
    expect(result).toEqual(mockSuppliers);
  });

  it('should get supplier orders', async () => {
    const mockOrders = [{ id: 'order-1', supplier_id: 'supplier-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockOrders, error: null });
    const result = await service.getSupplierOrders('school-1', 'supplier-1');
    expect(result).toEqual(mockOrders);
  });

  it('should validate supplier data', () => {
    const result = service.validateSupplierData({ name: 'Fresh Foods', contact: '+2348012345678' });
    expect(result).toBe(true);
  });

  it('should reject invalid supplier data', () => {
    const result = service.validateSupplierData({ name: '', contact: '' });
    expect(result).toBe(false);
  });

  it('should get supplier ratings', async () => {
    const mockRatings = [{ supplier_id: 'supplier-1', rating: 4.5 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockRatings, error: null });
    const result = await service.getSupplierRatings('school-1', 'supplier-1');
    expect(result).toBeDefined();
  });

  it('should rate supplier', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { supplier_id: 'supplier-1', rating: 5 }, error: null });
    const result = await service.rateSupplier('school-1', 'supplier-1', 5);
    expect(result).toBeDefined();
  });

  it('should get supplier statistics', async () => {
    const mockStats = { total: 10, active: 8, inactive: 2 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getSupplierStatistics('school-1');
    expect(result).toBeDefined();
  });
});
