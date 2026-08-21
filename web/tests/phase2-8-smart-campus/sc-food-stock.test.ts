import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScFoodStockService } from '@/features/smart-campus/services/sc-food-stock.service';

describe('ScFoodStockService', () => {
  let service: ScFoodStockService;
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
    service = new ScFoodStockService(mockSupabase);
  });

  it('should get food stock by id', async () => {
    const result = await service.getFoodStock('school-1', 'stock-1');
    expect(result).toBeDefined();
  });

  it('should return food stock with correct data', async () => {
    const mockStock = { id: 'stock-1', item_name: 'Rice', quantity: 50, unit: 'kg' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockStock, error: null });
    const result = await service.getFoodStock('school-1', 'stock-1');
    expect(result).toEqual(mockStock);
  });

  it('should handle error when getting food stock', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getFoodStock('school-1', 'stock-1');
    expect(result).toBeNull();
  });

  it('should get all food stock for a school', async () => {
    const mockStocks = [{ id: 'stock-1' }, { id: 'stock-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStocks, error: null });
    const result = await service.getFoodStocks('school-1');
    expect(result).toEqual(mockStocks);
  });

  it('should create new food stock', async () => {
    const newStock = { item_name: 'Beans', quantity: 30, unit: 'kg' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'stock-3', ...newStock }, error: null });
    const result = await service.createFoodStock('school-1', newStock);
    expect(result).toBeDefined();
  });

  it('should update food stock', async () => {
    const updates = { quantity: 45 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'stock-1', ...updates }, error: null });
    const result = await service.updateFoodStock('school-1', 'stock-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete food stock', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteFoodStock('school-1', 'stock-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteFoodStock('school-1', 'stock-1');
    expect(result).toBe(false);
  });

  it('should get low stock items', async () => {
    const mockStocks = [{ id: 'stock-1', quantity: 5 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStocks, error: null });
    const result = await service.getLowStockItems('school-1', 10);
    expect(result).toEqual(mockStocks);
  });

  it('should increase stock', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'stock-1', quantity: 50 }, error: null });
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'stock-1', quantity: 60 }, error: null });
    const result = await service.increaseStock('school-1', 'stock-1', 10);
    expect(result).toBeDefined();
  });

  it('should decrease stock', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'stock-1', quantity: 50 }, error: null });
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'stock-1', quantity: 40 }, error: null });
    const result = await service.decreaseStock('school-1', 'stock-1', 10);
    expect(result).toBeDefined();
  });

  it('should get stock by item name', async () => {
    const mockStock = { id: 'stock-1', item_name: 'Rice' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockStock, error: null });
    const result = await service.getStockByItemName('school-1', 'Rice');
    expect(result).toEqual(mockStock);
  });

  it('should validate stock data', () => {
    const result = service.validateStockData({ item_name: 'Rice', quantity: 50, unit: 'kg' });
    expect(result).toBe(true);
  });

  it('should reject invalid stock data', () => {
    const result = service.validateStockData({ item_name: '', quantity: -1, unit: '' });
    expect(result).toBe(false);
  });

  it('should get stock statistics', async () => {
    const mockStats = { total_items: 20, low_stock: 5, out_of_stock: 2 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getStockStatistics('school-1');
    expect(result).toBeDefined();
  });
});
