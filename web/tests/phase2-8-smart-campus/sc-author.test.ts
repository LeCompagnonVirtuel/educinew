import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScAuthorService } from '@/features/smart-campus/services/sc-author.service';

describe('ScAuthorService', () => {
  let service: ScAuthorService;
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
    service = new ScAuthorService(mockSupabase);
  });

  it('should get author by id', async () => {
    const result = await service.getAuthor('school-1', 'author-1');
    expect(result).toBeDefined();
  });

  it('should return author with correct data', async () => {
    const mockAuthor = { id: 'author-1', name: 'John Smith', bio: 'Famous author' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAuthor, error: null });
    const result = await service.getAuthor('school-1', 'author-1');
    expect(result).toEqual(mockAuthor);
  });

  it('should handle error when getting author', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAuthor('school-1', 'author-1');
    expect(result).toBeNull();
  });

  it('should get all authors for a school', async () => {
    const mockAuthors = [{ id: 'author-1' }, { id: 'author-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAuthors, error: null });
    const result = await service.getAuthors('school-1');
    expect(result).toEqual(mockAuthors);
  });

  it('should create a new author', async () => {
    const newAuthor = { name: 'Jane Doe', nationality: 'Nigerian' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'author-3', ...newAuthor }, error: null });
    const result = await service.createAuthor('school-1', newAuthor);
    expect(result).toBeDefined();
  });

  it('should update an author', async () => {
    const updates = { bio: 'Updated bio' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'author-1', ...updates }, error: null });
    const result = await service.updateAuthor('school-1', 'author-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an author', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAuthor('school-1', 'author-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAuthor('school-1', 'author-1');
    expect(result).toBe(false);
  });

  it('should get author by name', async () => {
    const mockAuthor = { id: 'author-1', name: 'John Smith' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAuthor, error: null });
    const result = await service.getAuthorByName('school-1', 'John Smith');
    expect(result).toEqual(mockAuthor);
  });

  it('should search authors', async () => {
    const mockAuthors = [{ id: 'author-1', name: 'John Smith' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAuthors, error: null });
    const result = await service.searchAuthors('school-1', 'John');
    expect(result).toEqual(mockAuthors);
  });

  it('should get author books', async () => {
    const mockBooks = [{ id: 'book-1', author_id: 'author-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBooks, error: null });
    const result = await service.getAuthorBooks('school-1', 'author-1');
    expect(result).toEqual(mockBooks);
  });

  it('should validate author name', () => {
    const result = service.validateAuthorName('John Smith');
    expect(result).toBe(true);
  });

  it('should reject empty author name', () => {
    const result = service.validateAuthorName('');
    expect(result).toBe(false);
  });

  it('should validate author data', () => {
    const result = service.validateAuthorData({ name: 'John Smith', nationality: 'Nigerian' });
    expect(result).toBe(true);
  });

  it('should reject invalid author data', () => {
    const result = service.validateAuthorData({ name: '', nationality: '' });
    expect(result).toBe(false);
  });

  it('should get active authors', async () => {
    const mockAuthors = [{ id: 'author-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAuthors, error: null });
    const result = await service.getActiveAuthors('school-1');
    expect(result).toEqual(mockAuthors);
  });
});
