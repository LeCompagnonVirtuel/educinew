import { z } from 'zod';

const ExamTypeEnum = z.enum(['CONTINUOUS', 'END_OF_TERM', 'MID_TERM', 'FINAL', 'DIAGNOSTIC', 'HOMEWORK', 'ORAL', 'PRACTICAL', 'PROJECT']);
const ExamModeEnum = z.enum(['WRITTEN', 'ORAL', 'PRACTICAL', 'ONLINE', 'BLENDED']);
const ExamStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'LOCKED', 'ARCHIVED']);
const DecisionTypeEnum = z.enum(['PASSAGE', 'REPETITION', 'ORIENTATION', 'EXCLUSION', 'HONOR', 'ENCOURAGEMENT', 'CONDITIONAL_PASSAGE', 'BOARD_DECISION']);
const CorrectionStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED']);
const RankingMethodEnum = z.enum(['AVERAGE', 'WEIGHTED_AVERAGE', 'TOTAL', 'MEDIAN']);
const CompetencyLevelEnum = z.enum(['BEGINNER', 'DEVELOPING', 'PROFICIENT', 'ADVANCED', 'EXCELLENT']);
const MarkEntryStatusEnum = z.enum(['DRAFT', 'SUBMITTED', 'VALIDATED', 'PUBLISHED']);

export const examFiltersSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid().optional(),
  termId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  type: ExamTypeEnum.optional(),
  status: ExamStatusEnum.optional(),
  search: z.string().min(1).max(255).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  minCoefficient: z.number().min(0).optional(),
  maxCoefficient: z.number().min(0).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(['name', 'date', 'type', 'coefficient', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const createExamSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  termId: z.string().uuid(),
  classId: z.string().uuid(),
  subjectId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: ExamTypeEnum,
  mode: ExamModeEnum,
  coefficient: z.number().min(0.1).max(10),
  maxMark: z.number().min(1).max(100),
  passMark: z.number().min(0),
  duration: z.number().int().min(1).optional(),
  date: z.string().datetime(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().max(255).optional(),
  instructions: z.string().max(2000).optional(),
  allowLateSubmission: z.boolean().optional(),
  maxLateMinutes: z.number().int().min(0).optional(),
  autoPublish: z.boolean().optional(),
});

export const updateExamSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  type: ExamTypeEnum.optional(),
  mode: ExamModeEnum.optional(),
  coefficient: z.number().min(0.1).max(10).optional(),
  maxMark: z.number().min(1).max(100).optional(),
  passMark: z.number().min(0).optional(),
  duration: z.number().int().min(1).optional(),
  date: z.string().datetime().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().max(255).optional(),
  instructions: z.string().max(2000).optional(),
  status: ExamStatusEnum.optional(),
  allowLateSubmission: z.boolean().optional(),
  maxLateMinutes: z.number().int().min(0).optional(),
  autoPublish: z.boolean().optional(),
});

export const markEntrySchema = z.object({
  examId: z.string().uuid(),
  studentId: z.string().uuid(),
  marks: z.array(z.object({
    subjectId: z.string().uuid(),
    mark: z.number().min(0),
    maxMark: z.number().min(1),
    comment: z.string().max(500).optional(),
  })).min(1),
  status: MarkEntryStatusEnum.optional(),
});

export const bulkMarkEntrySchema = z.object({
  examId: z.string().uuid(),
  entries: z.array(z.object({
    studentId: z.string().uuid(),
    marks: z.array(z.object({
      subjectId: z.string().uuid(),
      mark: z.number().min(0),
      maxMark: z.number().min(1),
      comment: z.string().max(500).optional(),
    })).min(1),
  })).min(1).max(200),
  status: MarkEntryStatusEnum.optional(),
});

export const gradeSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(100),
  minMark: z.number().min(0),
  maxMark: z.number().min(0),
  comment: z.string().max(500).optional(),
  order: z.number().int().min(0),
});

export const gradeRuleSchema = z.object({
  schoolId: z.string().uuid(),
  gradeId: z.string().uuid(),
  termId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  minAverage: z.number().min(0),
  maxAverage: z.number().min(0),
  decision: DecisionTypeEnum,
  comment: z.string().max(500).optional(),
});

export const subjectCoefficientSchema = z.object({
  schoolId: z.string().uuid(),
  classId: z.string().uuid(),
  subjectId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  coefficient: z.number().min(0.1).max(10),
  isMain: z.boolean().optional(),
});

export const decisionSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  termId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  decision: DecisionTypeEnum,
  average: z.number().min(0).optional(),
  rank: z.number().int().min(1).optional(),
  totalStudents: z.number().int().min(1).optional(),
  comment: z.string().max(1000).optional(),
  merit: z.enum(['NONE', 'HONOR', 'ENCOURAGEMENT']).optional(),
  boardDecision: z.boolean().optional(),
});

export const reportCardSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  termId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  includeAttendance: z.boolean().optional(),
  includeRemarks: z.boolean().optional(),
  format: z.enum(['PDF', 'HTML', 'JSON']).optional(),
});

export const transcriptSchema = z.object({
  studentId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  includeAllTerms: z.boolean().optional(),
  includeAttendance: z.boolean().optional(),
  includeRemarks: z.boolean().optional(),
  format: z.enum(['PDF', 'HTML', 'JSON']).optional(),
});

export const competencySchema = z.object({
  schoolId: z.string().uuid(),
  subjectId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  level: CompetencyLevelEnum,
  order: z.number().int().min(0),
  maxScore: z.number().min(1).optional(),
});

export const competencyResultSchema = z.object({
  studentId: z.string().uuid(),
  competencyId: z.string().uuid(),
  examId: z.string().uuid(),
  score: z.number().min(0),
  maxScore: z.number().min(1),
  level: CompetencyLevelEnum,
  comment: z.string().max(500).optional(),
});

export const correctionSchema = z.object({
  examId: z.string().uuid(),
  studentId: z.string().uuid(),
  originalMark: z.number().min(0),
  correctedMark: z.number().min(0),
  reason: z.string().min(1).max(1000),
  correctedBy: z.string().uuid(),
  status: CorrectionStatusEnum.optional(),
});

export const importMarksSchema = z.object({
  schoolId: z.string().uuid(),
  examId: z.string().uuid(),
  format: z.enum(['CSV', 'EXCEL', 'JSON']),
  data: z.string().optional(),
  fileUrl: z.string().url().optional(),
  overwrite: z.boolean().optional(),
  validateOnly: z.boolean().optional(),
}).refine(data => data.data !== undefined || data.fileUrl !== undefined, {
  message: 'Either data or fileUrl must be provided',
});

export const exportMarksSchema = z.object({
  schoolId: z.string().uuid(),
  examId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  termId: z.string().uuid().optional(),
  format: z.enum(['CSV', 'EXCEL', 'JSON', 'PDF']),
  includeComments: z.boolean().optional(),
  includeStatistics: z.boolean().optional(),
  includeRankings: z.boolean().optional(),
}).refine(data => data.examId !== undefined || data.classId !== undefined, {
  message: 'Either examId or classId must be provided',
});

export const examSearchSchema = z.object({
  schoolId: z.string().uuid(),
  query: z.string().min(1).max(255),
  types: z.array(ExamTypeEnum).optional(),
  statuses: z.array(ExamStatusEnum).optional(),
  classIds: z.array(z.string().uuid()).optional(),
  subjectIds: z.array(z.string().uuid()).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const examStatisticsSchema = z.object({
  examId: z.string().uuid(),
  schoolId: z.string().uuid(),
  includeDistribution: z.boolean().optional(),
  includePercentiles: z.boolean().optional(),
  includePassRate: z.boolean().optional(),
  includeSubjectComparison: z.boolean().optional(),
});

export const publicationSchema = z.object({
  examId: z.string().uuid(),
  schoolId: z.string().uuid(),
  publishMarks: z.boolean().optional(),
  publishRankings: z.boolean().optional(),
  publishGrades: z.boolean().optional(),
  publishComments: z.boolean().optional(),
  notifyStudents: z.boolean().optional(),
  notifyParents: z.boolean().optional(),
  message: z.string().max(1000).optional(),
});

export const examSettingsSchema = z.object({
  schoolId: z.string().uuid(),
  defaultMaxMark: z.number().min(1).max(100).optional(),
  defaultPassMark: z.number().min(0).optional(),
  defaultCoefficient: z.number().min(0.1).max(10).optional(),
  rankingMethod: RankingMethodEnum.optional(),
  showRankingToStudents: z.boolean().optional(),
  showGradesToStudents: z.boolean().optional(),
  allowSelfMarkEntry: z.boolean().optional(),
  requireApprovalForMarkEntry: z.boolean().optional(),
  autoCalculateAverages: z.boolean().optional(),
  autoCalculateRankings: z.boolean().optional(),
  notifyOnMarkEntry: z.boolean().optional(),
  notifyOnPublication: z.boolean().optional(),
  retentionDays: z.number().int().min(0).optional(),
});

export const examSessionSchema = z.object({
  examId: z.string().uuid(),
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(255),
  date: z.string().datetime(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string().max(255).optional(),
  proctorIds: z.array(z.string().uuid()).optional(),
  maxStudents: z.number().int().min(1).optional(),
});

export const markHistorySchema = z.object({
  markEntryId: z.string().uuid(),
  schoolId: z.string().uuid(),
  previousMark: z.number().min(0).optional(),
  newMark: z.number().min(0),
  reason: z.string().min(1).max(500),
  changedBy: z.string().uuid(),
});

export const markValidationSchema = z.object({
  examId: z.string().uuid(),
  schoolId: z.string().uuid(),
  validatedBy: z.string().uuid(),
  marks: z.array(z.object({
    markEntryId: z.string().uuid(),
    approved: z.boolean(),
    comment: z.string().max(500).optional(),
  })).min(1),
});

export const subjectAverageSchema = z.object({
  studentId: z.string().uuid(),
  subjectId: z.string().uuid(),
  classId: z.string().uuid(),
  termId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  average: z.number().min(0),
  rank: z.number().int().min(1).optional(),
  totalStudents: z.number().int().min(1).optional(),
});

export const termAverageSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  termId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  average: z.number().min(0),
  rank: z.number().int().min(1).optional(),
  totalStudents: z.number().int().min(1).optional(),
});

export const semesterAverageSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  semester: z.number().int().min(1).max(3),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  average: z.number().min(0),
  rank: z.number().int().min(1).optional(),
  totalStudents: z.number().int().min(1).optional(),
});

export const annualAverageSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  average: z.number().min(0),
  rank: z.number().int().min(1).optional(),
  totalStudents: z.number().int().min(1).optional(),
});

export const studentRankingSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  termId: z.string().uuid().optional(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  average: z.number().min(0),
  rank: z.number().int().min(1),
  totalStudents: z.number().int().min(1),
  method: RankingMethodEnum.optional(),
});

export const classRankingSchema = z.object({
  classId: z.string().uuid(),
  termId: z.string().uuid().optional(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  method: RankingMethodEnum.optional(),
  includeArchived: z.boolean().optional(),
});

export const schoolRankingSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  termId: z.string().uuid().optional(),
  classIds: z.array(z.string().uuid()).optional(),
  method: RankingMethodEnum.optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const meritSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  termId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  schoolId: z.string().uuid(),
  type: z.enum(['HONOR', 'ENCOURAGEMENT']),
  average: z.number().min(0),
  rank: z.number().int().min(1),
  comment: z.string().max(500).optional(),
});

export const examResultSchema = z.object({
  examId: z.string().uuid(),
  studentId: z.string().uuid(),
  schoolId: z.string().uuid(),
  mark: z.number().min(0),
  maxMark: z.number().min(1),
  grade: z.string().max(50).optional(),
  comment: z.string().max(500).optional(),
  status: z.enum(['PENDING', 'PUBLISHED', 'CORRECTED']).optional(),
});

export const examResultItemSchema = z.object({
  resultId: z.string().uuid(),
  subjectId: z.string().uuid(),
  mark: z.number().min(0),
  maxMark: z.number().min(1),
  coefficient: z.number().min(0.1).max(10).optional(),
  comment: z.string().max(500).optional(),
});

export const examDashboardSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid().optional(),
  termId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  includeUpcoming: z.boolean().optional(),
  includeRecent: z.boolean().optional(),
  includeStatistics: z.boolean().optional(),
});

export const examTimelineSchema = z.object({
  schoolId: z.string().uuid(),
  classId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const examAuditSchema = z.object({
  schoolId: z.string().uuid(),
  examId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  action: z.string().max(100).optional(),
  entityType: z.string().max(100).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(100).optional(),
  offset: z.number().int().min(0).optional(),
});

export const examNotificationSchema = z.object({
  schoolId: z.string().uuid(),
  examId: z.string().uuid().optional(),
  type: z.enum(['MARK_ENTRY', 'PUBLICATION', 'CORRECTION', 'REMINDER', 'DEADLINE']),
  recipientIds: z.array(z.string().uuid()).min(1),
  message: z.string().min(1).max(1000),
  scheduledAt: z.string().datetime().optional(),
});

export const examScheduleSchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  termId: z.string().uuid(),
  classId: z.string().uuid().optional(),
  exams: z.array(z.object({
    examId: z.string().uuid(),
    date: z.string().datetime(),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string().max(255).optional(),
  })).min(1),
});

export const gradeScaleSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(100),
  grades: z.array(z.object({
    name: z.string().min(1).max(50),
    minMark: z.number().min(0),
    maxMark: z.number().min(0),
    comment: z.string().max(500).optional(),
  })).min(1),
  isDefault: z.boolean().optional(),
});

export const examRepositorySchema = z.object({
  schoolId: z.string().uuid(),
  academicYearId: z.string().uuid().optional(),
  termId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  examType: ExamTypeEnum.optional(),
  status: ExamStatusEnum.optional(),
  search: z.string().min(1).max(255).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.enum(['name', 'date', 'type', 'coefficient', 'status', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
