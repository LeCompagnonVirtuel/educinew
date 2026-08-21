import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBookingService } from '@/features/smart-campus/services/sc-booking.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue({ data: {}, error: null }),
};

describe('ScBookingService', () => {
  let service: ScBookingService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScBookingService(mockSupabase as never); });

  it('should get booking by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', resource_id: 'res-1' }, error: null });
    const result = await service.getBooking('school-1', 'bk-1');
    expect(result).toBeDefined();
  });

  it('should return null when not found', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await service.getBooking('school-1', 'bk-nonexistent');
    expect(result).toBeNull();
  });

  it('should call sc_bookings table', async () => {
    await service.getBooking('school-1', 'bk-1');
    expect(mockSupabase.from).toHaveBeenCalledWith('sc_bookings');
  });

  it('should filter by school_id', async () => {
    await service.getBooking('school-1', 'bk-1');
    expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1');
  });

  it('should filter by id', async () => {
    await service.getBooking('school-1', 'bk-1');
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'bk-1');
  });

  it('should handle db error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } });
    const result = await service.getBooking('school-1', 'bk-1');
    expect(result).toBeNull();
  });

  it('should return booking with status', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', status: 'confirmed' }, error: null });
    const result = await service.getBooking('school-1', 'bk-1');
    expect(result).toHaveProperty('status');
  });

  it('should return booking with time_slot', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', time_slot: '10:00-11:00' }, error: null });
    const result = await service.getBooking('school-1', 'bk-1');
    expect(result).toHaveProperty('time_slot');
  });

  it('should get all bookings', async () => {
    mockSupabase.single.mockResolvedValue({ data: [{ id: 'bk-1' }], error: null });
    const result = await service.getAllBookings('school-1');
    expect(result).toBeDefined();
  });

  it('should return empty array when no bookings', async () => {
    mockSupabase.single.mockResolvedValue({ data: [], error: null });
    const result = await service.getAllBookings('school-1');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should filter by resource_id', async () => {
    await service.getAllBookings('school-1', { resourceId: 'res-1' });
    expect(mockSupabase.eq).toHaveBeenCalled();
  });

  it('should filter by status', async () => {
    await service.getAllBookings('school-1', { status: 'confirmed' });
    expect(mockSupabase.eq).toHaveBeenCalled();
  });

  it('should handle error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.getAllBookings('school-1');
    expect(result).toEqual([]);
  });

  it('should create booking', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', status: 'pending' }, error: null });
    const result = await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1', time_slot: '10:00-11:00', date: '2026-01-20' });
    expect(result).toHaveProperty('id');
  });

  it('should call insert', async () => {
    await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1', time_slot: '10:00-11:00', date: '2026-01-20' });
    expect(mockSupabase.insert).toHaveBeenCalled();
  });

  it('should handle insert error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } });
    const result = await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1' });
    expect(result).toBeNull();
  });

  it('should set default status to pending', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', status: 'pending' }, error: null });
    const result = await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1' });
    expect(result).toHaveProperty('status', 'pending');
  });

  it('should accept purpose field', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', purpose: 'Study session' }, error: null });
    const result = await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1', purpose: 'Study session' });
    expect(result).toHaveProperty('purpose');
  });

  it('should accept attendees field', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', attendees: 5 }, error: null });
    const result = await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1', attendees: 5 });
    expect(result).toHaveProperty('attendees');
  });

  it('should accept notes field', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', notes: 'Need projector' }, error: null });
    const result = await service.createBooking('school-1', { resource_id: 'res-1', user_id: 'u-1', notes: 'Need projector' });
    expect(result).toHaveProperty('notes');
  });

  it('should update booking', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', status: 'confirmed' }, error: null });
    const result = await service.updateBooking('school-1', 'bk-1', { status: 'confirmed' });
    expect(result).toBeDefined();
  });

  it('should call update', async () => {
    await service.updateBooking('school-1', 'bk-1', { status: 'confirmed' });
    expect(mockSupabase.update).toHaveBeenCalled();
  });

  it('should filter by id on update', async () => {
    await service.updateBooking('school-1', 'bk-1', { status: 'confirmed' });
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'bk-1');
  });

  it('should handle update error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } });
    const result = await service.updateBooking('school-1', 'bk-1', { status: 'confirmed' });
    expect(result).toBeNull();
  });

  it('should update time_slot', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', time_slot: '11:00-12:00' }, error: null });
    const result = await service.updateBooking('school-1', 'bk-1', { time_slot: '11:00-12:00' });
    expect(result).toHaveProperty('time_slot');
  });

  it('should return null for non-existent booking', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await service.updateBooking('school-1', 'bk-nonexistent', { status: 'confirmed' });
    expect(result).toBeNull();
  });

  it('should cancel booking', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1', status: 'cancelled' }, error: null });
    const result = await service.cancelBooking('school-1', 'bk-1');
    expect(result).toHaveProperty('status', 'cancelled');
  });

  it('should delete booking', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1' }, error: null });
    const result = await service.deleteBooking('school-1', 'bk-1');
    expect(result).toBeDefined();
  });

  it('should call delete', async () => {
    await service.deleteBooking('school-1', 'bk-1');
    expect(mockSupabase.delete).toHaveBeenCalled();
  });

  it('should handle delete error', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } });
    const result = await service.deleteBooking('school-1', 'bk-1');
    expect(result).toBeNull();
  });

  it('should not throw on delete', async () => {
    mockSupabase.single.mockResolvedValue({ data: { id: 'bk-1' }, error: null });
    await expect(service.deleteBooking('school-1', 'bk-1')).resolves.not.toThrow();
  });

  it('should get resource bookings', async () => {
    mockSupabase.single.mockResolvedValue({ data: [{ id: 'bk-1' }], error: null });
    const result = await service.getResourceBookings('school-1', 'res-1');
    expect(result).toBeDefined();
  });

  it('should filter by resource_id', async () => {
    await service.getResourceBookings('school-1', 'res-1');
    expect(mockSupabase.eq).toHaveBeenCalledWith('resource_id', 'res-1');
  });

  it('should handle error on resource bookings', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } });
    const result = await service.getResourceBookings('school-1', 'res-1');
    expect(result).toEqual([]);
  });

  it('should return empty array for no resource bookings', async () => {
    mockSupabase.single.mockResolvedValue({ data: [], error: null });
    const result = await service.getResourceBookings('school-1', 'res-1');
    expect(Array.isArray(result)).toBe(true);
  });
});
