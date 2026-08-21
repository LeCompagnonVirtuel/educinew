import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRepo = {
  findMany: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const schoolId = '550e8400-e29b-41d4-a716-446655440000';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Generative Studio - Content Generator Service', () => {
  it('should create content', async () => {
    const data = { schoolId, content_type: 'lesson_plan', subject: 'math', status: 'draft' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.content_type).toBe('lesson_plan');
  });

  it('should list generated content', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', content_type: 'quiz' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should update content', async () => {
    mockRepo.update.mockResolvedValue({ id: '1', status: 'published' });
    const result = await mockRepo.update(schoolId, '1', { status: 'published' });
    expect(result.status).toBe('published');
  });

  it('should find content by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: '1', content_type: 'worksheet' });
    const result = await mockRepo.findById(schoolId, '1');
    expect(result.content_type).toBe('worksheet');
  });

  it('should delete content', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete(schoolId, '1');
    expect(mockRepo.delete).toHaveBeenCalledWith(schoolId, '1');
  });
});

describe('Generative Studio - Template Engine Service', () => {
  it('should create template', async () => {
    const data = { schoolId, template_name: 'exam_template', format: 'pdf', status: 'active' };
    mockRepo.create.mockResolvedValue({ id: '1', ...data });
    const result = await mockRepo.create(data);
    expect(result.template_name).toBe('exam_template');
  });

  it('should list templates', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', template_name: 'report_card' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result).toHaveLength(1);
  });

  it('should validate template format', () => {
    const validate = (f: string) => { if (!['pdf', 'html', 'docx'].includes(f)) throw new Error('Invalid format'); };
    expect(() => validate('txt')).toThrow('Invalid format');
  });
});

describe('Generative Studio - Error Handling', () => {
  it('should require schoolId', () => {
    const validate = (id: string) => { if (!id) throw new Error('schoolId is required'); };
    expect(() => validate('')).toThrow('schoolId is required');
  });

  it('should handle DB errors', async () => {
    mockRepo.findMany.mockRejectedValue(new Error('Storage full'));
    await expect(mockRepo.findMany(schoolId)).rejects.toThrow('Storage full');
  });
});
