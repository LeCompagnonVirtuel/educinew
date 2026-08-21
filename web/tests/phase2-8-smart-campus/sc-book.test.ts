import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookService } from '@/features/smart-campus/services/sc-book.service';

describe('ScBookService', () => {
  let service: ScBookService;
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
    service = new ScBookService(mockSupabase);
  });

  it('should get book by id', async () => {
    const result = await service.getBook('school-1', 'book-1');
    expect(result).toBeDefined();
  });

  it('should return book with correct data', async () => {
    const mockBook = { id: 'book-1', title: 'Math 101', isbn: '978-3-16-148410-0' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockBook, error: null });
    const result = await service.getBook('school-1', 'book-1');
    expect(result).toEqual(mockBook);
  });

  it('should handle error when getting book', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getBook('school-1', 'book-1');
    expect(result).toBeNull();
  });

  it('should get all books for a school', async () => {
    const mockBooks = [{ id: 'book-1' }, { id: 'book-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBooks, error: null });
    const result = await service.getBooks('school-1');
    expect(result).toEqual(mockBooks);
  });

  it('should create a new book', async () => {
    const newBook = { title: 'Science 101', isbn: '978-3-16-148410-1', author_id: 'author-1' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'book-3', ...newBook }, error: null });
    const result = await service.createBook('school-1', newBook);
    expect(result).toBeDefined();
  });

  it('should update a book', async () => {
    const updates = { title: 'Updated Math' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'book-1', ...updates }, error: null });
    const result = await service.updateBook('school-1', 'book-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a book', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteBook('school-1', 'book-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteBook('school-1', 'book-1');
    expect(result).toBe(false);
  });

  it('should get book by ISBN', async () => {
    const mockBook = { id: 'book-1', isbn: '978-3-16-148410-0' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockBook, error: null });
    const result = await service.getBookByIsbn('school-1', '978-3-16-148410-0');
    expect(result).toEqual(mockBook);
  });

  it('should search books by title', async () => {
    const mockBooks = [{ id: 'book-1', title: 'Math 101' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBooks, error: null });
    const result = await service.searchBooks('school-1', 'Math');
    expect(result).toEqual(mockBooks);
  });

  it('should get books by category', async () => {
    const mockBooks = [{ id: 'book-1', category_id: 'cat-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBooks, error: null });
    const result = await service.getBooksByCategory('school-1', 'cat-1');
    expect(result).toEqual(mockBooks);
  });

  it('should get available books', async () => {
    const mockBooks = [{ id: 'book-1', available_copies: 5 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBooks, error: null });
    const result = await service.getAvailableBooks('school-1');
    expect(result).toEqual(mockBooks);
  });

  it('should validate ISBN format', () => {
    const result = service.validateIsbn('978-3-16-148410-0');
    expect(result).toBe(true);
  });

  it('should reject invalid ISBN', () => {
    const result = service.validateIsbn('INVALID');
    expect(result).toBe(false);
  });

  it('should get book statistics', async () => {
    const mockStats = { total: 100, available: 80, loaned: 20 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getBookStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should check book availability', async () => {
    const mockBook = { id: 'book-1', available_copies: 3 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockBook, error: null });
    const result = await service.checkAvailability('school-1', 'book-1');
    expect(result).toBe(true);
  });
});
