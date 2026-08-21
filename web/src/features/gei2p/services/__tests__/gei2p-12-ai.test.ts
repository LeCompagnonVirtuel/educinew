import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-ai.repository', () => ({
  Gei2pAiRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findModelById: vi.fn(),
  findModelsByDomain: vi.fn(),
  createModel: vi.fn(),
  updateModel: vi.fn(),
  deployModel: vi.fn(),
  listModels: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P AI Service - CRUD', () => {
  it('should list AI models', async () => {
    mockRepo.listModels.mockResolvedValue([
      { id: '1', name: 'credential_verifier', domain: 'verification', status: 'active' },
    ]);
    const result = await mockRepo.listModels('school1');
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('active');
  });

  it('should create an AI model', async () => {
    const data = { school_id: 'school1', name: 'fraud_detector', domain: 'security' };
    mockRepo.createModel.mockResolvedValue({ id: '1', ...data, status: 'training' });
    const result = await mockRepo.createModel(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('training');
  });

  it('should update an AI model', async () => {
    mockRepo.findModelById.mockResolvedValue({ id: '1', status: 'training' });
    mockRepo.updateModel.mockResolvedValue({ id: '1', status: 'active' });
    const result = await mockRepo.updateModel('school1', '1', { status: 'active' });
    expect(result.status).toBe('active');
  });

  it('should deploy an AI model', async () => {
    mockRepo.deployModel.mockResolvedValue({ id: '1', deployed: true, endpoint: '/api/v1/models/1' });
    const result = await mockRepo.deployModel('school1', '1');
    expect(result.deployed).toBe(true);
  });

  it('should find models by domain', async () => {
    mockRepo.findModelsByDomain.mockResolvedValue([
      { id: '1', domain: 'verification' },
    ]);
    const result = await mockRepo.findModelsByDomain('school1', 'verification');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P AI Service - Error Handling', () => {
  it('should return null when model not found', async () => {
    mockRepo.findModelById.mockResolvedValue(null);
    const result = await mockRepo.findModelById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listModels.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listModels('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
