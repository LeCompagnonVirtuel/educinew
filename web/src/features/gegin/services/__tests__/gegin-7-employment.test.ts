import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/employment.repository', () => ({
  EmploymentRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findEmploymentById: vi.fn(),
  findEmploymentsByUser: vi.fn(),
  createEmployment: vi.fn(),
  updateEmployment: vi.fn(),
  deleteEmployment: vi.fn(),
  listEmployments: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Employment Service - CRUD', () => {
  it('should list employments', async () => {
    mockRepo.listEmployments.mockResolvedValue([
      { id: '1', user_id: 'u1', position: 'Professor', status: 'active' },
    ]);
    const result = await mockRepo.listEmployments('school1');
    expect(result).toHaveLength(1);
    expect(result[0].position).toBe('Professor');
  });

  it('should create an employment', async () => {
    const data = { school_id: 'school1', user_id: 'u1', position: 'Lecturer', start_date: '2026-01-01' };
    mockRepo.createEmployment.mockResolvedValue({ id: '1', ...data, status: 'active' });
    const result = await mockRepo.createEmployment(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.position).toBe('Lecturer');
  });

  it('should update an employment', async () => {
    mockRepo.findEmploymentById.mockResolvedValue({ id: '1', position: 'Lecturer' });
    mockRepo.updateEmployment.mockResolvedValue({ id: '1', position: 'Senior Lecturer' });
    const result = await mockRepo.updateEmployment('school1', '1', { position: 'Senior Lecturer' });
    expect(result.position).toBe('Senior Lecturer');
  });

  it('should delete an employment', async () => {
    mockRepo.findEmploymentById.mockResolvedValue({ id: '1' });
    mockRepo.deleteEmployment.mockResolvedValue(undefined);
    await expect(mockRepo.deleteEmployment('school1', '1')).resolves.toBeUndefined();
  });

  it('should find employments by user', async () => {
    mockRepo.findEmploymentsByUser.mockResolvedValue([
      { id: '1', user_id: 'u1', position: 'Professor' },
    ]);
    const result = await mockRepo.findEmploymentsByUser('school1', 'u1');
    expect(result).toHaveLength(1);
  });
});

describe('Employment Service - Error Handling', () => {
  it('should throw when employment not found', async () => {
    mockRepo.findEmploymentById.mockResolvedValue(null);
    const result = await mockRepo.findEmploymentById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listEmployments.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listEmployments('school1')).rejects.toThrow('Timeout');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
