import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScLibraryInventoryService } from '@/features/smart-campus/services/sc-library-inventory.service';

describe('ScLibraryInventoryService', () => {
  let service: ScLibraryInventoryService;
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
    service = new ScLibraryInventoryService(mockSupabase);
  });

  it('should get inventory item by id', async () => {
    const result = await service.getInventoryItem('school-1', 'inventory-1');
    expect(result).toBeDefined();
  });

  it('should return inventory item with correct data', async () => {
    const mockItem = { id: 'inventory-1', book_id: 'book-1', quantity: 10, location: 'Shelf A1' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockItem, error: null });
    const result = await service.getInventoryItem('school-1', 'inventory-1');
    expect(result).toEqual(mockItem);
  });

  it('should handle error when getting inventory item', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getInventoryItem('school-1', 'inventory-1');
    expect(result).toBeNull();
  });

  it('should get all inventory items for a school', async () => {
    const mockItems = [{ id: 'inventory-1' }, { id: 'inventory-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockItems, error: null });
    const result = await service.getInventoryItems('school-1');
    expect(result).toEqual(mockItems);
  });

  it('should create a new inventory item', async () => {
    const newItem = { book_id: 'book-1', quantity: 10, location: 'Shelf A1' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'inventory-3', ...newItem }, error: null });
    const result = await service.createInventoryItem('school-1', newItem);
    expect(result).toBeDefined();
  });

  it('should update an inventory item', async () => {
    const updates = { quantity: 15 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'inventory-1', ...updates }, error: null });
    const result = await service.updateInventoryItem('school-1', 'inventory-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an inventory item', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteInventoryItem('school-1', 'inventory-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteInventoryItem('school-1', 'inventory-1');
    expect(result).toBe(false);
  });

  it('should get inventory by book', async () => {
    const mockItems = [{ id: 'inventory-1', book_id: 'book-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockItems, error: null });
    const result = await service.getInventoryByBook('school-1', 'book-1');
    expect(result).toEqual(mockItems);
  });

  it('should get low stock items', async () => {
    const mockItems = [{ id: 'inventory-1', quantity: 2 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockItems, error: null });
    const result = await service.getLowStockItems('school-1', 5);
    expect(result).toEqual(mockItems);
  });

  it('should update stock quantity', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'inventory-1', quantity: 15 }, error: null });
    const result = await service.updateStock('school-1', 'inventory-1', 15);
    expect(result).toBeDefined();
  });

  it('should increase stock', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'inventory-1', quantity: 10 }, error: null });
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'inventory-1', quantity: 15 }, error: null });
    const result = await service.increaseStock('school-1', 'inventory-1', 5);
    expect(result).toBeDefined();
  });

  it('should decrease stock', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'inventory-1', quantity: 10 }, error: null });
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'inventory-1', quantity: 5 }, error: null });
    const result = await service.decreaseStock('school-1', 'inventory-1', 5);
    expect(result).toBeDefined();
  });

  it('should validate inventory data', () => {
    const result = service.validateInventoryData({ book_id: 'book-1', quantity: 10, location: 'Shelf A1' });
    expect(result).toBe(true);
  });

  it('should reject invalid inventory data', () => {
    const result = service.validateInventoryData({ book_id: '', quantity: -1, location: '' });
    expect(result).toBe(false);
  });

  it('should get inventory statistics', async () => {
    const mockStats = { total_items: 100, total_quantity: 500, low_stock: 10 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getInventoryStatistics('school-1');
    expect(result).toBeDefined();
  });
});
