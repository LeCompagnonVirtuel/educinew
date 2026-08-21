import { describe, it, expect, vi } from 'vitest';
import { ExamService } from '@/features/exams/services/exam.service';
import { MarkService } from '@/features/exams/services/mark.service';
import { GradeService } from '@/features/exams/services/grade.service';
import { RankingService } from '@/features/exams/services/ranking.service';
import { CoefficientService } from '@/features/exams/services/coefficient.service';
import { CompetencyService } from '@/features/exams/services/competency.service';
import { DecisionService } from '@/features/exams/services/decision.service';
import { CorrectionService } from '@/features/exams/services/correction.service';

const mockRepository = {
  createExam: vi.fn().mockResolvedValue({ id: 'exam-1' }),
  findExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'DRAFT', schoolId: 'school-1' }),
  updateExam: vi.fn().mockResolvedValue({ id: 'exam-1' }),
  deleteExam: vi.fn().mockResolvedValue(undefined),
  archiveExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'ARCHIVED' }),
  publishExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'PUBLISHED' }),
  lockExam: vi.fn().mockResolvedValue({ id: 'exam-1', status: 'LOCKED' }),
  findAllExams: vi.fn().mockResolvedValue({ data: [], total: 0 }),
  searchExams: vi.fn().mockResolvedValue([]),
  getExamStatistics: vi.fn().mockResolvedValue({}),
  getExamDashboard: vi.fn().mockResolvedValue({}),
  getExamAnalytics: vi.fn().mockResolvedValue({}),
  getTimeline: vi.fn().mockResolvedValue([]),
  logAudit: vi.fn().mockResolvedValue(undefined),
  findMark: vi.fn().mockResolvedValue({ id: 'mark-1' }),
  findAllMarks: vi.fn().mockResolvedValue([]),
  bulkEnterMarks: vi.fn().mockResolvedValue([]),
  updateMark: vi.fn().mockResolvedValue({}),
  deleteMark: vi.fn().mockResolvedValue(undefined),
  validateMarks: vi.fn().mockResolvedValue([]),
  publishMarks: vi.fn().mockResolvedValue([]),
  findGrades: vi.fn().mockResolvedValue([]),
  createGrade: vi.fn().mockResolvedValue({ id: 'grade-1' }),
  updateGrade: vi.fn().mockResolvedValue({}),
  findGradeRules: vi.fn().mockResolvedValue([]),
  createGradeRule: vi.fn().mockResolvedValue({ id: 'rule-1' }),
  findStudentsByClass: vi.fn().mockResolvedValue([]),
  findStudentRanking: vi.fn().mockResolvedValue(null),
  findCoefficients: vi.fn().mockResolvedValue([]),
  updateCoefficient: vi.fn().mockResolvedValue({}),
  findCompetencies: vi.fn().mockResolvedValue([]),
  createCompetency: vi.fn().mockResolvedValue({ id: 'comp-1' }),
  findCompetencyResults: vi.fn().mockResolvedValue([]),
  findDecision: vi.fn().mockResolvedValue(null),
  createDecision: vi.fn().mockResolvedValue({ id: 'dec-1' }),
  approveDecision: vi.fn().mockResolvedValue({}),
  findCorrection: vi.fn().mockResolvedValue(null),
  createCorrection: vi.fn().mockResolvedValue({ id: 'corr-1' }),
  approveCorrection: vi.fn().mockResolvedValue({}),
  rejectCorrection: vi.fn().mockResolvedValue({}),
  calculateTermAverage: vi.fn().mockResolvedValue(null),
  findSubjectAverages: vi.fn().mockResolvedValue([]),
  supabase: { from: vi.fn().mockReturnThis(), select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), order: vi.fn().mockReturnThis(), insert: vi.fn().mockResolvedValue({ data: null, error: null }), upsert: vi.fn().mockResolvedValue({ data: null, error: null }), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: null, error: null }), in: vi.fn().mockReturnThis(), gte: vi.fn().mockReturnThis(), lte: vi.fn().mockReturnThis() },
};

describe('ExamService', () => {
  const service = new ExamService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should create an exam', async () => {
    const result = await service.create({
      academicYearId: '550e8400-e29b-41d4-a716-446655440000',
      termId: '550e8400-e29b-41d4-a716-446655440000',
      classId: '550e8400-e29b-41d4-a716-446655440000',
      subjectId: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Final Exam',
      type: 'FINAL',
      mode: 'WRITTEN',
      coefficient: 2,
      maxMark: 20,
      passMark: 10,
      date: '2026-06-15T08:00:00Z',
    });
    expect(result.id).toBe('exam-1');
    expect(mockRepository.createExam).toHaveBeenCalled();
  });

  it('should throw when updating non-existent exam', async () => {
    mockRepository.findExam.mockResolvedValueOnce(null);
    await expect(service.update('exam-1', { name: 'Updated' })).rejects.toThrow('Exam not found');
  });

  it('should delete an exam', async () => {
    await service.delete('exam-1');
    expect(mockRepository.deleteExam).toHaveBeenCalledWith('exam-1');
  });

  it('should throw when deleting non-existent exam', async () => {
    mockRepository.findExam.mockResolvedValueOnce(null);
    await expect(service.delete('exam-999')).rejects.toThrow('Exam not found');
  });

  it('should find an exam by id', async () => {
    const result = await service.findById('exam-1');
    expect(result.id).toBe('exam-1');
  });

  it('should throw when finding non-existent exam', async () => {
    mockRepository.findExam.mockResolvedValueOnce(null);
    await expect(service.findById('exam-999')).rejects.toThrow('Exam not found');
  });

  it('should find all exams', async () => {
    const result = await service.findAll();
    expect(result).toEqual({ data: [], total: 0 });
  });

  it('should search exams', async () => {
    const result = await service.search('math');
    expect(result).toEqual([]);
  });

  it('should get exam statistics', async () => {
    const result = await service.getStatistics('exam-1');
    expect(result).toEqual({});
  });

  it('should get dashboard', async () => {
    const result = await service.getDashboard();
    expect(result).toEqual({});
  });
});

describe('MarkService', () => {
  const service = new MarkService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should enter marks', async () => {
    const result = await service.enter({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      studentId: '550e8400-e29b-41d4-a716-446655440000',
      marks: [{ subjectId: '550e8400-e29b-41d4-a716-446655440000', mark: 15, maxMark: 20 }],
    });
    expect(mockRepository.bulkEnterMarks).toHaveBeenCalled();
  });

  it('should bulk enter marks', async () => {
    await service.bulkEnter({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      entries: [{
        studentId: '550e8400-e29b-41d4-a716-446655440000',
        marks: [{ subjectId: '550e8400-e29b-41d4-a716-446655440000', mark: 15, maxMark: 20 }],
      }],
    });
    expect(mockRepository.bulkEnterMarks).toHaveBeenCalled();
  });

  it('should throw when updating non-existent mark', async () => {
    mockRepository.findMark.mockResolvedValueOnce(null);
    await expect(service.update('mark-999', { mark: 15 })).rejects.toThrow('Mark not found');
  });

  it('should throw when deleting non-existent mark', async () => {
    mockRepository.findMark.mockResolvedValueOnce(null);
    await expect(service.delete('mark-999')).rejects.toThrow('Mark not found');
  });

  it('should find mark by id', async () => {
    const result = await service.findById('mark-1');
    expect(result.id).toBe('mark-1');
  });

  it('should throw when finding non-existent mark', async () => {
    mockRepository.findMark.mockResolvedValueOnce(null);
    await expect(service.findById('mark-999')).rejects.toThrow('Mark not found');
  });

  it('should find marks by exam', async () => {
    const result = await service.findByExam('exam-1');
    expect(result).toEqual([]);
  });
});

describe('GradeService', () => {
  const service = new GradeService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should create a grade', async () => {
    const result = await service.create({ name: 'A', minMark: 16, maxMark: 20, order: 1 });
    expect(result.id).toBe('grade-1');
  });

  it('should find all grades', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should find grade rules', async () => {
    const result = await service.findGradeRules();
    expect(result).toEqual([]);
  });

  it('should create a grade rule', async () => {
    const result = await service.createGradeRule({
      gradeId: '550e8400-e29b-41d4-a716-446655440000',
      minAverage: 10,
      maxAverage: 20,
      decision: 'PASSAGE',
    });
    expect(result.id).toBe('rule-1');
  });
});

describe('RankingService', () => {
  const service = new RankingService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should find student ranking', async () => {
    const result = await service.findStudentRanking('student-1', 'year-1');
    expect(result).toBeNull();
  });
});

describe('CoefficientService', () => {
  const service = new CoefficientService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should find coefficients', async () => {
    const result = await service.find();
    expect(result).toEqual([]);
  });

  it('should update a coefficient', async () => {
    const result = await service.update('coeff-1', { coefficient: 2 });
    expect(mockRepository.updateCoefficient).toHaveBeenCalled();
  });

  it('should bulk update coefficients', async () => {
    const result = await service.bulkUpdate([
      { id: 'coeff-1', coefficient: 2 },
      { id: 'coeff-2', coefficient: 3 },
    ]);
    expect(result).toHaveLength(2);
  });
});

describe('CompetencyService', () => {
  const service = new CompetencyService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should create a competency', async () => {
    const result = await service.create({
      subjectId: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Reading', level: 'PROFICIENT', order: 1,
    });
    expect(result.id).toBe('comp-1');
  });

  it('should find competencies', async () => {
    const result = await service.find();
    expect(result).toEqual([]);
  });

  it('should find competency results', async () => {
    const result = await service.findResults('exam-1');
    expect(result).toEqual([]);
  });
});

describe('DecisionService', () => {
  const service = new DecisionService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should create a decision', async () => {
    const result = await service.create({
      studentId: '550e8400-e29b-41d4-a716-446655440000',
      classId: '550e8400-e29b-41d4-a716-446655440000',
      termId: '550e8400-e29b-41d4-a716-446655440000',
      academicYearId: '550e8400-e29b-41d4-a716-446655440000',
      decision: 'PASSAGE',
    });
    expect(result.id).toBe('dec-1');
  });

  it('should throw when finding non-existent decision', async () => {
    mockRepository.findDecision.mockResolvedValueOnce(null);
    await expect(service.findById('dec-999')).rejects.toThrow('Decision not found');
  });

  it('should find decision by id', async () => {
    mockRepository.findDecision.mockResolvedValueOnce({ id: 'dec-1' });
    const result = await service.findById('dec-1');
    expect(result.id).toBe('dec-1');
  });
});

describe('CorrectionService', () => {
  const service = new CorrectionService({ repository: mockRepository as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should create a correction', async () => {
    const result = await service.create({
      examId: '550e8400-e29b-41d4-a716-446655440000',
      studentId: '550e8400-e29b-41d4-a716-446655440000',
      originalMark: 12,
      correctedMark: 15,
      reason: 'Error in grading',
      correctedBy: '550e8400-e29b-41d4-a716-446655440000',
    });
    expect(result.id).toBe('corr-1');
  });

  it('should throw when approving non-existent correction', async () => {
    mockRepository.findCorrection.mockResolvedValueOnce(null);
    await expect(service.approve('corr-999', 'user-1')).rejects.toThrow('Correction not found');
  });

  it('should throw when finding non-existent correction', async () => {
    mockRepository.findCorrection.mockResolvedValueOnce(null);
    await expect(service.findById('corr-999')).rejects.toThrow('Correction not found');
  });

  it('should find correction by id', async () => {
    mockRepository.findCorrection.mockResolvedValueOnce({ id: 'corr-1' });
    const result = await service.findById('corr-1');
    expect(result.id).toBe('corr-1');
  });

  it('should find corrections by exam', async () => {
    mockRepository.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    const result = await service.findByExam('exam-1');
    expect(result).toEqual([]);
  });

  it('should find pending corrections', async () => {
    mockRepository.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    const result = await service.findPending();
    expect(result).toEqual([]);
  });
});
