import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookCopyService } from '@/features/smart-campus/services/sc-book-copy.service';

describe('ScBookCopyService', () => {
  let service: ScBookCopyService;
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
    service = new ScBookCopyService(mockSupabase);
  });

  it('should get book copy by id', async () => {
    const result = await service.getBookCopy('school-1', 'copy-1');
    expect(result).toBeDefined();
  });

  it('should return book copy with correct data', async () => {
    const mockCopy = { id: 'copy-1', book_id: 'book-1', barcode: 'BC-001', status: 'available' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCopy, error: null });
    const result = await service.getBookCopy('school-1', 'copy-1');
    expect(result).toEqual(mockCopy);
  });

  it('should handle error when getting book copy', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getBookCopy('school-1', 'copy-1');
    expect(result).toBeNull();
  });

  it('should get all book copies for a school', async () => {
    const mockCopies = [{ id: 'copy-1' }, { id: 'copy-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCopies, error: null });
    const result = await service.getBookCopies('school-1');
    expect(result).toEqual(mockCopies);
  });

  it('should create a new book copy', async () => {
    const newCopy = { book_id: 'book-1', barcode: 'BC-003', condition: 'good' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'copy-3', ...newCopy }, error: null });
    const result = await service.createBookCopy('school-1', newCopy);
    expect(result).toBeDefined();
  });

  it('should update a book copy', async () => {
    const updates = { status: 'damaged' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'copy-1', ...updates }, error: null });
    const result = await service.updateBookCopy('school-1', 'copy-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a book copy', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteBookCopy('school-1', 'copy-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteBookCopy('school-1', 'copy-1');
    expect(result).toBe(false);
  });

  it('should get copies by book', async () => {
    const mockCopies = [{ id: 'copy-1', book_id: 'book-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCopies, error: null });
    const result = await service.getCopiesByBook('school-1', 'book-1');
    expect(result).toEqual(mockCopies);
  });

  it('should get available copies', async () => {
    const mockCopies = [{ id: 'copy-1', status: 'available' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCopies, error: null });
    const result = await service.getAvailableCopies('school-1', 'book-1');
    expect(result).toEqual(mockCopies);
  });

  it('should get copy by barcode', async () => {
    const mockCopy = { id: 'copy-1', barcode: 'BC-001' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCopy, error: null });
    const result = await service.getCopyByBarcode('school-1', 'BC-001');
    expect(result).toEqual(mockCopy);
  });

  it('should update copy status', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'copy-1', status: 'loaned' }, error: null });
    const result = await service.updateCopyStatus('school-1', 'copy-1', 'loaned');
    expect(result).toBeDefined();
  });

  it('should mark copy as damaged', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'copy-1', status: 'damaged' }, error: null });
    const result = await service.markAsDamaged('school-1', 'copy-1');
    expect(result).toBeDefined();
  });

  it('should mark copy as lost', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'copy-1', status: 'lost' }, error: null });
    const result = await service.markAsLost('school-1', 'copy-1');
    expect(result).toBeDefined();
  });

  it('should validate copy data', () => {
    const result = service.validateCopyData({ book_id: 'book-1', barcode: 'BC-001', condition: 'good' });
    expect(result).toBe(true);
  });

  it('should reject invalid copy data', () => {
    const result = service.validateCopyData({ book_id: '', barcode: '', condition: '' });
    expect(result).toBe(false);
  });
});
