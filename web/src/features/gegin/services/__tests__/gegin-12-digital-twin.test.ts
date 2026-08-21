import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/digital-twin.repository', () => ({
  DigitalTwinRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findTwinById: vi.fn(),
  createTwin: vi.fn(),
  updateTwin: vi.fn(),
  deleteTwin: vi.fn(),
  listTwins: vi.fn(),
  getSimulationById: vi.fn(),
  createSimulation: vi.fn(),
  listSimulations: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Digital Twin Service - Twins', () => {
  it('should list digital twins', async () => {
    mockRepo.listTwins.mockResolvedValue([
      { id: '1', name: 'Campus Twin', type: 'campus' },
    ]);
    const result = await mockRepo.listTwins('school1');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('campus');
  });

  it('should create a digital twin', async () => {
    const data = { school_id: 'school1', name: 'Building Twin', type: 'building' };
    mockRepo.createTwin.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createTwin(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.name).toBe('Building Twin');
  });

  it('should update a digital twin', async () => {
    mockRepo.findTwinById.mockResolvedValue({ id: '1', name: 'Old Twin' });
    mockRepo.updateTwin.mockResolvedValue({ id: '1', name: 'Updated Twin' });
    const result = await mockRepo.updateTwin('school1', '1', { name: 'Updated Twin' });
    expect(result.name).toBe('Updated Twin');
  });

  it('should delete a digital twin', async () => {
    mockRepo.findTwinById.mockResolvedValue({ id: '1' });
    mockRepo.deleteTwin.mockResolvedValue(undefined);
    await expect(mockRepo.deleteTwin('school1', '1')).resolves.toBeUndefined();
  });

  it('should throw when twin not found', async () => {
    mockRepo.findTwinById.mockResolvedValue(null);
    const result = await mockRepo.findTwinById('school1', '999');
    expect(result).toBeNull();
  });
});

describe('Digital Twin Service - Simulations', () => {
  it('should list simulations', async () => {
    mockRepo.listSimulations.mockResolvedValue([
      { id: '1', twin_id: 't1', scenario: 'fire_drill' },
    ]);
    const result = await mockRepo.listSimulations('school1');
    expect(result).toHaveLength(1);
    expect(result[0].scenario).toBe('fire_drill');
  });

  it('should create a simulation', async () => {
    mockRepo.createSimulation.mockResolvedValue({ id: '1', twin_id: 't1', scenario: 'evacuation' });
    const result = await mockRepo.createSimulation({ school_id: 'school1', twin_id: 't1', scenario: 'evacuation' });
    expect(result).toHaveProperty('id', '1');
  });

  it('should handle DB errors', async () => {
    mockRepo.listTwins.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listTwins('school1')).rejects.toThrow('Timeout');
  });
});
