import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScAudiobookService } from '@/features/smart-campus/services/sc-audiobook.service';

describe('ScAudiobookService', () => {
  let service: ScAudiobookService;
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
    service = new ScAudiobookService(mockSupabase);
  });

  it('should get audiobook by id', async () => {
    const result = await service.getAudiobook('school-1', 'audiobook-1');
    expect(result).toBeDefined();
  });

  it('should return audiobook with correct data', async () => {
    const mockAudiobook = { id: 'audiobook-1', title: 'Audio Math', duration_minutes: 120, narrator: 'John' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAudiobook, error: null });
    const result = await service.getAudiobook('school-1', 'audiobook-1');
    expect(result).toEqual(mockAudiobook);
  });

  it('should handle error when getting audiobook', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAudiobook('school-1', 'audiobook-1');
    expect(result).toBeNull();
  });

  it('should get all audiobooks for a school', async () => {
    const mockAudiobooks = [{ id: 'audiobook-1' }, { id: 'audiobook-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAudiobooks, error: null });
    const result = await service.getAudiobooks('school-1');
    expect(result).toEqual(mockAudiobooks);
  });

  it('should create a new audiobook', async () => {
    const newAudiobook = { title: 'Audio Science', duration_minutes: 90, narrator: 'Jane' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'audiobook-3', ...newAudiobook }, error: null });
    const result = await service.createAudiobook('school-1', newAudiobook);
    expect(result).toBeDefined();
  });

  it('should update an audiobook', async () => {
    const updates = { title: 'Updated Audio Math' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'audiobook-1', ...updates }, error: null });
    const result = await service.updateAudiobook('school-1', 'audiobook-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an audiobook', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAudiobook('school-1', 'audiobook-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAudiobook('school-1', 'audiobook-1');
    expect(result).toBe(false);
  });

  it('should search audiobooks', async () => {
    const mockAudiobooks = [{ id: 'audiobook-1', title: 'Audio Math' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAudiobooks, error: null });
    const result = await service.searchAudiobooks('school-1', 'Math');
    expect(result).toEqual(mockAudiobooks);
  });

  it('should get audiobooks by narrator', async () => {
    const mockAudiobooks = [{ id: 'audiobook-1', narrator: 'John' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAudiobooks, error: null });
    const result = await service.getAudiobooksByNarrator('school-1', 'John');
    expect(result).toEqual(mockAudiobooks);
  });

  it('should get available audiobooks', async () => {
    const mockAudiobooks = [{ id: 'audiobook-1', is_available: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAudiobooks, error: null });
    const result = await service.getAvailableAudiobooks('school-1');
    expect(result).toEqual(mockAudiobooks);
  });

  it('should validate audiobook data', () => {
    const result = service.validateAudiobookData({ title: 'Audio Math', duration_minutes: 120, narrator: 'John' });
    expect(result).toBe(true);
  });

  it('should reject invalid audiobook data', () => {
    const result = service.validateAudiobookData({ title: '', duration_minutes: -1, narrator: '' });
    expect(result).toBe(false);
  });

  it('should format duration', () => {
    const result = service.formatDuration(125);
    expect(result).toBe('2h 5m');
  });

  it('should get audiobook statistics', async () => {
    const mockStats = { total: 30, available: 25, borrowed: 5 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getAudiobookStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should get audiobook by title', async () => {
    const mockAudiobook = { id: 'audiobook-1', title: 'Audio Math' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAudiobook, error: null });
    const result = await service.getAudiobookByTitle('school-1', 'Audio Math');
    expect(result).toEqual(mockAudiobook);
  });
});
