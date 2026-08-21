import { describe, it, expect, vi } from 'vitest';
import { ValidationService } from '@/features/exams/services/validation.service';
import { TranscriptService } from '@/features/exams/services/transcript.service';
import { ReportCardService } from '@/features/exams/services/report-card.service';
import { DashboardService } from '@/features/exams/services/dashboard.service';
import { StatisticsService } from '@/features/exams/services/statistics.service';
import { SessionService } from '@/features/exams/services/session.service';
import { SearchService } from '@/features/exams/services/search.service';
import { TimelineService } from '@/features/exams/services/timeline.service';

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
  findExam: vi.fn().mockResolvedValue({ id: 'exam-1', class_id: 'class-1', status: 'DRAFT' }),
  findAllMarks: vi.fn().mockResolvedValue([]),
  findStudentsByClass: vi.fn().mockResolvedValue([]),
  findStudent: vi.fn().mockResolvedValue({ id: 'student-1', first_name: 'Jean', last_name: 'Dupont', class_id: 'class-1', class_name: '6ème A' }),
  findClass: vi.fn().mockResolvedValue({ id: 'class-1', name: '6ème A' }),
  findReportCard: vi.fn().mockResolvedValue(null),
  findReportCards: vi.fn().mockResolvedValue([]),
  findTranscript: vi.fn().mockResolvedValue(null),
  findTranscripts: vi.fn().mockResolvedValue([]),
  generateReportCard: vi.fn().mockResolvedValue({ id: 'rc-1' }),
  generateTranscript: vi.fn().mockResolvedValue({ id: 'trans-1' }),
  calculateTermAverage: vi.fn().mockResolvedValue({ average: 14.5 }),
  getExamDashboard: vi.fn().mockResolvedValue({ totalExams: 10 }),
  getExamStatistics: vi.fn().mockResolvedValue({ totalStudents: 30 }),
  getExamAnalytics: vi.fn().mockResolvedValue({}),
  getTimeline: vi.fn().mockResolvedValue([]),
  logAudit: vi.fn().mockResolvedValue(undefined),
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    update: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
};

describe('ValidationService', () => {
  const service = new ValidationService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should check exam integrity with no issues', async () => {
    const result = await service.checkIntegrity('exam-1');
    expect(result.isValid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('should throw for non-existent exam in integrity check', async () => {
    mockRepo.findExam.mockResolvedValueOnce(null);
    await expect(service.checkIntegrity('exam-999')).rejects.toThrow('Exam not found');
  });

  it('should get validation status', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: [{ status: 'DRAFT' }, { status: 'VALIDATED' }], error: null }),
    });
    const result = await service.getValidationStatus('exam-1');
    expect(result.examId).toBe('exam-1');
    expect(result.total).toBe(2);
  });

  it('should get validation status with empty marks', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    const result = await service.getValidationStatus('exam-1');
    expect(result.total).toBe(0);
    expect(result.allValidated).toBe(true);
  });

  it('should get validation status with all validated', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: [{ status: 'VALIDATED' }, { status: 'PUBLISHED' }], error: null }),
    });
    const result = await service.getValidationStatus('exam-1');
    expect(result.allValidated).toBe(true);
  });

  it('should get validation status with mixed statuses', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: [{ status: 'DRAFT' }, { status: 'VALIDATED' }], error: null }),
    });
    const result = await service.getValidationStatus('exam-1');
    expect(result.allValidated).toBe(false);
    expect(result.draft).toBe(1);
    expect(result.validated).toBe(1);
  });
});

describe('TranscriptService', () => {
  const service = new TranscriptService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should throw for non-existent student', async () => {
    mockRepo.findStudent.mockResolvedValueOnce(null);
    await expect(service.generate({
      studentId: '550e8400-e29b-41d4-a716-446655440000',
      academicYearId: '550e8400-e29b-41d4-a716-446655440000',
    })).rejects.toThrow('Student not found');
  });

  it('should throw when finding non-existent transcript', async () => {
    mockRepo.findTranscript.mockResolvedValueOnce(null);
    await expect(service.findById('trans-999')).rejects.toThrow('Transcript not found');
  });

  it('should find transcript by id', async () => {
    mockRepo.findTranscript.mockResolvedValueOnce({ id: 'trans-1' });
    const result = await service.findById('trans-1');
    expect(result.id).toBe('trans-1');
  });

  it('should find all transcripts', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should find transcripts by academic year', async () => {
    const result = await service.findAll('year-1');
    expect(result).toEqual([]);
  });
});

describe('ReportCardService', () => {
  const service = new ReportCardService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should throw for non-existent student', async () => {
    mockRepo.findStudent.mockResolvedValueOnce(null);
    await expect(service.generate({
      studentId: '550e8400-e29b-41d4-a716-446655440000',
      classId: '550e8400-e29b-41d4-a716-446655440000',
      termId: '550e8400-e29b-41d4-a716-446655440000',
      academicYearId: '550e8400-e29b-41d4-a716-446655440000',
    })).rejects.toThrow('Student not found');
  });

  it('should throw when finding non-existent report card', async () => {
    mockRepo.findReportCard.mockResolvedValueOnce(null);
    await expect(service.findById('rc-999')).rejects.toThrow('Report card not found');
  });

  it('should find report card by id', async () => {
    mockRepo.findReportCard.mockResolvedValueOnce({ id: 'rc-1' });
    const result = await service.findById('rc-1');
    expect(result.id).toBe('rc-1');
  });

  it('should find all report cards', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should find report cards by term', async () => {
    const result = await service.findAll('term-1');
    expect(result).toEqual([]);
  });
});

describe('DashboardService', () => {
  const service = new DashboardService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should get dashboard', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      resolvedValue: { data: [], error: null },
    });
    const result = await service.getDashboard();
    expect(result.totalExams).toBe(10);
  });

  it('should get dashboard with term filter', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      resolvedValue: { data: [], error: null },
    });
    const result = await service.getDashboard('term-1');
    expect(result).toHaveProperty('totalExams');
  });

  it('should get summary', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
    });
    const result = await service.getSummary();
    expect(result.totalExams).toBe(0);
    expect(result.totalMarks).toBe(0);
    expect(result.totalDecisions).toBe(0);
  });

  it('should get summary with data', async () => {
    mockRepo.supabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: '1', status: 'DRAFT', type: 'FINAL' },
          { id: '2', status: 'PUBLISHED', type: 'MID_TERM' },
        ],
        error: null,
      }),
    });
    const result = await service.getSummary();
    expect(result.totalExams).toBe(2);
    expect(result.examsByStatus['DRAFT']).toBe(1);
    expect(result.examsByStatus['PUBLISHED']).toBe(1);
  });
});

describe('StatisticsService', () => {
  const service = new StatisticsService({ repository: mockRepo as any, schoolId: '550e8400-e29b-41d4-a716-446655440001' });

  it('should get exam statistics', async () => {
    const result = await service.getExamStatistics('exam-1');
    expect(result).toEqual({ totalStudents: 30 });
  });

  it('should get distribution with empty marks', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([]));
    const result = await service.getDistribution('exam-1');
    expect(result.totalStudents).toBe(0);
    expect(result.distribution).toHaveLength(0);
  });

  it('should get distribution with marks', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([{ mark: 15, max_mark: 20 }, { mark: 8, max_mark: 20 }]));
    const result = await service.getDistribution('exam-1');
    expect(result.totalStudents).toBe(2);
    expect(result.distribution).toHaveLength(5);
  });

  it('should get statistics by class', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([{ id: 'e1', name: 'Exam1', type: 'FINAL', coefficient: 2, subject_id: 's1' }]));
    const result = await service.getStatisticsByClass('class-1', 'term-1');
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get statistics by subject', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([{ id: 'e1', name: 'Exam1', type: 'FINAL', coefficient: 2 }]));
    const result = await service.getStatisticsBySubject('subject-1', 'class-1', 'term-1');
    expect(result).toHaveProperty('subjectId');
    expect(result).toHaveProperty('overallAverage');
  });

  it('should get term statistics', async () => {
    mockRepo.supabase.from
      .mockReturnValueOnce(createMockChain([]));
    const result = await service.getTermStatistics('class-1', 'term-1');
    expect(result).toHaveProperty('classId');
    expect(result).toHaveProperty('classAverage');
    expect(result).toHaveProperty('passRate');
  });

  it('should get term statistics with students and marks', async () => {
    mockRepo.supabase.from
      .mockReturnValueOnce(createMockChain([{ id: 's1' }, { id: 's2' }]))
      .mockReturnValueOnce(createMockChain([{ id: 'e1' }]))
      .mockReturnValueOnce(createMockChain([{ mark: 15, max_mark: 20 }]))
      .mockReturnValueOnce(createMockChain([{ id: 'e1' }]))
      .mockReturnValueOnce(createMockChain([{ mark: 10, max_mark: 20 }]));
    const result = await service.getTermStatistics('class-1', 'term-1');
    expect(result).toHaveProperty('students');
    expect(result).toHaveProperty('highestAverage');
    expect(result).toHaveProperty('lowestAverage');
  });

  it('should get statistics by class with empty exams', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([]));
    const result = await service.getStatisticsByClass('class-1', 'term-1');
    expect(result).toEqual([]);
  });

  it('should get statistics by subject with no marks', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([]));
    const result = await service.getStatisticsBySubject('subject-1', 'class-1', 'term-1');
    expect(result.overallAverage).toBe(0);
  });

  it('should calculate distribution with all ranges', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([
      { mark: 1, max_mark: 20 },
      { mark: 6, max_mark: 20 },
      { mark: 11, max_mark: 20 },
      { mark: 16, max_mark: 20 },
      { mark: 20, max_mark: 20 },
    ]));
    const result = await service.getDistribution('exam-1');
    expect(result.distribution[0].range).toBe('0-4');
    expect(result.distribution[1].range).toBe('5-9');
    expect(result.distribution[2].range).toBe('10-14');
    expect(result.distribution[3].range).toBe('15-19');
    expect(result.distribution[4].range).toBe('20');
  });

  it('should calculate distribution percentages correctly', async () => {
    mockRepo.supabase.from.mockReturnValue(createMockChain([
      { mark: 2, max_mark: 20 },
      { mark: 7, max_mark: 20 },
      { mark: 12, max_mark: 20 },
      { mark: 17, max_mark: 20 },
      { mark: 20, max_mark: 20 },
    ]));
    const result = await service.getDistribution('exam-1');
    expect(result.totalStudents).toBe(5);
    const totalPct = result.distribution.reduce((s: number, d: any) => s + d.percentage, 0);
    expect(totalPct).toBe(100);
  });
});

describe('SessionService (placeholder)', () => {
  it('should be importable', async () => {
    const mod = await import('@/features/exams/services/session.service');
    expect(mod.SessionService).toBeDefined();
  });

  it('should export a class constructor', async () => {
    const mod = await import('@/features/exams/services/session.service');
    expect(typeof mod.SessionService).toBe('function');
  });
});

describe('SearchService (placeholder)', () => {
  it('should be importable', async () => {
    const mod = await import('@/features/exams/services/search.service');
    expect(mod.SearchService).toBeDefined();
  });

  it('should export a class constructor', async () => {
    const mod = await import('@/features/exams/services/search.service');
    expect(typeof mod.SearchService).toBe('function');
  });
});

describe('TimelineService (placeholder)', () => {
  it('should be importable', async () => {
    const mod = await import('@/features/exams/services/timeline.service');
    expect(mod.TimelineService).toBeDefined();
  });

  it('should export a class constructor', async () => {
    const mod = await import('@/features/exams/services/timeline.service');
    expect(typeof mod.TimelineService).toBe('function');
  });
});
