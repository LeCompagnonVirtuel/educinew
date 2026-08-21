import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScRfidService } from '@/features/smart-campus/services/sc-rfid.service';

describe('ScRfidService', () => {
  let service: ScRfidService;
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
    service = new ScRfidService(mockSupabase);
  });

  it('should get RFID tag by id', async () => {
    const result = await service.getRfidTag('school-1', 'rfid-1');
    expect(result).toBeDefined();
  });

  it('should return RFID tag with correct data', async () => {
    const mockTag = { id: 'rfid-1', tag_number: 'TAG-001', status: 'active', assigned_to: 'student-1' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockTag, error: null });
    const result = await service.getRfidTag('school-1', 'rfid-1');
    expect(result).toEqual(mockTag);
  });

  it('should handle error when getting RFID tag', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getRfidTag('school-1', 'rfid-1');
    expect(result).toBeNull();
  });

  it('should get all RFID tags for a school', async () => {
    const mockTags = [{ id: 'rfid-1' }, { id: 'rfid-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTags, error: null });
    const result = await service.getRfidTags('school-1');
    expect(result).toEqual(mockTags);
  });

  it('should create a new RFID tag', async () => {
    const newTag = { tag_number: 'TAG-003', status: 'available' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'rfid-3', ...newTag }, error: null });
    const result = await service.createRfidTag('school-1', newTag);
    expect(result).toBeDefined();
  });

  it('should update an RFID tag', async () => {
    const updates = { status: 'inactive' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'rfid-1', ...updates }, error: null });
    const result = await service.updateRfidTag('school-1', 'rfid-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an RFID tag', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteRfidTag('school-1', 'rfid-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteRfidTag('school-1', 'rfid-1');
    expect(result).toBe(false);
  });

  it('should assign RFID tag', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'rfid-1', assigned_to: 'student-1' }, error: null });
    const result = await service.assignTag('school-1', 'rfid-1', 'student-1');
    expect(result).toBeDefined();
  });

  it('should unassign RFID tag', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'rfid-1', assigned_to: null }, error: null });
    const result = await service.unassignTag('school-1', 'rfid-1');
    expect(result).toBeDefined();
  });

  it('should get tag by number', async () => {
    const mockTag = { id: 'rfid-1', tag_number: 'TAG-001' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockTag, error: null });
    const result = await service.getTagByNumber('school-1', 'TAG-001');
    expect(result).toEqual(mockTag);
  });

  it('should get available tags', async () => {
    const mockTags = [{ id: 'rfid-1', status: 'available' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockTags, error: null });
    const result = await service.getAvailableTags('school-1');
    expect(result).toEqual(mockTags);
  });

  it('should validate tag number', () => {
    const result = service.validateTagNumber('TAG-001');
    expect(result).toBe(true);
  });

  it('should reject invalid tag number', () => {
    const result = service.validateTagNumber('');
    expect(result).toBe(false);
  });

  it('should get RFID scan history', async () => {
    const mockScans = [{ id: 'scan-1', tag_id: 'rfid-1', timestamp: new Date() }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockScans, error: null });
    const result = await service.getScanHistory('school-1', 'rfid-1');
    expect(result).toEqual(mockScans);
  });
});
