import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScMenuService } from '@/features/smart-campus/services/sc-menu.service';

describe('ScMenuService', () => {
  let service: ScMenuService;
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
    service = new ScMenuService(mockSupabase);
  });

  it('should get menu by id', async () => {
    const result = await service.getMenu('school-1', 'menu-1');
    expect(result).toBeDefined();
  });

  it('should return menu with correct data', async () => {
    const mockMenu = { id: 'menu-1', name: 'Lunch Menu', date: '2026-08-03', meal_type: 'lunch' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockMenu, error: null });
    const result = await service.getMenu('school-1', 'menu-1');
    expect(result).toEqual(mockMenu);
  });

  it('should handle error when getting menu', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getMenu('school-1', 'menu-1');
    expect(result).toBeNull();
  });

  it('should get all menus for a school', async () => {
    const mockMenus = [{ id: 'menu-1' }, { id: 'menu-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMenus, error: null });
    const result = await service.getMenus('school-1');
    expect(result).toEqual(mockMenus);
  });

  it('should create a new menu', async () => {
    const newMenu = { name: 'Breakfast Menu', date: '2026-08-04', meal_type: 'breakfast' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'menu-3', ...newMenu }, error: null });
    const result = await service.createMenu('school-1', newMenu);
    expect(result).toBeDefined();
  });

  it('should update a menu', async () => {
    const updates = { name: 'Updated Lunch' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'menu-1', ...updates }, error: null });
    const result = await service.updateMenu('school-1', 'menu-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a menu', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteMenu('school-1', 'menu-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteMenu('school-1', 'menu-1');
    expect(result).toBe(false);
  });

  it('should get menu by date', async () => {
    const mockMenu = { id: 'menu-1', date: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockMenu, error: null });
    const result = await service.getMenuByDate('school-1', '2026-08-03');
    expect(result).toEqual(mockMenu);
  });

  it('should get menus by meal type', async () => {
    const mockMenus = [{ id: 'menu-1', meal_type: 'lunch' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMenus, error: null });
    const result = await service.getMenusByMealType('school-1', 'lunch');
    expect(result).toEqual(mockMenus);
  });

  it('should get weekly menu', async () => {
    const mockMenus = [{ id: 'menu-1', date: '2026-08-03' }, { id: 'menu-2', date: '2026-08-04' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMenus, error: null });
    const result = await service.getWeeklyMenu('school-1', '2026-08-03');
    expect(result).toEqual(mockMenus);
  });

  it('should add item to menu', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { menu_id: 'menu-1', meal_id: 'meal-1' }, error: null });
    const result = await service.addMenuItem('school-1', 'menu-1', 'meal-1');
    expect(result).toBeDefined();
  });

  it('should remove item from menu', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.removeMenuItem('school-1', 'menu-1', 'meal-1');
    expect(result).toBe(true);
  });

  it('should validate menu data', () => {
    const result = service.validateMenuData({ name: 'Lunch Menu', date: '2026-08-03', meal_type: 'lunch' });
    expect(result).toBe(true);
  });

  it('should reject invalid menu data', () => {
    const result = service.validateMenuData({ name: '', date: '', meal_type: '' });
    expect(result).toBe(false);
  });

  it('should get active menus', async () => {
    const mockMenus = [{ id: 'menu-1', is_active: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockMenus, error: null });
    const result = await service.getActiveMenus('school-1');
    expect(result).toEqual(mockMenus);
  });
});
