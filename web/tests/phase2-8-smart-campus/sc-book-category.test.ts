import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookCategoryService } from '@/features/smart-campus/services/sc-book-category.service';

describe('ScBookCategoryService', () => {
  let service: ScBookCategoryService;
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
    service = new ScBookCategoryService(mockSupabase);
  });

  it('should get category by id', async () => {
    const result = await service.getCategory('school-1', 'category-1');
    expect(result).toBeDefined();
  });

  it('should return category with correct data', async () => {
    const mockCategory = { id: 'category-1', name: 'Mathematics', description: 'Math books' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCategory, error: null });
    const result = await service.getCategory('school-1', 'category-1');
    expect(result).toEqual(mockCategory);
  });

  it('should handle error when getting category', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getCategory('school-1', 'category-1');
    expect(result).toBeNull();
  });

  it('should get all categories for a school', async () => {
    const mockCategories = [{ id: 'category-1' }, { id: 'category-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCategories, error: null });
    const result = await service.getCategories('school-1');
    expect(result).toEqual(mockCategories);
  });

  it('should create a new category', async () => {
    const newCategory = { name: 'Science', description: 'Science books' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'category-3', ...newCategory }, error: null });
    const result = await service.createCategory('school-1', newCategory);
    expect(result).toBeDefined();
  });

  it('should update a category', async () => {
    const updates = { name: 'Updated Math' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'category-1', ...updates }, error: null });
    const result = await service.updateCategory('school-1', 'category-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a category', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteCategory('school-1', 'category-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteCategory('school-1', 'category-1');
    expect(result).toBe(false);
  });

  it('should get category by name', async () => {
    const mockCategory = { id: 'category-1', name: 'Mathematics' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCategory, error: null });
    const result = await service.getCategoryByName('school-1', 'Mathematics');
    expect(result).toEqual(mockCategory);
  });

  it('should get categories with book counts', async () => {
    const mockCategories = [{ id: 'category-1', name: 'Mathematics', book_count: 25 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCategories, error: null });
    const result = await service.getCategoriesWithCounts('school-1');
    expect(result).toEqual(mockCategories);
  });

  it('should validate category name', () => {
    const result = service.validateCategoryName('Mathematics');
    expect(result).toBe(true);
  });

  it('should reject empty category name', () => {
    const result = service.validateCategoryName('');
    expect(result).toBe(false);
  });

  it('should validate category data', () => {
    const result = service.validateCategoryData({ name: 'Mathematics', description: 'Math books' });
    expect(result).toBe(true);
  });

  it('should reject invalid category data', () => {
    const result = service.validateCategoryData({ name: '', description: '' });
    expect(result).toBe(false);
  });

  it('should get active categories', async () => {
    const mockCategories = [{ id: 'category-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCategories, error: null });
    const result = await service.getActiveCategories('school-1');
    expect(result).toEqual(mockCategories);
  });
});
