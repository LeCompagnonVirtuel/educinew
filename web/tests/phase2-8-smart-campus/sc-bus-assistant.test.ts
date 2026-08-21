import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScBusAssistantService } from '@/features/smart-campus/services/sc-bus-assistant.service';

describe('ScBusAssistantService', () => {
  let service: ScBusAssistantService;
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
    service = new ScBusAssistantService(mockSupabase);
  });

  it('should get assistant by id', async () => {
    const result = await service.getAssistant('school-1', 'assistant-1');
    expect(result).toBeDefined();
  });

  it('should return assistant with correct data', async () => {
    const mockAssistant = { id: 'assistant-1', name: 'Alice Johnson', phone: '+1234567890' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockAssistant, error: null });
    const result = await service.getAssistant('school-1', 'assistant-1');
    expect(result).toEqual(mockAssistant);
  });

  it('should handle error when getting assistant', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getAssistant('school-1', 'assistant-1');
    expect(result).toBeNull();
  });

  it('should get all assistants for a school', async () => {
    const mockAssistants = [{ id: 'assistant-1' }, { id: 'assistant-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssistants, error: null });
    const result = await service.getAssistants('school-1');
    expect(result).toEqual(mockAssistants);
  });

  it('should create a new assistant', async () => {
    const newAssistant = { name: 'Bob Williams', phone: '+0987654321' };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'assistant-3', ...newAssistant }, error: null });
    const result = await service.createAssistant('school-1', newAssistant);
    expect(result).toBeDefined();
  });

  it('should update an assistant', async () => {
    const updates = { phone: '+1122334455' };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'assistant-1', ...updates }, error: null });
    const result = await service.updateAssistant('school-1', 'assistant-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete an assistant', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteAssistant('school-1', 'assistant-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteAssistant('school-1', 'assistant-1');
    expect(result).toBe(false);
  });

  it('should get active assistants', async () => {
    const mockAssistants = [{ id: 'assistant-1', status: 'active' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssistants, error: null });
    const result = await service.getActiveAssistants('school-1');
    expect(result).toEqual(mockAssistants);
  });

  it('should get available assistants', async () => {
    const mockAssistants = [{ id: 'assistant-1', is_available: true }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssistants, error: null });
    const result = await service.getAvailableAssistants('school-1');
    expect(result).toEqual(mockAssistants);
  });

  it('should update assistant availability', async () => {
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'assistant-1', is_available: false }, error: null });
    const result = await service.updateAssistantAvailability('school-1', 'assistant-1', false);
    expect(result).toBeDefined();
  });

  it('should assign assistant to bus', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { assistant_id: 'assistant-1', bus_id: 'bus-1' }, error: null });
    const result = await service.assignToBus('school-1', 'assistant-1', 'bus-1');
    expect(result).toBeDefined();
  });

  it('should remove assistant from bus', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.removeFromBus('school-1', 'assistant-1', 'bus-1');
    expect(result).toBe(true);
  });

  it('should get assistant assignments', async () => {
    const mockAssignments = [{ assistant_id: 'assistant-1', bus_id: 'bus-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockAssignments, error: null });
    const result = await service.getAssignments('school-1', 'assistant-1');
    expect(result).toEqual(mockAssignments);
  });

  it('should validate phone number', () => {
    const result = service.validatePhoneNumber('+1234567890');
    expect(result).toBe(true);
  });

  it('should reject invalid phone number', () => {
    const result = service.validatePhoneNumber('123');
    expect(result).toBe(false);
  });
});
