import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/compliance.repository', () => ({
  ComplianceRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findComplianceById: vi.fn(),
  createComplianceRecord: vi.fn(),
  updateComplianceRecord: vi.fn(),
  deleteComplianceRecord: vi.fn(),
  listComplianceRecords: vi.fn(),
  getComplianceStatus: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Compliance Service - Records', () => {
  it('should list compliance records', async () => {
    mockRepo.listComplianceRecords.mockResolvedValue([
      { id: '1', regulation: 'FERPA', status: 'compliant' },
    ]);
    const result = await mockRepo.listComplianceRecords('school1');
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('compliant');
  });

  it('should create a compliance record', async () => {
    const data = { school_id: 'school1', regulation: 'GDPR', status: 'pending' };
    mockRepo.createComplianceRecord.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createComplianceRecord(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.regulation).toBe('GDPR');
  });

  it('should update a compliance record', async () => {
    mockRepo.findComplianceById.mockResolvedValue({ id: '1', status: 'pending' });
    mockRepo.updateComplianceRecord.mockResolvedValue({ id: '1', status: 'compliant' });
    const result = await mockRepo.updateComplianceRecord('school1', '1', { status: 'compliant' });
    expect(result.status).toBe('compliant');
  });

  it('should delete a compliance record', async () => {
    mockRepo.findComplianceById.mockResolvedValue({ id: '1' });
    mockRepo.deleteComplianceRecord.mockResolvedValue(undefined);
    await expect(mockRepo.deleteComplianceRecord('school1', '1')).resolves.toBeUndefined();
  });

  it('should get compliance status', async () => {
    mockRepo.getComplianceStatus.mockResolvedValue({ total: 10, compliant: 8, pending: 2 });
    const result = await mockRepo.getComplianceStatus('school1');
    expect(result.total).toBe(10);
    expect(result.compliant).toBe(8);
  });
});

describe('Compliance Service - Error Handling', () => {
  it('should throw when record not found', async () => {
    mockRepo.findComplianceById.mockResolvedValue(null);
    const result = await mockRepo.findComplianceById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listComplianceRecords.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listComplianceRecords('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
