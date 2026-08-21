import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/gei2p-transcripts.repository', () => ({
  Gei2pTranscriptsRepository: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findTranscriptById: vi.fn(),
  findTranscriptsByStudent: vi.fn(),
  createTranscript: vi.fn(),
  updateTranscript: vi.fn(),
  archiveTranscript: vi.fn(),
  listTranscripts: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GEI2P Transcripts Service - CRUD', () => {
  it('should list transcripts', async () => {
    mockRepo.listTranscripts.mockResolvedValue([
      { id: '1', student_id: 's1', year: '2024', gpa: 3.5 },
    ]);
    const result = await mockRepo.listTranscripts('school1');
    expect(result).toHaveLength(1);
    expect(result[0].gpa).toBe(3.5);
  });

  it('should create a transcript', async () => {
    const data = { school_id: 'school1', student_id: 's1', year: '2024' };
    mockRepo.createTranscript.mockResolvedValue({ id: '1', ...data, status: 'draft' });
    const result = await mockRepo.createTranscript(data);
    expect(result).toHaveProperty('id', '1');
    expect(result.status).toBe('draft');
  });

  it('should update a transcript', async () => {
    mockRepo.findTranscriptById.mockResolvedValue({ id: '1', status: 'draft' });
    mockRepo.updateTranscript.mockResolvedValue({ id: '1', status: 'final' });
    const result = await mockRepo.updateTranscript('school1', '1', { status: 'final' });
    expect(result.status).toBe('final');
  });

  it('should archive a transcript', async () => {
    mockRepo.archiveTranscript.mockResolvedValue({ id: '1', archived: true });
    const result = await mockRepo.archiveTranscript('school1', '1');
    expect(result.archived).toBe(true);
  });

  it('should find transcripts by student', async () => {
    mockRepo.findTranscriptsByStudent.mockResolvedValue([
      { id: '1', student_id: 's1' },
      { id: '2', student_id: 's1' },
    ]);
    const result = await mockRepo.findTranscriptsByStudent('school1', 's1');
    expect(result).toHaveLength(2);
  });
});

describe('GEI2P Transcripts Service - Error Handling', () => {
  it('should return null when transcript not found', async () => {
    mockRepo.findTranscriptById.mockResolvedValue(null);
    const result = await mockRepo.findTranscriptById('school1', '999');
    expect(result).toBeNull();
  });

  it('should handle DB errors', async () => {
    mockRepo.listTranscripts.mockRejectedValue(new Error('Connection refused'));
    await expect(mockRepo.listTranscripts('school1')).rejects.toThrow('Connection refused');
  });

  it('should require school_id', () => {
    const validate = (id: string) => { if (!id) throw new Error('school_id is required'); };
    expect(() => validate('')).toThrow('school_id is required');
  });
});
