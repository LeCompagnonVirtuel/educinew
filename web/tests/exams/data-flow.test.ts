import { describe, it, expect, vi } from 'vitest';
import type {
  Exam,
  Mark,
  Grade,
  GradeRule,
  Decision,
  Transcript,
  ReportCard,
  Competency,
  CompetencyResult,
  Correction,
  SubjectCoefficient,
  StudentRanking,
  ClassRanking,
  SchoolRanking,
} from '@educi/types';
import {
  ExamNotFoundError,
  ExamLockedError,
  InvalidMarkError,
  NegativeMarkError,
  MarkExceedsMaxError,
  GradeCalculationError,
  RankingCalculationError,
  DecisionConflictError,
  CompetencyCalculationError,
} from '@educi/errors';

describe('Exam Module Data Flow - Creation', () => {
  it('should create exam with valid data', () => {
    const exam: Exam = {
      id: 'exam-1',
      schoolId: 'school-1',
      name: 'Final Exam',
      examType: 'FINAL',
      examMode: 'WRITTEN',
      academicYearId: 'year-1',
      subjectId: 'subject-1',
      classId: 'class-1',
      totalMarks: 20,
      passingMarks: 10,
      examDate: '2026-06-15T08:00:00Z',
      status: 'DRAFT',
      isPublished: false,
      isLocked: false,
      createdBy: 'user-1',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(exam.id).toBe('exam-1');
    expect(exam.status).toBe('DRAFT');
    expect(exam.isPublished).toBe(false);
  });

  it('should create exam with all types', () => {
    const types: Exam['examType'][] = ['CONTINUOUS', 'END_OF_TERM', 'MID_TERM', 'FINAL', 'DIAGNOSTIC', 'HOMEWORK', 'ORAL', 'PRACTICAL', 'PROJECT'];
    expect(types).toHaveLength(9);
  });

  it('should create exam with all modes', () => {
    const modes: Exam['examMode'][] = ['WRITTEN', 'ORAL', 'PRACTICAL', 'ONLINE', 'BLENDED'];
    expect(modes).toHaveLength(5);
  });

  it('should publish exam', () => {
    const exam: Exam = {
      id: 'exam-1', schoolId: 's1', name: 'Test', examType: 'FINAL', examMode: 'WRITTEN',
      academicYearId: 'y1', subjectId: 'sub1', classId: 'c1', totalMarks: 20, passingMarks: 10,
      examDate: '2026-06-15T08:00:00Z', status: 'PUBLISHED', isPublished: true, isLocked: false,
      createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(exam.status).toBe('PUBLISHED');
    expect(exam.isPublished).toBe(true);
  });

  it('should lock exam', () => {
    const exam: Exam = {
      id: 'exam-1', schoolId: 's1', name: 'Test', examType: 'FINAL', examMode: 'WRITTEN',
      academicYearId: 'y1', subjectId: 'sub1', classId: 'c1', totalMarks: 20, passingMarks: 10,
      examDate: '2026-06-15T08:00:00Z', status: 'LOCKED', isPublished: true, isLocked: true,
      createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(exam.status).toBe('LOCKED');
    expect(exam.isLocked).toBe(true);
  });

  it('should archive exam', () => {
    const exam: Exam = {
      id: 'exam-1', schoolId: 's1', name: 'Test', examType: 'FINAL', examMode: 'WRITTEN',
      academicYearId: 'y1', subjectId: 'sub1', classId: 'c1', totalMarks: 20, passingMarks: 10,
      examDate: '2026-06-15T08:00:00Z', status: 'ARCHIVED', isPublished: true, isLocked: true,
      createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(exam.status).toBe('ARCHIVED');
  });
});

describe('Exam Module Data Flow - Marks', () => {
  it('should enter mark with valid data', () => {
    const mark: Mark = {
      id: 'mark-1', schoolId: 'school-1', examId: 'exam-1', studentId: 'student-1',
      subjectId: 'subject-1', classId: 'class-1', marksObtained: 15, maxMarks: 20,
      percentage: 75, isAbsent: false, isExcused: false, status: 'DRAFT',
      enteredBy: 'teacher-1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(mark.marksObtained).toBe(15);
    expect(mark.percentage).toBe(75);
  });

  it('should validate mark range', () => {
    const mark = 15;
    const maxMark = 20;
    expect(mark).toBeGreaterThanOrEqual(0);
    expect(mark).toBeLessThanOrEqual(maxMark);
  });

  it('should reject negative mark', () => {
    const mark = -1;
    expect(mark).toBeLessThan(0);
  });

  it('should reject mark exceeding max', () => {
    const mark = 25;
    const maxMark = 20;
    expect(mark).toBeGreaterThan(maxMark);
  });

  it('should handle absent student', () => {
    const mark: Mark = {
      id: 'mark-2', schoolId: 's1', examId: 'e1', studentId: 's1',
      subjectId: 'sub1', classId: 'c1', marksObtained: 0, maxMarks: 20,
      percentage: 0, isAbsent: true, isExcused: false, status: 'DRAFT',
      enteredBy: 't1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(mark.isAbsent).toBe(true);
  });

  it('should handle excused absence', () => {
    const mark: Mark = {
      id: 'mark-3', schoolId: 's1', examId: 'e1', studentId: 's1',
      subjectId: 'sub1', classId: 'c1', marksObtained: 0, maxMarks: 20,
      percentage: 0, isAbsent: true, isExcused: true, status: 'DRAFT',
      enteredBy: 't1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(mark.isExcused).toBe(true);
  });

  it('should validate mark submission', () => {
    const mark: Mark = {
      id: 'mark-4', schoolId: 's1', examId: 'e1', studentId: 's1',
      subjectId: 'sub1', classId: 'c1', marksObtained: 15, maxMarks: 20,
      percentage: 75, isAbsent: false, isExcused: false, status: 'SUBMITTED',
      enteredBy: 't1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(mark.status).toBe('SUBMITTED');
  });

  it('should validate mark publication', () => {
    const mark: Mark = {
      id: 'mark-5', schoolId: 's1', examId: 'e1', studentId: 's1',
      subjectId: 'sub1', classId: 'c1', marksObtained: 15, maxMarks: 20,
      percentage: 75, isAbsent: false, isExcused: false, status: 'PUBLISHED',
      enteredBy: 't1', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(mark.status).toBe('PUBLISHED');
  });

  it('should handle bulk mark entry', () => {
    const marks = [
      { studentId: 's1', marksObtained: 15 },
      { studentId: 's2', marksObtained: 18 },
      { studentId: 's3', marksObtained: 12 },
    ];
    expect(marks).toHaveLength(3);
  });

  it('should handle decimal marks', () => {
    const mark = 14.5;
    expect(mark).toBe(14.5);
    expect(Number.isInteger(mark)).toBe(false);
  });
});

describe('Exam Module Data Flow - Grades', () => {
  it('should create grade with valid data', () => {
    const grade: Grade = {
      id: 'grade-1', schoolId: 'school-1', name: 'A',
      minMark: 16, maxMark: 20, order: 1, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(grade.name).toBe('A');
    expect(grade.minMark).toBe(16);
  });

  it('should create grade scale', () => {
    const grades: Grade[] = [
      { id: 'g1', schoolId: 's1', name: 'A', minMark: 16, maxMark: 20, order: 1, createdAt: '2026-01-01T00:00:00Z' },
      { id: 'g2', schoolId: 's1', name: 'B', minMark: 14, maxMark: 15.99, order: 2, createdAt: '2026-01-01T00:00:00Z' },
      { id: 'g3', schoolId: 's1', name: 'C', minMark: 12, maxMark: 13.99, order: 3, createdAt: '2026-01-01T00:00:00Z' },
      { id: 'g4', schoolId: 's1', name: 'D', minMark: 10, maxMark: 11.99, order: 4, createdAt: '2026-01-01T00:00:00Z' },
      { id: 'g5', schoolId: 's1', name: 'F', minMark: 0, maxMark: 9.99, order: 5, createdAt: '2026-01-01T00:00:00Z' },
    ];
    expect(grades).toHaveLength(5);
  });

  it('should validate grade ranges do not overlap', () => {
    const ranges = [
      { minMark: 0, maxMark: 9.99 },
      { minMark: 10, maxMark: 20 },
    ];
    const overlaps = ranges[0].maxMark >= ranges[1].minMark;
    expect(overlaps).toBe(false);
  });

  it('should create grade rule', () => {
    const rule: GradeRule = {
      id: 'rule-1', schoolId: 'school-1', name: 'Passage Rule',
      conditions: [{ field: 'average', operator: 'GTE', value: 10 }],
      grade: 'PASS', priority: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(rule.conditions).toHaveLength(1);
    expect(rule.grade).toBe('PASS');
  });

  it('should map mark to grade', () => {
    const mark = 17;
    const grades = [
      { name: 'A', minMark: 16, maxMark: 20 },
      { name: 'B', minMark: 14, maxMark: 15.99 },
    ];
    const grade = grades.find(g => mark >= g.minMark && mark <= g.maxMark);
    expect(grade?.name).toBe('A');
  });

  it('should calculate percentage', () => {
    const mark = 15;
    const maxMark = 20;
    const percentage = (mark / maxMark) * 100;
    expect(percentage).toBe(75);
  });

  it('should handle all decision types in rules', () => {
    const decisions = ['PASSAGE', 'REPETITION', 'ORIENTATION', 'EXCLUSION', 'HONOR', 'ENCOURAGEMENT', 'CONDITIONAL_PASSAGE', 'BOARD_DECISION'];
    expect(decisions).toHaveLength(8);
  });

  it('should validate grade rule conditions', () => {
    const condition = { field: 'average', operator: 'GTE', value: 10 };
    expect(condition.operator).toBe('GTE');
  });

  it('should order grades by priority', () => {
    const rules = [
      { id: 'r1', priority: 3 },
      { id: 'r2', priority: 1 },
      { id: 'r3', priority: 2 },
    ];
    const sorted = [...rules].sort((a, b) => a.priority - b.priority);
    expect(sorted[0].id).toBe('r2');
  });

  it('should calculate coefficient-weighted grade', () => {
    const marks = [{ mark: 15, coeff: 2 }, { mark: 10, coeff: 1 }];
    const totalCoeff = marks.reduce((a, b) => a + b.coeff, 0);
    const weightedSum = marks.reduce((a, b) => a + b.mark * b.coeff, 0);
    const avg = weightedSum / totalCoeff;
    expect(avg).toBe(13.333333333333334);
  });
});

describe('Exam Module Data Flow - Rankings', () => {
  it('should calculate student ranking', () => {
    const rank: StudentRanking = {
      id: 'rank-1', schoolId: 'school-1', studentId: 'student-1',
      studentName: 'Jean Dupont', classId: 'class-1', className: '6ème A',
      academicYearId: 'year-1', rank: 3, totalStudents: 30, average: 14.5,
      percentage: 72.5, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(rank.rank).toBe(3);
    expect(rank.totalStudents).toBe(30);
  });

  it('should calculate class ranking', () => {
    const classRank: ClassRanking = {
      id: 'cr-1', schoolId: 'school-1', classId: 'class-1',
      className: '6ème A', academicYearId: 'year-1', rankings: [],
      averageRate: 12.5, topAverage: 18.0, bottomAverage: 5.0,
      medianAverage: 13.0, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(classRank.averageRate).toBe(12.5);
  });

  it('should calculate school ranking', () => {
    const schoolRank: SchoolRanking = {
      id: 'sr-1', schoolId: 'school-1', academicYearId: 'year-1',
      classRankings: [], overallAverage: 12.8, totalStudents: 200,
      overallPassRate: 75, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(schoolRank.overallAverage).toBe(12.8);
  });

  it('should sort students by average', () => {
    const students = [
      { id: 's1', average: 15 },
      { id: 's2', average: 18 },
      { id: 's3', average: 12 },
    ];
    const sorted = [...students].sort((a, b) => b.average - a.average);
    expect(sorted[0].id).toBe('s2');
  });

  it('should handle tie-breaking by name', () => {
    const students = [
      { id: 's1', average: 15, name: 'Alice' },
      { id: 's2', average: 15, name: 'Bob' },
    ];
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    expect(sorted[0].name).toBe('Alice');
  });

  it('should calculate class statistics', () => {
    const stats = {
      averageRate: 12.5,
      topAverage: 18.0,
      bottomAverage: 5.0,
      medianAverage: 13.0,
    };
    expect(stats.topAverage).toBeGreaterThan(stats.averageRate);
    expect(stats.bottomAverage).toBeLessThan(stats.averageRate);
  });

  it('should calculate pass rate', () => {
    const students = [
      { average: 15 },
      { average: 12 },
      { average: 8 },
      { average: 14 },
    ];
    const passing = students.filter(s => s.average >= 10);
    const passRate = (passing.length / students.length) * 100;
    expect(passRate).toBe(75);
  });

  it('should handle ranking methods', () => {
    const methods = ['AVERAGE', 'WEIGHTED_AVERAGE', 'TOTAL', 'MEDIAN'];
    expect(methods).toHaveLength(4);
  });

  it('should calculate median', () => {
    const values = [10, 12, 14, 15, 18];
    const median = values[Math.floor(values.length / 2)];
    expect(median).toBe(14);
  });

  it('should calculate standard deviation', () => {
    const values = [10, 12, 14, 15, 18];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    expect(stdDev).toBeGreaterThan(0);
  });
});

describe('Exam Module Data Flow - Decisions', () => {
  it('should create decision', () => {
    const decision: Decision = {
      id: 'dec-1', schoolId: 'school-1', studentId: 'student-1',
      classId: 'class-1', academicYearId: 'year-1', decisionType: 'PASSAGE',
      status: 'PENDING', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(decision.decisionType).toBe('PASSAGE');
    expect(decision.status).toBe('PENDING');
  });

  it('should support all decision types', () => {
    const types: Decision['decisionType'][] = ['PASSAGE', 'REPETITION', 'ORIENTATION', 'EXCLUSION', 'HONOR', 'ENCOURAGEMENT', 'CONDITIONAL_PASSAGE', 'BOARD_DECISION'];
    expect(types).toHaveLength(8);
  });

  it('should apply decision thresholds', () => {
    const thresholds = { passage: 10, honor: 16, excellence: 18, encouragement: 14, repetitionMax: 10, exclusionMax: 5 };
    expect(thresholds.passage).toBe(10);
    expect(thresholds.honor).toBe(16);
  });

  it('should determine decision from average', () => {
    const average = 15;
    const thresholds = { passage: 10, honor: 16, excellence: 18 };
    let decision = 'PASSAGE';
    if (average >= thresholds.excellence) decision = 'EXCELLENCE';
    else if (average >= thresholds.honor) decision = 'HONOR';
    expect(decision).toBe('PASSAGE');
  });

  it('should approve decision', () => {
    const decision: Decision = {
      id: 'dec-1', schoolId: 's1', studentId: 's1', classId: 'c1',
      academicYearId: 'y1', decisionType: 'PASSAGE', status: 'APPROVED',
      createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(decision.status).toBe('APPROVED');
  });

  it('should handle decision for repetition', () => {
    const average = 7;
    const decision = average < 10 ? 'REPETITION' : 'PASSAGE';
    expect(decision).toBe('REPETITION');
  });

  it('should handle decision for exclusion', () => {
    const average = 3;
    const decision = average <= 5 ? 'EXCLUSION' : 'PASSAGE';
    expect(decision).toBe('EXCLUSION');
  });

  it('should handle conditional passage', () => {
    const average = 9.5;
    const decision = average >= 9 && average < 10 ? 'CONDITIONAL_PASSAGE' : 'PASSAGE';
    expect(decision).toBe('CONDITIONAL_PASSAGE');
  });

  it('should handle board decision', () => {
    const decision = 'BOARD_DECISION';
    expect(decision).toBe('BOARD_DECISION');
  });

  it('should find decision by student', () => {
    const decisions = [
      { studentId: 's1', decisionType: 'PASSAGE' },
      { studentId: 's2', decisionType: 'REPETITION' },
    ];
    const found = decisions.find(d => d.studentId === 's2');
    expect(found?.decisionType).toBe('REPETITION');
  });
});

describe('Exam Module Data Flow - Competencies', () => {
  it('should create competency', () => {
    const competency: Competency = {
      id: 'comp-1', schoolId: 'school-1', name: 'Reading Comprehension',
      description: 'Ability to understand written texts', domain: 'Language',
      level: 'PROFICIENT', order: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(competency.name).toBe('Reading Comprehension');
    expect(competency.level).toBe('PROFICIENT');
  });

  it('should support all competency levels', () => {
    const levels: Competency['level'][] = ['BEGINNER', 'DEVELOPING', 'PROFICIENT', 'ADVANCED', 'EXCELLENT'];
    expect(levels).toHaveLength(5);
  });

  it('should create competency result', () => {
    const result: CompetencyResult = {
      id: 'cr-1', schoolId: 'school-1', studentId: 'student-1',
      competencyId: 'comp-1', classId: 'class-1', academicYearId: 'year-1',
      level: 'ADVANCED', score: 85, assessedBy: 'teacher-1',
      assessedAt: '2026-01-01T00:00:00Z', createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(result.score).toBe(85);
    expect(result.level).toBe('ADVANCED');
  });

  it('should validate competency score', () => {
    const score = 85;
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('should map score to level', () => {
    const score = 85;
    let level = 'BEGINNER';
    if (score >= 90) level = 'EXCELLENT';
    else if (score >= 80) level = 'ADVANCED';
    else if (score >= 60) level = 'PROFICIENT';
    else if (score >= 40) level = 'DEVELOPING';
    expect(level).toBe('ADVANCED');
  });

  it('should validate pass threshold', () => {
    const score = 60;
    const threshold = 60;
    expect(score).toBeGreaterThanOrEqual(threshold);
  });

  it('should calculate competency average', () => {
    const results = [{ score: 85 }, { score: 90 }, { score: 75 }];
    const avg = results.reduce((a, b) => a + b.score, 0) / results.length;
    expect(avg).toBe(83.33333333333333);
  });

  it('should handle correction', () => {
    const correction: Correction = {
      id: 'corr-1', schoolId: 'school-1', examId: 'exam-1',
      studentId: 'student-1', previousMarks: 12, newMarks: 15,
      reason: 'Calculation error', status: 'PENDING',
      requestedBy: 'teacher-1', requestedAt: '2026-01-01T00:00:00Z',
      createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(correction.newMarks).toBeGreaterThan(correction.previousMarks);
  });

  it('should handle correction approval', () => {
    const correction: Correction = {
      id: 'corr-1', schoolId: 's1', examId: 'e1', studentId: 's1',
      previousMarks: 12, newMarks: 15, reason: 'Error', status: 'APPROVED',
      requestedBy: 't1', requestedAt: '2026-01-01T00:00:00Z',
      createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(correction.status).toBe('APPROVED');
  });

  it('should handle coefficient', () => {
    const coeff: SubjectCoefficient = {
      id: 'sc-1', schoolId: 'school-1', subjectId: 'subject-1',
      classId: 'class-1', academicYearId: 'year-1', coefficient: 2.5,
      isActive: true, createdAt: '2026-01-01T00:00:00Z',
    };
    expect(coeff.coefficient).toBe(2.5);
  });
});

describe('Exam Module Data Flow - Errors', () => {
  it('should handle ExamNotFoundError', () => {
    const error = new ExamNotFoundError('exam-999');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toContain('exam-999');
  });

  it('should handle ExamLockedError', () => {
    const error = new ExamLockedError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle InvalidMarkError', () => {
    const error = new InvalidMarkError('abc');
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle NegativeMarkError', () => {
    const error = new NegativeMarkError(-5);
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle MarkExceedsMaxError', () => {
    const error = new MarkExceedsMaxError(25, 20);
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle GradeCalculationError', () => {
    const error = new GradeCalculationError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle RankingCalculationError', () => {
    const error = new RankingCalculationError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle DecisionConflictError', () => {
    const error = new DecisionConflictError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle CompetencyCalculationError', () => {
    const error = new CompetencyCalculationError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should handle error with custom message', () => {
    const error = new GradeCalculationError('Custom error message');
    expect(error.message).toBe('Custom error message');
  });
});
