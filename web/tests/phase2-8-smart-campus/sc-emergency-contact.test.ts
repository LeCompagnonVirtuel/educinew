import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScEmergencyContactService } from '@/features/smart-campus/services/sc-emergency-contact.service';

describe('ScEmergencyContactService', () => {
  let service: ScEmergencyContactService;
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
    service = new ScEmergencyContactService(mockSupabase);
  });

  it('should get emergency contact by id', async () => {
    const result = await service.getEmergencyContact('school-1', 'contact-1');
    expect(result).toBeDefined();
  });

  it('should return emergency contact with correct data', async () => {
    const mockContact = { id: 'contact-1', student_id: 'student-1', name: 'John Doe', phone: '+2348012345678', relationship: 'Father' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockContact, error: null });
    const result = await service.getEmergencyContact('school-1', 'contact-1');
    expect(result).toEqual(mockContact);
  });

  it('should handle error when getting emergency contact', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getEmergencyContact('school-1', 'contact-1');
    expect(result).toBeNull();
  });

  it('should get all emergency contacts for a school', async () => {
    const mockContacts = [{ id: 'contact-1' }, { id: 'contact-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockContacts, error: null });
    const result = await service.getEmergencyContacts('school-1');
    expect(result).toEqual(mockContacts);
  });

  it('should create a new emergency contact', async () => {
    const newContact = { student_id: 'student-1', name: 'Jane Doe', phone: '+2348098765432', relationship: 'Mother' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'contact-3', ...newContact }, error: null });
    const result = await service.createEmergencyContact('school-1', newContact);
    expect(result).toBeDefined();
  });

  it('should update an emergency contact', async () => {
    const updates = { phone: '+2348011112222' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'contact-1', ...updates }, error: null });
    const result = await service.updateEmergencyContact('school-1', 'contact-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an emergency contact', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteEmergencyContact('school-1', 'contact-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteEmergencyContact('school-1', 'contact-1');
    expect(result).toBe(false);
  });

  it('should get contacts by student', async () => {
    const mockContacts = [{ id: 'contact-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockContacts, error: null });
    const result = await service.getContactsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockContacts);
  });

  it('should get primary contact', async () => {
    const mockContact = { id: 'contact-1', is_primary: true };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockContact, error: null });
    const result = await service.getPrimaryContact('school-1', 'student-1');
    expect(result).toEqual(mockContact);
  });

  it('should set primary contact', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'contact-1', is_primary: true }, error: null });
    const result = await service.setPrimaryContact('school-1', 'contact-1');
    expect(result).toBeDefined();
  });

  it('should get contacts by relationship', async () => {
    const mockContacts = [{ id: 'contact-1', relationship: 'Father' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockContacts, error: null });
    const result = await service.getContactsByRelationship('school-1', 'Father');
    expect(result).toEqual(mockContacts);
  });

  it('should validate contact data', () => {
    const result = service.validateContactData({ student_id: 'student-1', name: 'John Doe', phone: '+2348012345678', relationship: 'Father' });
    expect(result).toBe(true);
  });

  it('should reject invalid contact data', () => {
    const result = service.validateContactData({ student_id: '', name: '', phone: '', relationship: '' });
    expect(result).toBe(false);
  });

  it('should get contact statistics', async () => {
    const mockStats = { total: 200, primary: 150, secondary: 50 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getContactStatistics('school-1');
    expect(result).toBeDefined();
  });
});
