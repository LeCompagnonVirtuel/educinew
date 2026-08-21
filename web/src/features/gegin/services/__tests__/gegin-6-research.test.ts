import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/research.repository', () => ({
  ResearchRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findProjectById: vi.fn(),
  findProjectsByUser: vi.fn(),
  createProject: vi.fn(),
  updateProject: vi.fn(),
  deleteProject: vi.fn(),
  listProjects: vi.fn(),
  findPublicationById: vi.fn(),
  createPublication: vi.fn(),
  listPublications: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Research Service - Projects', () => {
  it('should list research projects', async () => {
    mockRepo.listProjects.mockResolvedValue([
      { id: '1', title: 'AI in Education', status: 'active' },
    ]);
    const result = await mockRepo.listProjects('school1');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('AI in Education');
  });

  it('should create a research project', async () => {
    const data = { school_id: 'school1', title: 'ML Project', status: 'active' };
    mockRepo.createProject.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.createProject(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.title).toBe('ML Project');
  });

  it('should update a research project', async () => {
    mockRepo.findProjectById.mockResolvedValue({ id: '1', status: 'active' });
    mockRepo.updateProject.mockResolvedValue({ id: '1', status: 'completed' });
    const result = await mockRepo.updateProject('school1', '1', { status: 'completed' });
    expect(result.status).toBe('completed');
  });

  it('should delete a research project', async () => {
    mockRepo.findProjectById.mockResolvedValue({ id: '1' });
    mockRepo.deleteProject.mockResolvedValue(undefined);
    await expect(mockRepo.deleteProject('school1', '1')).resolves.toBeUndefined();
  });

  it('should find projects by user', async () => {
    mockRepo.findProjectsByUser.mockResolvedValue([
      { id: '1', user_id: 'u1', title: 'Research A' },
    ]);
    const result = await mockRepo.findProjectsByUser('school1', 'u1');
    expect(result).toHaveLength(1);
  });
});

describe('Research Service - Publications', () => {
  it('should list publications', async () => {
    mockRepo.listPublications.mockResolvedValue([
      { id: '1', title: 'Edu AI Paper', type: 'journal' },
    ]);
    const result = await mockRepo.listPublications('school1');
    expect(result).toHaveLength(1);
  });

  it('should create a publication', async () => {
    mockRepo.createPublication.mockResolvedValue({ id: '1', title: 'New Paper' });
    const result = await mockRepo.createPublication({ school_id: 'school1', title: 'New Paper' });
    expect(result).toHaveProperty('id', '1');
  });

  it('should handle DB errors', async () => {
    mockRepo.listProjects.mockRejectedValue(new Error('Timeout'));
    await expect(mockRepo.listProjects('school1')).rejects.toThrow('Timeout');
  });
});
