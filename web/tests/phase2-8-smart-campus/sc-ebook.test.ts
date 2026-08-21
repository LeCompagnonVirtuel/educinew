import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScEbookService } from '@/features/smart-campus/services/sc-ebook.service';

describe('ScEbookService', () => {
  let service: ScEbookService;
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
    service = new ScEbookService(mockSupabase);
  });

  it('should get ebook by id', async () => {
    const result = await service.getEbook('school-1', 'ebook-1');
    expect(result).toBeDefined();
  });

  it('should return ebook with correct data', async () => {
    const mockEbook = { id: 'ebook-1', title: 'Digital Math', file_url: 'https://example.com/math.pdf', format: 'pdf' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockEbook, error: null });
    const result = await service.getEbook('school-1', 'ebook-1');
    expect(result).toEqual(mockEbook);
  });

  it('should handle error when getting ebook', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getEbook('school-1', 'ebook-1');
    expect(result).toBeNull();
  });

  it('should get all ebooks for a school', async () => {
    const mockEbooks = [{ id: 'ebook-1' }, { id: 'ebook-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockEbooks, error: null });
    const result = await service.getEbooks('school-1');
    expect(result).toEqual(mockEbooks);
  });

  it('should create a new ebook', async () => {
    const newEbook = { title: 'Digital Science', file_url: 'https://example.com/science.pdf', format: 'pdf' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'ebook-3', ...newEbook }, error: null });
    const result = await service.createEbook('school-1', newEbook);
    expect(result).toBeDefined();
  });

  it('should update an ebook', async () => {
    const updates = { title: 'Updated Digital Math' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'ebook-1', ...updates }, error: null });
    const result = await service.updateEbook('school-1', 'ebook-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an ebook', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteEbook('school-1', 'ebook-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteEbook('school-1', 'ebook-1');
    expect(result).toBe(false);
  });

  it('should get ebooks by format', async () => {
    const mockEbooks = [{ id: 'ebook-1', format: 'pdf' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockEbooks, error: null });
    const result = await service.getEbooksByFormat('school-1', 'pdf');
    expect(result).toEqual(mockEbooks);
  });

  it('should search ebooks', async () => {
    const mockEbooks = [{ id: 'ebook-1', title: 'Digital Math' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockEbooks, error: null });
    const result = await service.searchEbooks('school-1', 'Math');
    expect(result).toEqual(mockEbooks);
  });

  it('should get available ebooks', async () => {
    const mockEbooks = [{ id: 'ebook-1', is_available: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockEbooks, error: null });
    const result = await service.getAvailableEbooks('school-1');
    expect(result).toEqual(mockEbooks);
  });

  it('should validate ebook data', () => {
    const result = service.validateEbookData({ title: 'Digital Math', file_url: 'https://example.com/math.pdf', format: 'pdf' });
    expect(result).toBe(true);
  });

  it('should reject invalid ebook data', () => {
    const result = service.validateEbookData({ title: '', file_url: '', format: '' });
    expect(result).toBe(false);
  });

  it('should validate file format', () => {
    const result = service.validateFileFormat('pdf');
    expect(result).toBe(true);
  });

  it('should reject invalid file format', () => {
    const result = service.validateFileFormat('exe');
    expect(result).toBe(false);
  });

  it('should get ebook download count', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: { id: 'ebook-1', download_count: 150 }, error: null });
    const result = await service.getDownloadCount('school-1', 'ebook-1');
    expect(result).toBe(150);
  });

  it('should increment download count', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'ebook-1', download_count: 151 }, error: null });
    const result = await service.incrementDownloadCount('school-1', 'ebook-1');
    expect(result).toBeDefined();
  });
});
