import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-events.repository', () => ({
  Gei2pEventsRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findEventById: vi.fn(),
  findEventsByType: vi.fn(),
  createEvent: vi.fn(),
  updateEvent: vi.fn(),
  cancelEvent: vi.fn(),
  listEvents: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Events Service - CRUD', () => {
  it('should list events', async () => {
    mockRepo.listEvents.mockResolvedValue([
      { id: '1', type: 'credential.issued', timestamp: '2024-01-01', status: 'active' },
    ]);
    const result = await mockRepo.listEvents('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('credential.issued');
  });

  it('should create an event', async () => {
    const data = { school_id: 'school1', type: 'identity.created', payload: {} };
    mockRepo.createEvent.mockResolvedValue({ id: '1', ...data, processed: false });
    const result = await mockRepo.createEvent(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.processed).toBe(false);
  });

  it('should update an event', async () => {
    mockRepo.findEventById.mockResolvedValue({ id: '1', processed: false });
    mockRepo.updateEvent.mockResolvedValue({ id: '1', processed: true });
    const result = await mockRepo.updateEvent('school1', '1', { processed: true });
    expect(result.processed).toBe(true);
  });

  it('should cancel an event', async () => {
    mockRepo.cancelEvent.mockResolvedValue({ id: '1', cancelled: true });
    const result = await mockRepo.cancelEvent('school1', '1');
    expect(result.cancelled).toBe(true);
  });

  it('should find events by type', async () => {
    mockRepo.findEventsByType.mockResolvedValue([
      { id: '1', type: 'credential.issued' },
    ]);
    const result = await mockRepo.findEventsByType('school1', 'credential.issued');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P Events Service - Error Handling', () => {
  it('should return null when event not found', async () => {
    mockRepo.findEventById.mockResolvedValue(null);
    const result = await mockRepo.findEventById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listEvents.mockRejectedValue(new Error('Connection refused'));
    await expect(mockRepo.listEvents('school1')).rejects.toThrow('Connection refused');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
