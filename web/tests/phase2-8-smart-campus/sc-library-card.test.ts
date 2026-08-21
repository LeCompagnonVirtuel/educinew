import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScLibraryCardService } from '@/features/smart-campus/services/sc-library-card.service';

describe('ScLibraryCardService', () => {
  let service: ScLibraryCardService;
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
    service = new ScLibraryCardService(mockSupabase);
  });

  it('should get library card by id', async () => {
    const result = await service.getLibraryCard('school-1', 'card-1');
    expect(result).toBeDefined();
  });

  it('should return library card with correct data', async () => {
    const mockCard = { id: 'card-1', card_number: 'LIB-001', student_id: 'student-1', status: 'active' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCard, error: null });
    const result = await service.getLibraryCard('school-1', 'card-1');
    expect(result).toEqual(mockCard);
  });

  it('should handle error when getting library card', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getLibraryCard('school-1', 'card-1');
    expect(result).toBeNull();
  });

  it('should get all library cards for a school', async () => {
    const mockCards = [{ id: 'card-1' }, { id: 'card-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCards, error: null });
    const result = await service.getLibraryCards('school-1');
    expect(result).toEqual(mockCards);
  });

  it('should create a new library card', async () => {
    const newCard = { card_number: 'LIB-003', student_id: 'student-3', issue_date: '2026-08-03' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'card-3', ...newCard }, error: null });
    const result = await service.createLibraryCard('school-1', newCard);
    expect(result).toBeDefined();
  });

  it('should update a library card', async () => {
    const updates = { status: 'suspended' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'card-1', ...updates }, error: null });
    const result = await service.updateLibraryCard('school-1', 'card-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a library card', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteLibraryCard('school-1', 'card-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteLibraryCard('school-1', 'card-1');
    expect(result).toBe(false);
  });

  it('should get card by number', async () => {
    const mockCard = { id: 'card-1', card_number: 'LIB-001' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockCard, error: null });
    const result = await service.getCardByNumber('school-1', 'LIB-001');
    expect(result).toEqual(mockCard);
  });

  it('should get cards by student', async () => {
    const mockCards = [{ id: 'card-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCards, error: null });
    const result = await service.getCardsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockCards);
  });

  it('should get active cards', async () => {
    const mockCards = [{ id: 'card-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockCards, error: null });
    const result = await service.getActiveCards('school-1');
    expect(result).toEqual(mockCards);
  });

  it('should suspend card', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'card-1', status: 'suspended' }, error: null });
    const result = await service.suspendCard('school-1', 'card-1');
    expect(result).toBeDefined();
  });

  it('should reactivate card', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'card-1', status: 'active' }, error: null });
    const result = await service.reactivateCard('school-1', 'card-1');
    expect(result).toBeDefined();
  });

  it('should validate card number', () => {
    const result = service.validateCardNumber('LIB-001');
    expect(result).toBe(true);
  });

  it('should reject invalid card number', () => {
    const result = service.validateCardNumber('');
    expect(result).toBe(false);
  });

  it('should validate card data', () => {
    const result = service.validateCardData({ card_number: 'LIB-001', student_id: 'student-1', issue_date: '2026-08-03' });
    expect(result).toBe(true);
  });

  it('should reject invalid card data', () => {
    const result = service.validateCardData({ card_number: '', student_id: '', issue_date: '' });
    expect(result).toBe(false);
  });
});
