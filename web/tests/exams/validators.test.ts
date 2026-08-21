import { describe, it, expect } from 'vitest';
import {
  examFiltersSchema,
  createExamSchema,
  updateExamSchema,
  markEntrySchema,
  bulkMarkEntrySchema,
  gradeSchema,
  gradeRuleSchema,
  subjectCoefficientSchema,
  decisionSchema,
  reportCardSchema,
  transcriptSchema,
  competencySchema,
  competencyResultSchema,
  correctionSchema,
  importMarksSchema,
  exportMarksSchema,
  examSearchSchema,
  examStatisticsSchema,
  publicationSchema,
  examSettingsSchema,
  examSessionSchema,
  markHistorySchema,
  markValidationSchema,
  subjectAverageSchema,
  termAverageSchema,
  semesterAverageSchema,
  annualAverageSchema,
  studentRankingSchema,
  classRankingSchema,
  schoolRankingSchema,
  meritSchema,
  examResultSchema,
  examResultItemSchema,
  examDashboardSchema,
  examTimelineSchema,
  examAuditSchema,
  examNotificationSchema,
  examScheduleSchema,
  gradeScaleSchema,
  examRepositorySchema,
} from '@/features/exams/validators/schemas';

const uuid = '550e8400-e29b-41d4-a716-446655440000';
const uuid2 = '550e8400-e29b-41d4-a716-446655440001';
const uuid3 = '550e8400-e29b-41d4-a716-446655440002';
const isoDate = '2026-06-15T08:00:00.000Z';

describe('Exam Validators', () => {
  describe('createExamSchema', () => {
    it('should validate correct exam data', () => {
      const result = createExamSchema.safeParse({
        schoolId: uuid,
        academicYearId: uuid,
        termId: uuid,
        classId: uuid,
        subjectId: uuid,
        name: 'Final Exam',
        type: 'FINAL',
        mode: 'WRITTEN',
        coefficient: 2,
        maxMark: 20,
        passMark: 10,
        date: isoDate,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = createExamSchema.safeParse({
        schoolId: uuid,
        academicYearId: uuid,
        termId: uuid,
        classId: uuid,
        subjectId: uuid,
        name: '',
        type: 'FINAL',
        mode: 'WRITTEN',
        coefficient: 2,
        maxMark: 20,
        passMark: 10,
        date: isoDate,
      });
      expect(result.success).toBe(false);
    });

    it('should reject coefficient below 0.1', () => {
      const result = createExamSchema.safeParse({
        schoolId: uuid,
        academicYearId: uuid,
        termId: uuid,
        classId: uuid,
        subjectId: uuid,
        name: 'Test',
        type: 'FINAL',
        mode: 'WRITTEN',
        coefficient: 0,
        maxMark: 20,
        passMark: 10,
        date: isoDate,
      });
      expect(result.success).toBe(false);
    });

    it('should accept all exam types', () => {
      for (const type of ['CONTINUOUS', 'END_OF_TERM', 'MID_TERM', 'FINAL', 'DIAGNOSTIC', 'HOMEWORK', 'ORAL', 'PRACTICAL', 'PROJECT']) {
        const result = createExamSchema.safeParse({
          schoolId: uuid, academicYearId: uuid, termId: uuid, classId: uuid, subjectId: uuid,
          name: 'Test', type, mode: 'WRITTEN', coefficient: 1, maxMark: 20, passMark: 10, date: isoDate,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all exam modes', () => {
      for (const mode of ['WRITTEN', 'ORAL', 'PRACTICAL', 'ONLINE', 'BLENDED']) {
        const result = createExamSchema.safeParse({
          schoolId: uuid, academicYearId: uuid, termId: uuid, classId: uuid, subjectId: uuid,
          name: 'Test', type: 'FINAL', mode, coefficient: 1, maxMark: 20, passMark: 10, date: isoDate,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept optional fields', () => {
      const result = createExamSchema.safeParse({
        schoolId: uuid, academicYearId: uuid, termId: uuid, classId: uuid, subjectId: uuid,
        name: 'Test', type: 'FINAL', mode: 'WRITTEN', coefficient: 1, maxMark: 20, passMark: 10,
        date: isoDate, duration: 120, location: 'Room A', instructions: 'Be careful',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('updateExamSchema', () => {
    it('should validate partial update', () => {
      const result = updateExamSchema.safeParse({ name: 'Updated Exam' });
      expect(result.success).toBe(true);
    });

    it('should accept all optional fields', () => {
      const result = updateExamSchema.safeParse({
        name: 'Updated',
        description: 'New desc',
        type: 'MID_TERM',
        mode: 'ONLINE',
        coefficient: 3,
        maxMark: 30,
        passMark: 15,
        status: 'PUBLISHED',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('markEntrySchema', () => {
    it('should validate correct mark entry', () => {
      const result = markEntrySchema.safeParse({
        examId: uuid,
        studentId: uuid,
        marks: [{ subjectId: uuid, mark: 15, maxMark: 20 }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty marks array', () => {
      const result = markEntrySchema.safeParse({
        examId: uuid,
        studentId: uuid,
        marks: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative mark', () => {
      const result = markEntrySchema.safeParse({
        examId: uuid,
        studentId: uuid,
        marks: [{ subjectId: uuid, mark: -1, maxMark: 20 }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('bulkMarkEntrySchema', () => {
    it('should validate correct bulk entry', () => {
      const result = bulkMarkEntrySchema.safeParse({
        examId: uuid,
        entries: [{
          studentId: uuid,
          marks: [{ subjectId: uuid, mark: 15, maxMark: 20 }],
        }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty entries', () => {
      const result = bulkMarkEntrySchema.safeParse({
        examId: uuid,
        entries: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('gradeSchema', () => {
    it('should validate correct grade', () => {
      const result = gradeSchema.safeParse({
        schoolId: uuid,
        name: 'A',
        minMark: 16,
        maxMark: 20,
        order: 1,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = gradeSchema.safeParse({
        schoolId: uuid, name: '', minMark: 16, maxMark: 20, order: 1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('gradeRuleSchema', () => {
    it('should validate correct rule', () => {
      const result = gradeRuleSchema.safeParse({
        schoolId: uuid,
        gradeId: uuid,
        minAverage: 10,
        maxAverage: 20,
        decision: 'PASSAGE',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all decision types', () => {
      for (const decision of ['PASSAGE', 'REPETITION', 'ORIENTATION', 'EXCLUSION', 'HONOR', 'ENCOURAGEMENT', 'CONDITIONAL_PASSAGE', 'BOARD_DECISION']) {
        const result = gradeRuleSchema.safeParse({
          schoolId: uuid, gradeId: uuid, minAverage: 0, maxAverage: 20, decision,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('subjectCoefficientSchema', () => {
    it('should validate correct coefficient', () => {
      const result = subjectCoefficientSchema.safeParse({
        schoolId: uuid, classId: uuid, subjectId: uuid, academicYearId: uuid, coefficient: 2,
      });
      expect(result.success).toBe(true);
    });

    it('should reject coefficient below 0.1', () => {
      const result = subjectCoefficientSchema.safeParse({
        schoolId: uuid, classId: uuid, subjectId: uuid, academicYearId: uuid, coefficient: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('decisionSchema', () => {
    it('should validate correct decision', () => {
      const result = decisionSchema.safeParse({
        studentId: uuid, classId: uuid, termId: uuid, academicYearId: uuid, schoolId: uuid,
        decision: 'PASSAGE',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('reportCardSchema', () => {
    it('should validate correct report card request', () => {
      const result = reportCardSchema.safeParse({
        studentId: uuid, classId: uuid, termId: uuid, academicYearId: uuid, schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });

    it('should accept format options', () => {
      for (const format of ['PDF', 'HTML', 'JSON']) {
        const result = reportCardSchema.safeParse({
          studentId: uuid, classId: uuid, termId: uuid, academicYearId: uuid, schoolId: uuid, format,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('transcriptSchema', () => {
    it('should validate correct transcript request', () => {
      const result = transcriptSchema.safeParse({
        studentId: uuid, academicYearId: uuid, schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('competencySchema', () => {
    it('should validate correct competency', () => {
      const result = competencySchema.safeParse({
        schoolId: uuid, subjectId: uuid, name: 'Reading', level: 'PROFICIENT', order: 1,
      });
      expect(result.success).toBe(true);
    });

    it('should accept all competency levels', () => {
      for (const level of ['BEGINNER', 'DEVELOPING', 'PROFICIENT', 'ADVANCED', 'EXCELLENT']) {
        const result = competencySchema.safeParse({
          schoolId: uuid, subjectId: uuid, name: 'Test', level, order: 1,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('competencyResultSchema', () => {
    it('should validate correct result', () => {
      const result = competencyResultSchema.safeParse({
        studentId: uuid, competencyId: uuid, examId: uuid, score: 85, maxScore: 100, level: 'ADVANCED',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('correctionSchema', () => {
    it('should validate correct correction', () => {
      const result = correctionSchema.safeParse({
        examId: uuid, studentId: uuid, originalMark: 12, correctedMark: 15,
        reason: 'Error in grading', correctedBy: uuid,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty reason', () => {
      const result = correctionSchema.safeParse({
        examId: uuid, studentId: uuid, originalMark: 12, correctedMark: 15,
        reason: '', correctedBy: uuid,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('importMarksSchema', () => {
    it('should validate with data field', () => {
      const result = importMarksSchema.safeParse({
        schoolId: uuid, examId: uuid, format: 'CSV', data: 'csv-content',
      });
      expect(result.success).toBe(true);
    });

    it('should validate with fileUrl field', () => {
      const result = importMarksSchema.safeParse({
        schoolId: uuid, examId: uuid, format: 'EXCEL', fileUrl: 'https://example.com/file.xlsx',
      });
      expect(result.success).toBe(true);
    });

    it('should reject without data or fileUrl', () => {
      const result = importMarksSchema.safeParse({
        schoolId: uuid, examId: uuid, format: 'CSV',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('exportMarksSchema', () => {
    it('should validate with examId', () => {
      const result = exportMarksSchema.safeParse({
        schoolId: uuid, examId: uuid, format: 'PDF',
      });
      expect(result.success).toBe(true);
    });

    it('should validate with classId', () => {
      const result = exportMarksSchema.safeParse({
        schoolId: uuid, classId: uuid, format: 'CSV',
      });
      expect(result.success).toBe(true);
    });

    it('should reject without examId or classId', () => {
      const result = exportMarksSchema.safeParse({
        schoolId: uuid, format: 'JSON',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('examSearchSchema', () => {
    it('should validate correct search', () => {
      const result = examSearchSchema.safeParse({
        schoolId: uuid, query: 'math',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty query', () => {
      const result = examSearchSchema.safeParse({
        schoolId: uuid, query: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('examStatisticsSchema', () => {
    it('should validate correct stats request', () => {
      const result = examStatisticsSchema.safeParse({
        examId: uuid, schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('publicationSchema', () => {
    it('should validate correct publication', () => {
      const result = publicationSchema.safeParse({
        examId: uuid, schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });

    it('should accept all options', () => {
      const result = publicationSchema.safeParse({
        examId: uuid, schoolId: uuid, publishMarks: true, publishRankings: true,
        publishGrades: true, notifyStudents: true, notifyParents: true, message: 'Published',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examSettingsSchema', () => {
    it('should validate correct settings', () => {
      const result = examSettingsSchema.safeParse({
        schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });

    it('should accept all settings options', () => {
      const result = examSettingsSchema.safeParse({
        schoolId: uuid, defaultMaxMark: 20, defaultPassMark: 10,
        defaultCoefficient: 1, rankingMethod: 'WEIGHTED_AVERAGE',
        showRankingToStudents: true, autoCalculateAverages: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examSessionSchema', () => {
    it('should validate correct session', () => {
      const result = examSessionSchema.safeParse({
        examId: uuid, schoolId: uuid, name: 'Session 1',
        date: isoDate, startTime: '08:00', endTime: '10:00',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('markHistorySchema', () => {
    it('should validate correct history', () => {
      const result = markHistorySchema.safeParse({
        markEntryId: uuid, schoolId: uuid, newMark: 15,
        reason: 'Correction', changedBy: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('markValidationSchema', () => {
    it('should validate correct validation', () => {
      const result = markValidationSchema.safeParse({
        examId: uuid, schoolId: uuid, validatedBy: uuid,
        marks: [{ markEntryId: uuid, approved: true }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('subjectAverageSchema', () => {
    it('should validate correct average', () => {
      const result = subjectAverageSchema.safeParse({
        studentId: uuid, subjectId: uuid, classId: uuid, termId: uuid,
        academicYearId: uuid, schoolId: uuid, average: 14.5,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('termAverageSchema', () => {
    it('should validate correct average', () => {
      const result = termAverageSchema.safeParse({
        studentId: uuid, classId: uuid, termId: uuid,
        academicYearId: uuid, schoolId: uuid, average: 13.2,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('semesterAverageSchema', () => {
    it('should validate correct average', () => {
      const result = semesterAverageSchema.safeParse({
        studentId: uuid, classId: uuid, semester: 1,
        academicYearId: uuid, schoolId: uuid, average: 14.0,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid semester', () => {
      const result = semesterAverageSchema.safeParse({
        studentId: uuid, classId: uuid, semester: 4,
        academicYearId: uuid, schoolId: uuid, average: 14.0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('annualAverageSchema', () => {
    it('should validate correct average', () => {
      const result = annualAverageSchema.safeParse({
        studentId: uuid, classId: uuid, academicYearId: uuid,
        schoolId: uuid, average: 13.8,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('studentRankingSchema', () => {
    it('should validate correct ranking', () => {
      const result = studentRankingSchema.safeParse({
        studentId: uuid, classId: uuid, academicYearId: uuid,
        schoolId: uuid, average: 14.5, rank: 3, totalStudents: 30,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('classRankingSchema', () => {
    it('should validate correct class ranking', () => {
      const result = classRankingSchema.safeParse({
        classId: uuid, academicYearId: uuid, schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('schoolRankingSchema', () => {
    it('should validate correct school ranking', () => {
      const result = schoolRankingSchema.safeParse({
        schoolId: uuid, academicYearId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('meritSchema', () => {
    it('should validate correct merit', () => {
      const result = meritSchema.safeParse({
        studentId: uuid, classId: uuid, termId: uuid,
        academicYearId: uuid, schoolId: uuid, type: 'HONOR',
        average: 17.5, rank: 1,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examResultSchema', () => {
    it('should validate correct result', () => {
      const result = examResultSchema.safeParse({
        examId: uuid, studentId: uuid, schoolId: uuid,
        mark: 15, maxMark: 20,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examResultItemSchema', () => {
    it('should validate correct result item', () => {
      const result = examResultItemSchema.safeParse({
        resultId: uuid, subjectId: uuid, mark: 15, maxMark: 20,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examDashboardSchema', () => {
    it('should validate correct dashboard request', () => {
      const result = examDashboardSchema.safeParse({
        schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examTimelineSchema', () => {
    it('should validate correct timeline request', () => {
      const result = examTimelineSchema.safeParse({
        schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examAuditSchema', () => {
    it('should validate correct audit request', () => {
      const result = examAuditSchema.safeParse({
        schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examNotificationSchema', () => {
    it('should validate correct notification', () => {
      const result = examNotificationSchema.safeParse({
        schoolId: uuid, type: 'MARK_ENTRY',
        recipientIds: [uuid], message: 'Enter marks',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty recipientIds', () => {
      const result = examNotificationSchema.safeParse({
        schoolId: uuid, type: 'MARK_ENTRY',
        recipientIds: [], message: 'Enter marks',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('examScheduleSchema', () => {
    it('should validate correct schedule', () => {
      const result = examScheduleSchema.safeParse({
        schoolId: uuid, academicYearId: uuid, termId: uuid,
        exams: [{ examId: uuid, date: isoDate, startTime: '08:00', endTime: '10:00' }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('gradeScaleSchema', () => {
    it('should validate correct scale', () => {
      const result = gradeScaleSchema.safeParse({
        schoolId: uuid, name: 'Standard Scale',
        grades: [{ name: 'A', minMark: 16, maxMark: 20 }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('examRepositorySchema', () => {
    it('should validate correct repository query', () => {
      const result = examRepositorySchema.safeParse({
        schoolId: uuid,
      });
      expect(result.success).toBe(true);
    });
  });
});
