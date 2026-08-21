import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookReservationService } from '@/features/smart-campus/services/sc-book-reservation.service';

describe('ScBookReservationService', () => {
  let service: ScBookReservationService;
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
    service = new ScBookReservationService(mockSupabase);
  });

  it('should get reservation by id', async () => {
    const result = await service.getReservation('school-1', 'reservation-1');
    expect(result).toBeDefined();
  });

  it('should return reservation with correct data', async () => {
    const mockReservation = { id: 'reservation-1', book_id: 'book-1', student_id: 'student-1', status: 'pending' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReservation, error: null });
    const result = await service.getReservation('school-1', 'reservation-1');
    expect(result).toEqual(mockReservation);
  });

  it('should handle error when getting reservation', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getReservation('school-1', 'reservation-1');
    expect(result).toBeNull();
  });

  it('should get all reservations for a school', async () => {
    const mockReservations = [{ id: 'reservation-1' }, { id: 'reservation-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReservations, error: null });
    const result = await service.getReservations('school-1');
    expect(result).toEqual(mockReservations);
  });

  it('should create a new reservation', async () => {
    const newReservation = { book_id: 'book-1', student_id: 'student-1', priority: 1 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'reservation-3', ...newReservation }, error: null });
    const result = await service.createReservation('school-1', newReservation);
    expect(result).toBeDefined();
  });

  it('should update a reservation', async () => {
    const updates = { status: 'fulfilled' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'reservation-1', ...updates }, error: null });
    const result = await service.updateReservation('school-1', 'reservation-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a reservation', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteReservation('school-1', 'reservation-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteReservation('school-1', 'reservation-1');
    expect(result).toBe(false);
  });

  it('should get pending reservations', async () => {
    const mockReservations = [{ id: 'reservation-1', status: 'pending' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReservations, error: null });
    const result = await service.getPendingReservations('school-1');
    expect(result).toEqual(mockReservations);
  });

  it('should get reservations by student', async () => {
    const mockReservations = [{ id: 'reservation-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReservations, error: null });
    const result = await service.getReservationsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockReservations);
  });

  it('should get reservations by book', async () => {
    const mockReservations = [{ id: 'reservation-1', book_id: 'book-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReservations, error: null });
    const result = await service.getReservationsByBook('school-1', 'book-1');
    expect(result).toEqual(mockReservations);
  });

  it('should fulfill reservation', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'reservation-1', status: 'fulfilled' }, error: null });
    const result = await service.fulfillReservation('school-1', 'reservation-1');
    expect(result).toBeDefined();
  });

  it('should cancel reservation', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'reservation-1', status: 'cancelled' }, error: null });
    const result = await service.cancelReservation('school-1', 'reservation-1');
    expect(result).toBeDefined();
  });

  it('should check if student has reservation', async () => {
    const mockReservations = [{ id: 'reservation-1', student_id: 'student-1', book_id: 'book-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReservations, error: null });
    const result = await service.hasReservation('school-1', 'student-1', 'book-1');
    expect(result).toBe(true);
  });

  it('should validate reservation data', () => {
    const result = service.validateReservationData({ book_id: 'book-1', student_id: 'student-1', priority: 1 });
    expect(result).toBe(true);
  });

  it('should reject invalid reservation data', () => {
    const result = service.validateReservationData({ book_id: '', student_id: '', priority: -1 });
    expect(result).toBe(false);
  });
});
