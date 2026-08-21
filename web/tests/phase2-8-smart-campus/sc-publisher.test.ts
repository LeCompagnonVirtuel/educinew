import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScPublisherService } from '@/features/smart-campus/services/sc-publisher.service';

describe('ScPublisherService', () => {
  let service: ScPublisherService;
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
    service = new ScPublisherService(mockSupabase);
  });

  it('should get publisher by id', async () => {
    const result = await service.getPublisher('school-1', 'publisher-1');
    expect(result).toBeDefined();
  });

  it('should return publisher with correct data', async () => {
    const mockPublisher = { id: 'publisher-1', name: 'Lagos Press', location: 'Lagos' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockPublisher, error: null });
    const result = await service.getPublisher('school-1', 'publisher-1');
    expect(result).toEqual(mockPublisher);
  });

  it('should handle error when getting publisher', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getPublisher('school-1', 'publisher-1');
    expect(result).toBeNull();
  });

  it('should get all publishers for a school', async () => {
    const mockPublishers = [{ id: 'publisher-1' }, { id: 'publisher-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPublishers, error: null });
    const result = await service.getPublishers('school-1');
    expect(result).toEqual(mockPublishers);
  });

  it('should create a new publisher', async () => {
    const newPublisher = { name: 'Abuja Books', location: 'Abuja' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'publisher-3', ...newPublisher }, error: null });
    const result = await service.createPublisher('school-1', newPublisher);
    expect(result).toBeDefined();
  });

  it('should update a publisher', async () => {
    const updates = { location: 'Updated Location' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'publisher-1', ...updates }, error: null });
    const result = await service.updatePublisher('school-1', 'publisher-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a publisher', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deletePublisher('school-1', 'publisher-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deletePublisher('school-1', 'publisher-1');
    expect(result).toBe(false);
  });

  it('should get publisher by name', async () => {
    const mockPublisher = { id: 'publisher-1', name: 'Lagos Press' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockPublisher, error: null });
    const result = await service.getPublisherByName('school-1', 'Lagos Press');
    expect(result).toEqual(mockPublisher);
  });

  it('should search publishers', async () => {
    const mockPublishers = [{ id: 'publisher-1', name: 'Lagos Press' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPublishers, error: null });
    const result = await service.searchPublishers('school-1', 'Lagos');
    expect(result).toEqual(mockPublishers);
  });

  it('should get publisher books', async () => {
    const mockBooks = [{ id: 'book-1', publisher_id: 'publisher-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockBooks, error: null });
    const result = await service.getPublisherBooks('school-1', 'publisher-1');
    expect(result).toEqual(mockBooks);
  });

  it('should validate publisher name', () => {
    const result = service.validatePublisherName('Lagos Press');
    expect(result).toBe(true);
  });

  it('should reject empty publisher name', () => {
    const result = service.validatePublisherName('');
    expect(result).toBe(false);
  });

  it('should validate publisher data', () => {
    const result = service.validatePublisherData({ name: 'Lagos Press', location: 'Lagos' });
    expect(result).toBe(true);
  });

  it('should reject invalid publisher data', () => {
    const result = service.validatePublisherData({ name: '', location: '' });
    expect(result).toBe(false);
  });

  it('should get active publishers', async () => {
    const mockPublishers = [{ id: 'publisher-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockPublishers, error: null });
    const result = await service.getActivePublishers('school-1');
    expect(result).toEqual(mockPublishers);
  });
});
