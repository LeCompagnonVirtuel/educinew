import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScReadingRoomService } from '@/features/smart-campus/services/sc-reading-room.service';

const mockSupabase = { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: {}, error: null }) };

describe('ScReadingRoomService', () => {
  let service: ScReadingRoomService;
  beforeEach(() => { vi.clearAllMocks(); service = new ScReadingRoomService(mockSupabase as never); });

  it('should get room by id', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', name: 'Main Hall' }, error: null }); const r = await service.getRoom('school-1', 'rr-1'); expect(r).toBeDefined(); });
  it('should return null when not found', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.getRoom('school-1', 'rr-nonexistent'); expect(r).toBeNull(); });
  it('should call sc_reading_rooms table', async () => { await service.getRoom('school-1', 'rr-1'); expect(mockSupabase.from).toHaveBeenCalledWith('sc_reading_rooms'); });
  it('should filter by school_id', async () => { await service.getRoom('school-1', 'rr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('school_id', 'school-1'); });
  it('should filter by id', async () => { await service.getRoom('school-1', 'rr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'rr-1'); });
  it('should handle db error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'DB error' } }); const r = await service.getRoom('school-1', 'rr-1'); expect(r).toBeNull(); });
  it('should return room with capacity', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', capacity: 50 }, error: null }); const r = await service.getRoom('school-1', 'rr-1'); expect(r).toHaveProperty('capacity'); });
  it('should return room with operating_hours', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', operating_hours: '8:00-20:00' }, error: null }); const r = await service.getRoom('school-1', 'rr-1'); expect(r).toHaveProperty('operating_hours'); });
  it('should get all rooms', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'rr-1' }], error: null }); const r = await service.getAllRooms('school-1'); expect(r).toBeDefined(); });
  it('should return empty array when no rooms', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getAllRooms('school-1'); expect(Array.isArray(r)).toBe(true); });
  it('should filter by status', async () => { await service.getAllRooms('school-1', { status: 'open' }); expect(mockSupabase.eq).toHaveBeenCalled(); });
  it('should handle error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getAllRooms('school-1'); expect(r).toEqual([]); });
  it('should create room', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1' }, error: null }); const r = await service.createRoom('school-1', { name: 'Main Hall', capacity: 50 }); expect(r).toHaveProperty('id'); });
  it('should call insert', async () => { await service.createRoom('school-1', { name: 'Main Hall', capacity: 50 }); expect(mockSupabase.insert).toHaveBeenCalled(); });
  it('should handle insert error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Insert failed' } }); const r = await service.createRoom('school-1', { name: 'Main Hall', capacity: 50 }); expect(r).toBeNull(); });
  it('should accept description field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', description: 'Quiet study' }, error: null }); const r = await service.createRoom('school-1', { name: 'Main Hall', capacity: 50, description: 'Quiet study' }); expect(r).toHaveProperty('description'); });
  it('should accept amenities field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', amenities: ['WiFi'] }, error: null }); const r = await service.createRoom('school-1', { name: 'Main Hall', capacity: 50, amenities: ['WiFi'] }); expect(r).toHaveProperty('amenities'); });
  it('should accept rules field', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', rules: 'No talking' }, error: null }); const r = await service.createRoom('school-1', { name: 'Main Hall', capacity: 50, rules: 'No talking' }); expect(r).toHaveProperty('rules'); });
  it('should update room', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1', capacity: 60 }, error: null }); const r = await service.updateRoom('school-1', 'rr-1', { capacity: 60 }); expect(r).toBeDefined(); });
  it('should call update', async () => { await service.updateRoom('school-1', 'rr-1', { capacity: 60 }); expect(mockSupabase.update).toHaveBeenCalled(); });
  it('should handle update error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Update failed' } }); const r = await service.updateRoom('school-1', 'rr-1', { capacity: 60 }); expect(r).toBeNull(); });
  it('should return null for non-existent room', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: null }); const r = await service.updateRoom('school-1', 'rr-nonexistent', { capacity: 60 }); expect(r).toBeNull(); });
  it('should delete room', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1' }, error: null }); const r = await service.deleteRoom('school-1', 'rr-1'); expect(r).toBeDefined(); });
  it('should call delete', async () => { await service.deleteRoom('school-1', 'rr-1'); expect(mockSupabase.delete).toHaveBeenCalled(); });
  it('should handle delete error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Delete failed' } }); const r = await service.deleteRoom('school-1', 'rr-1'); expect(r).toBeNull(); });
  it('should not throw on delete', async () => { mockSupabase.single.mockResolvedValue({ data: { id: 'rr-1' }, error: null }); await expect(service.deleteRoom('school-1', 'rr-1')).resolves.not.toThrow(); });
  it('should get room seats', async () => { mockSupabase.single.mockResolvedValue({ data: [{ id: 'seat-1' }], error: null }); const r = await service.getRoomSeats('school-1', 'rr-1'); expect(r).toBeDefined(); });
  it('should filter by room_id for seats', async () => { await service.getRoomSeats('school-1', 'rr-1'); expect(mockSupabase.eq).toHaveBeenCalledWith('room_id', 'rr-1'); });
  it('should return empty for no seats', async () => { mockSupabase.single.mockResolvedValue({ data: [], error: null }); const r = await service.getRoomSeats('school-1', 'rr-1'); expect(Array.isArray(r)).toBe(true); });
  it('should handle seats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRoomSeats('school-1', 'rr-1'); expect(r).toEqual([]); });
  it('should get room stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 5, total_seats: 200, avg_occupancy: 75 }, error: null }); const r = await service.getRoomStats('school-1'); expect(r).toBeDefined(); });
  it('should handle no rooms stats', async () => { mockSupabase.single.mockResolvedValue({ data: { total: 0, total_seats: 0, avg_occupancy: 0 }, error: null }); const r = await service.getRoomStats('school-1'); expect(r).toHaveProperty('total', 0); });
  it('should handle stats error', async () => { mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Error' } }); const r = await service.getRoomStats('school-1'); expect(r).toBeNull(); });
});
