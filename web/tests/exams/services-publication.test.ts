import { describe, it, expect, vi } from 'vitest';
import { PublicationService } from '@/features/exams/services/publication.service';
import { ExamService } from '@/features/exams/services/exam.service';
import { MarkService } from '@/features/exams/services/mark.service';
import { GradeService } from '@/features/exams/services/grade.service';
import { DecisionService } from '@/features/exams/services/decision.service';
import { CorrectionService } from '@/features/exams/services/correction.service';
import { StatisticsService } from '@/features/exams/services/statistics.service';
import { DashboardService } from '@/features/exams/services/dashboard.service';

function createMockChain(data: any, error: any = null) {
  const result = { data, error };
  const chain: any = {};
  chain.select = vi.fn().mockReturnValue(chain);
  chain.eq = vi.fn().mockReturnValue(chain);
  chain.neq = vi.fn().mockReturnValue(chain);
  chain.in = vi.fn().mockReturnValue(chain);
  chain.gte = vi.fn().mockReturnValue(chain);
  chain.lte = vi.fn().mockReturnValue(chain);
  chain.gt = vi.fn().mockReturnValue(chain);
  chain.lt = vi.fn().mockReturnValue(chain);
  chain.like = vi.fn().mockReturnValue(chain);
  chain.ilike = vi.fn().mockReturnValue(chain);
  chain.order = vi.fn().mockReturnValue(chain);
  chain.range = vi.fn().mockReturnValue(chain);
  chain.limit = vi.fn().mockReturnValue(chain);
  chain.insert = vi.fn().mockReturnValue(chain);
  chain.update = vi.fn().mockReturnValue(chain);
  chain.upsert = vi.fn().mockReturnValue(chain);
  chain.delete = vi.fn().mockReturnValue(chain);
  chain.single = vi.fn().mockResolvedValue(result);
  chain.maybeSingle = vi.fn().mockResolvedValue(result);
  chain.count = vi.fn().mockReturnValue(chain);
  chain.then = (resolve: any, reject: any) => Promise.resolve(result).then(resolve, reject);
  chain.catch = (reject: any) => Promise.resolve(result).catch(reject);
  return chain;
}

const mockRepo = {
  findExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'DRAFT', schoolId: '550e8400-e29b-41d4-a716-446655440001' }),
  publishExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'PUBLISHED' }),
  publishMarks: vi.fn().mockResolvedValue([]),
  findAllMarks: vi.fn().mockResolvedValue([]),
  findStudent: vi.fn().mockResolvedValue({ id: 's1', parent_id: 'p1' }),
  logAudit: vi.fn().mockResolvedValue(undefined),
  createExam: vi.fn().mockResolvedValue({ id: 'exam-1' }),
  updateExam: vi.fn().mockResolvedValue({ id: 'exam-1' }),
  deleteExam: vi.fn().mockResolvedValue(undefined),
  archiveExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'ARCHIVED' }),
  lockExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'LOCKED' }),
  findAllExams: vi.fn().mockResolvedValue({ data: [], total: 0 }),
  searchExams: vi.fn().mockResolvedValue([]),
  getExamStatistics: vi.fn().mockResolvedValue({}),
  getExamDashboard: vi.fn().mockResolvedValue({}),
  getExamAnalytics: vi.fn().mockResolvedValue({}),
  getTimeline: vi.fn().mockResolvedValue([]),
  findMark: vi.fn().mockResolvedValue(null),
  bulkEnterMarks: vi.fn().mockResolvedValue([]),
  updateMark: vi.fn().mockResolvedValue({}),
  deleteMark: vi.fn().mockResolvedValue(undefined),
  validateMarks: vi.fn().mockResolvedValue([]),
  findGrades: vi.fn().mockResolvedValue([]),
  createGrade: vi.fn().mockResolvedValue({}),
  updateGrade: vi.fn().mockResolvedValue({}),
  findGradeRules: vi.fn().mockResolvedValue([]),
  createGradeRule: vi.fn().mockResolvedValue({}),
  findStudentsByClass: vi.fn().mockResolvedValue([]),
  findStudentRanking: vi.fn().mockResolvedValue(null),
  findDecision: vi.fn().mockResolvedValue(null),
  createDecision: vi.fn().mockResolvedValue({ id: 'dec-1' }),
  approveDecision: vi.fn().mockResolvedValue({}),
  findCorrection: vi.fn().mockResolvedValue(null),
  createCorrection: vi.fn().mockResolvedValue({}),
  approveCorrection: vi.fn().mockResolvedValue({}),
  rejectCorrection: vi.fn().mockResolvedValue({}),
  calculateTermAverage: vi.fn().mockResolvedValue({ average: 14.5 }),
  generateReportCard: vi.fn().mockResolvedValue({ id: 'rc-1' }),
  findReportCard: vi.fn().mockResolvedValue(null),
  findReportCards: vi.fn().mockResolvedValue([]),
  generateTranscript: vi.fn().mockResolvedValue({ id: 'trans-1' }),
  findTranscript: vi.fn().mockResolvedValue(null),
  findTranscripts: vi.fn().mockResolvedValue([]),
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    upsert: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
};

describe('PublicationService', () => {
  const service = new PublicationService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should publish exam with marks', async () => {
    const result = await service.publishExam({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      publishMarks: true,
    });
    expect(mockRepo.publishExam).toHaveBeenCalled();
    expect(mockRepo.publishMarks).toHaveBeenCalled();
  });

  it('should publish exam with student notifications', async () => {
    mockRepo.findAllMarks.mockResolvedValueOnce([{ student_id: 's1' }, { student_id: 's2' }]);
    await service.publishExam({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      notifyStudents: true,
    });
    expect(mockRepo.supabase.from).toHaveBeenCalled();
  });

  it('should publish exam with parent notifications', async () => {
    mockRepo.findAllMarks.mockResolvedValueOnce([{ student_id: 's1' }]);
    mockRepo.findStudent.mockResolvedValueOnce({ id: 's1', parent_id: 'p1' });
    await service.publishExam({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      notifyParents: true,
    });
    expect(mockRepo.findStudent).toHaveBeenCalled();
  });

  it('should publish marks only', async () => {
    const result = await service.publishMarks('exam-1');
    expect(result).toEqual([]);
  });

  it('should publish results', async () => {
    mockRepo.findAllMarks.mockResolvedValueOnce([{ student_id: 's1', mark: 15, max_mark: 20 }]);
    mockRepo.supabase.upsert.mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: { id: 'result-1' }, error: null }),
      }),
    });
    const result = await service.publishResults('exam-1');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should throw when publishing results for non-existent exam', async () => {
    mockRepo.findExam.mockResolvedValueOnce(null);
    await expect(service.publishResults('exam-999')).rejects.toThrow('Exam not found');
  });
});

describe('ExamService publish flow', () => {
  const service = new ExamService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should publish a draft exam', async () => {
    mockRepo.findExam.mockResolvedValueOnce({ id: 'exam-1', status: 'DRAFT' });
    const result = await service.publish('exam-1');
    expect(result.status).toBe('PUBLISHED');
  });

  it('should throw when publishing non-draft exam', async () => {
    mockRepo.findExam.mockResolvedValueOnce({ id: 'exam-1', status: 'PUBLISHED' });
    await expect(service.publish('exam-1')).rejects.toThrow('Only draft exams can be published');
  });

  it('should lock a published exam', async () => {
    mockRepo.findExam.mockResolvedValueOnce({ id: 'exam-1', status: 'PUBLISHED' });
    const result = await service.lock('exam-1');
    expect(result.status).toBe('LOCKED');
  });

  it('should throw when locking non-published exam', async () => {
    mockRepo.findExam.mockResolvedValueOnce({ id: 'exam-1', status: 'DRAFT' });
    await expect(service.lock('exam-1')).rejects.toThrow('Only published exams can be locked');
  });

  it('should archive an exam', async () => {
    const result = await service.archive('exam-1');
    expect(result.status).toBe('ARCHIVED');
  });
});

describe('MarkService validation and publish', () => {
  const service = new MarkService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should validate marks', async () => {
    const result = await service.validate({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      validatedBy: '550e8400-e29b-41d4-a716-446655440000',
      marks: [{ markEntryId: '550e8400-e29b-41d4-a716-446655440000', approved: true }],
    });
    expect(result).toEqual([]);
  });

  it('should publish marks', async () => {
    const result = await service.publish('exam-1');
    expect(result).toEqual([]);
  });
});

describe('DecisionService approve flow', () => {
  const service = new DecisionService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should approve a decision', async () => {
    mockRepo.findDecision.mockResolvedValueOnce({ id: 'dec-1', status: 'PENDING' });
    await service.approve('dec-1', 'admin-1');
    expect(mockRepo.approveDecision).toHaveBeenCalled();
  });

  it('should throw when approving non-existent decision', async () => {
    mockRepo.findDecision.mockResolvedValueOnce(null);
    await expect(service.approve('dec-999', 'admin-1')).rejects.toThrow('Decision not found');
  });
});

describe('CorrectionService approve/reject flow', () => {
  const service = new CorrectionService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should approve a pending correction', async () => {
    mockRepo.findCorrection.mockResolvedValueOnce({ id: 'corr-1', status: 'PENDING' });
    await service.approve('corr-1', 'admin-1');
    expect(mockRepo.approveCorrection).toHaveBeenCalled();
  });

  it('should throw when approving non-pending correction', async () => {
    mockRepo.findCorrection.mockResolvedValueOnce({ id: 'corr-1', status: 'APPROVED' });
    await expect(service.approve('corr-1', 'admin-1')).rejects.toThrow('Correction is not pending');
  });

  it('should reject a pending correction', async () => {
    mockRepo.findCorrection.mockResolvedValueOnce({ id: 'corr-1', status: 'PENDING' });
    await service.reject('corr-1', 'admin-1', 'Invalid');
    expect(mockRepo.rejectCorrection).toHaveBeenCalled();
  });

  it('should throw when rejecting non-pending correction', async () => {
    mockRepo.findCorrection.mockResolvedValueOnce({ id: 'corr-1', status: 'REJECTED' });
    await expect(service.reject('corr-1', 'admin-1', 'Invalid')).rejects.toThrow('Correction is not pending');
  });
});

describe('StatisticsService distribution', () => {
  const service = new StatisticsService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should calculate distribution percentages', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          { mark: 2, max_mark: 20 },
          { mark: 7, max_mark: 20 },
          { mark: 12, max_mark: 20 },
          { mark: 17, max_mark: 20 },
          { mark: 20, max_mark: 20 },
        ],
        error: null,
      }),
    });
    const result = await service.getDistribution('exam-1');
    expect(result.totalStudents).toBe(5);
    expect(result.distribution).toHaveLength(5);
    const totalPct = result.distribution.reduce((s: number, d: any) => s + d.percentage, 0);
    expect(totalPct).toBe(100);
  });
});

describe('DashboardService summary aggregation', () => {
  const service = new DashboardService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should aggregate exam statuses', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: '1', status: 'DRAFT', type: 'FINAL' },
          { id: '2', status: 'PUBLISHED', type: 'MID_TERM' },
          { id: '3', status: 'DRAFT', type: 'FINAL' },
        ],
        error: null,
      }),
    });
    const result = await service.getSummary();
    expect(result.totalExams).toBe(3);
    expect(result.examsByStatus['DRAFT']).toBe(2);
    expect(result.examsByStatus['PUBLISHED']).toBe(1);
  });

  it('should aggregate mark statuses', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: '1', status: 'DRAFT' },
          { id: '2', status: 'VALIDATED' },
          { id: '3', status: 'DRAFT' },
          { id: '4', status: 'PUBLISHED' },
        ],
        error: null,
      }),
    });
    const result = await service.getSummary();
    expect(result.totalMarks).toBe(4);
    expect(result.marksByStatus['DRAFT']).toBe(2);
  });

  it('should aggregate decision types', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: '1', decision: 'PASSAGE' },
          { id: '2', decision: 'REPETITION' },
          { id: '3', decision: 'PASSAGE' },
        ],
        error: null,
      }),
    });
    const result = await service.getSummary();
    expect(result.totalDecisions).toBe(3);
    expect(result.decisionsByType['PASSAGE']).toBe(2);
  });
});

describe('ExamService complete CRUD flow', () => {
  const service = new ExamService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should find all exams with filters', async () => {
    const result = await service.findAll({ status: 'PUBLISHED' });
    expect(result).toEqual({ data: [], total: 0 });
  });

  it('should search exams by query', async () => {
    const result = await service.search('math');
    expect(result).toEqual([]);
  });

  it('should get analytics', async () => {
    const result = await service.getAnalytics('term-1');
    expect(result).toEqual({});
  });

  it('should get timeline', async () => {
    const result = await service.getTimeline(10);
    expect(result).toEqual([]);
  });
});

describe('GradeService complete flow', () => {
  const service = new GradeService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should update a grade', async () => {
    await service.update('grade-1', { name: 'B' });
    expect(mockRepo.updateGrade).toHaveBeenCalled();
  });

  it('should find all grades', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should find grade rules', async () => {
    const result = await service.findGradeRules();
    expect(result).toEqual([]);
  });
});

describe('MarkService complete flow', () => {
  const service = new MarkService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should update a mark', async () => {
    mockRepo.findMark.mockResolvedValueOnce({ id: 'mark-1' });
    await service.update('mark-1', { mark: 18 });
    expect(mockRepo.updateMark).toHaveBeenCalled();
  });

  it('should delete a mark', async () => {
    mockRepo.findMark.mockResolvedValueOnce({ id: 'mark-1' });
    await service.delete('mark-1');
    expect(mockRepo.deleteMark).toHaveBeenCalledWith('mark-1');
  });

  it('should find all marks for an exam', async () => {
    const result = await service.findByExam('exam-1');
    expect(result).toEqual([]);
  });

  it('should find mark by id', async () => {
    mockRepo.findMark.mockResolvedValueOnce({ id: 'mark-1' });
    const result = await service.findById('mark-1');
    expect(result.id).toBe('mark-1');
  });

  it('should throw when finding non-existent mark', async () => {
    mockRepo.findMark.mockResolvedValueOnce(null);
    await expect(service.findById('mark-999')).rejects.toThrow('Mark not found');
  });
});

describe('CorrectionService complete flow', () => {
  const service = new CorrectionService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should find correction by id', async () => {
    mockRepo.findCorrection.mockResolvedValueOnce({ id: 'corr-1' });
    const result = await service.findById('corr-1');
    expect(result.id).toBe('corr-1');
  });

  it('should throw when finding non-existent correction', async () => {
    mockRepo.findCorrection.mockResolvedValueOnce(null);
    await expect(service.findById('corr-999')).rejects.toThrow('Correction not found');
  });

  it('should find corrections by exam', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    const result = await service.findByExam('exam-1');
    expect(result).toEqual([]);
  });

  it('should find pending corrections', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    const result = await service.findPending();
    expect(result).toEqual([]);
  });
});

describe('DecisionService complete flow', () => {
  const service = new DecisionService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should find decision by id', async () => {
    mockRepo.findDecision.mockResolvedValueOnce({ id: 'dec-1' });
    const result = await service.findById('dec-1');
    expect(result.id).toBe('dec-1');
  });

  it('should throw when finding non-existent decision', async () => {
    mockRepo.findDecision.mockResolvedValueOnce(null);
    await expect(service.findById('dec-999')).rejects.toThrow('Decision not found');
  });

  it('should find decisions by class', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      resolvedValue: { data: [], error: null },
    });
    const result = await service.findByClass('class-1', 'term-1');
    expect(result).toEqual([]);
  });

  it('should find decisions by student', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      resolvedValue: { data: [], error: null },
    });
    const result = await service.findByStudent('student-1', 'year-1');
    expect(result).toEqual([]);
  });
});
