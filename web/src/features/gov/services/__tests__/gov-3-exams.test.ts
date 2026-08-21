import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GovNationalExamService } from '../gov-national-exam.service';
import { GovExamSchedulingService } from '../gov-exam-scheduling.service';
import { GovExamResultsPublishingService } from '../gov-exam-results-publishing.service';
import { GovernmentRepositoryEnterprise } from '../../repositories/gov.repository';

vi.mock('../../repositories/gov.repository', () => ({
  GovernmentRepositoryEnterprise: vi.fn(),
}));

const mockSupabase = {} as any;
const mockRepo = {
  findNationalExamById: vi.fn(),
  findAllNationalExams: vi.fn(),
  createNationalExam: vi.fn(),
  updateNationalExam: vi.fn(),
  deleteNationalExam: vi.fn(),
  findExamSchedulingById: vi.fn(),
  createExamScheduling: vi.fn(),
  findAllExamSchedulings: vi.fn(),
  findExamResultsPublishingById: vi.fn(),
  createExamResultsPublishing: vi.fn(),
  deleteExamResultsPublishing: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(GovernmentRepositoryEnterprise).mockReturnValue(mockRepo as any);
});

describe('GovNationalExamService', () => {
  const service = new GovNationalExamService(mockSupabase);

  it('should get a national exam', async () => {
    mockRepo.findNationalExamById.mockResolvedValue({ id: '1', name: 'BEPC' });
    const result = await service.getNationalExam('school1', '1');
    expect(result).toHaveProperty('name', 'BEPC');
  });

  it('should throw when exam not found', async () => {
    mockRepo.findNationalExamById.mockResolvedValue(null);
    await expect(service.getNationalExam('school1', '999')).rejects.toThrow();
  });

  it('should create an exam', async () => {
    mockRepo.createNationalExam.mockResolvedValue({ id: '1' });
    const result = await service.createNationalExam('school1', { name: 'New' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should update an exam', async () => {
    mockRepo.findNationalExamById.mockResolvedValue({ id: '1' });
    mockRepo.updateNationalExam.mockResolvedValue({ id: '1', name: 'Updated' });
    const result = await service.updateNationalExam('school1', '1', { name: 'Updated' });
    expect(result).toHaveProperty('name', 'Updated');
  });

  it('should delete an exam', async () => {
    mockRepo.findNationalExamById.mockResolvedValue({ id: '1' });
    mockRepo.deleteNationalExam.mockResolvedValue(undefined);
    await expect(service.deleteNationalExam('school1', '1')).resolves.toBeUndefined();
  });
});

describe('GovExamSchedulingService', () => {
  const service = new GovExamSchedulingService(mockSupabase);

  it('should create a schedule', async () => {
    mockRepo.createExamScheduling.mockResolvedValue({ id: '1' });
    const result = await service.createExamScheduling('school1', { examId: '1' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when schedule not found', async () => {
    mockRepo.findExamSchedulingById.mockResolvedValue(null);
    await expect(service.getExamScheduling('school1', '999')).rejects.toThrow();
  });

  it('should list schedules', async () => {
    mockRepo.findAllExamSchedulings.mockResolvedValue([]);
    const result = await service.listExamSchedulings('school1');
    expect(result).toEqual([]);
  });
});

describe('GovExamResultsPublishingService', () => {
  const service = new GovExamResultsPublishingService(mockSupabase);

  it('should create a publishing', async () => {
    mockRepo.createExamResultsPublishing.mockResolvedValue({ id: '1' });
    const result = await service.createExamResultsPublishing('school1', { examId: '1' } as any);
    expect(result).toHaveProperty('id');
  });

  it('should throw when not found', async () => {
    mockRepo.findExamResultsPublishingById.mockResolvedValue(null);
    await expect(service.getExamResultsPublishing('school1', '999')).rejects.toThrow();
  });

  it('should delete a publishing', async () => {
    mockRepo.findExamResultsPublishingById.mockResolvedValue({ id: '1' });
    mockRepo.deleteExamResultsPublishing.mockResolvedValue(undefined);
    await expect(service.deleteExamResultsPublishing('school1', '1')).resolves.toBeUndefined();
  });
});
