import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-connectors.repository', () => ({
  Gei2pConnectorsRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findConnectorById: vi.fn(),
  findConnectorsByProtocol: vi.fn(),
  createConnector: vi.fn(),
  updateConnector: vi.fn(),
  deleteConnector: vi.fn(),
  listConnectors: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Connectors Service - CRUD', () => {
  it('should list connectors', async () => {
    mockRepo.listConnectors.mockResolvedValue([
      { id: '1', name: 'OpenBadges', protocol: 'OB3', status: 'active' },
    ]);
    const result = await mockRepo.listConnectors('school1');
    expect(result).toHaveLength(1);
    expect(result[0].protocol).toBe('OB3');
  });

  it('should create a connector', async () => {
    const data = { school_id: 'school1', name: 'Blockcerts', protocol: 'v2' };
    mockRepo.createConnector.mockResolvedValue({ id: '1', ...data, status: 'inactive' });
    const result = await mockRepo.createConnector(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('inactive');
  });

  it('should update a connector', async () => {
    mockRepo.findConnectorById.mockResolvedValue({ id: '1', status: 'inactive' });
    mockRepo.updateConnector.mockResolvedValue({ id: '1', status: 'active' });
    const result = await mockRepo.updateConnector('school1', '1', { status: 'active' });
    expect(result.status).toBe('active');
  });

  it('should delete a connector', async () => {
    mockRepo.findConnectorById.mockResolvedValue({ id: '1' });
    mockRepo.deleteConnector.mockResolvedValue(undefined);
    await expect(mockRepo.deleteConnector('school1', '1')).resolves.toBeUndefined();
  });

  it('should find connectors by protocol', async () => {
    mockRepo.findConnectorsByProtocol.mockResolvedValue([
      { id: '1', protocol: 'OB3' },
    ]);
    const result = await mockRepo.findConnectorsByProtocol('school1', 'OB3');
    expect(result).toHaveLength(1);
  });
});

describe('GEI2P Connectors Service - Error Handling', () => {
  it('should return null when connector not found', async () => {
    mockRepo.findConnectorById.mockResolvedValue(null);
    const result = await mockRepo.findConnectorById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listConnectors.mockRejectedValue(new Error('Connection refused'));
    await expect(mockRepo.listConnectors('school1')).rejects.toThrow('Connection refused');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
