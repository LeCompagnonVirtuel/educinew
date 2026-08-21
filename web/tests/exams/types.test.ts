import { describe, it, expect } from 'vitest';
import type {
  Exam,
  ExamSession,
  ExamResult,
  Grade,
  GradeRule,
  Mark,
  MarkEntry,
  SubjectAverage,
  TermAverage,
  SemesterAverage,
  AnnualAverage,
  StudentRanking,
  ClassRanking,
  SchoolRanking,
  Decision,
  Transcript,
  ReportCard,
  Competency,
  CompetencyResult,
  Correction,
  ExamStatistics,
  ExamDashboard,
  ExamTimeline,
  ExamAudit,
  MarkHistory,
  MarkValidation,
  SubjectCoefficient,
  ExamSearch,
  ExamFilters,
  ExamNotification,
  ExamSettings,
  ImportMarks,
  ExportMarks,
  Merit,
} from '@educi/types';

describe('Exam Types', () => {
  it('should have correct Exam interface shape', () => {
    const exam: Exam = {
      id: 'exam-1',
      schoolId: 'school-1',
      name: 'Examen Final',
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
    expect(exam.examType).toBe('FINAL');
    expect(exam.examMode).toBe('WRITTEN');
    expect(exam.status).toBe('DRAFT');
    expect(exam.totalMarks).toBe(20);
    expect(exam.passingMarks).toBe(10);
  });

  it('should support all ExamType values', () => {
    const types: Exam['examType'][] = ['CONTINUOUS', 'END_OF_TERM', 'MID_TERM', 'FINAL', 'DIAGNOSTIC', 'HOMEWORK', 'ORAL', 'PRACTICAL', 'PROJECT'];
    expect(types).toHaveLength(9);
  });

  it('should support all ExamMode values', () => {
    const modes: Exam['examMode'][] = ['WRITTEN', 'ORAL', 'PRACTICAL', 'ONLINE', 'BLENDED'];
    expect(modes).toHaveLength(5);
  });

  it('should support all ExamStatus values', () => {
    const statuses: Exam['status'][] = ['DRAFT', 'PUBLISHED', 'LOCKED', 'ARCHIVED'];
    expect(statuses).toHaveLength(4);
  });

  it('should have correct ExamSession interface shape', () => {
    const session: ExamSession = {
      id: 'session-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      sessionId: 'sess-1',
      date: '2026-06-15',
      startTime: '08:00',
      endTime: '10:00',
      status: 'PLANNED',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(session.examId).toBe('exam-1');
    expect(session.status).toBe('PLANNED');
  });

  it('should support ExamSession status values', () => {
    const statuses: ExamSession['status'][] = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    expect(statuses).toHaveLength(4);
  });

  it('should have correct ExamResult interface shape', () => {
    const result: ExamResult = {
      id: 'result-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      studentId: 'student-1',
      totalMarks: 16,
      maxMarks: 20,
      percentage: 80,
      isAbsent: false,
      isExcused: false,
      status: 'PENDING',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(result.totalMarks).toBe(16);
    expect(result.percentage).toBe(80);
    expect(result.isAbsent).toBe(false);
  });

  it('should support ExamResult status values', () => {
    const statuses: ExamResult['status'][] = ['PENDING', 'PUBLISHED', 'CORRECTED'];
    expect(statuses).toHaveLength(3);
  });

  it('should have correct Grade interface shape', () => {
    const grade: Grade = {
      id: 'grade-1',
      schoolId: 'school-1',
      name: 'A',
      minMark: 16,
      maxMark: 20,
      order: 1,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(grade.name).toBe('A');
    expect(grade.minMark).toBe(16);
    expect(grade.maxMark).toBe(20);
  });

  it('should have correct GradeRule interface shape', () => {
    const rule: GradeRule = {
      id: 'rule-1',
      schoolId: 'school-1',
      name: 'Passage Rule',
      conditions: [{ field: 'average', operator: 'GTE', value: 10 }],
      grade: 'PASS',
      priority: 1,
      isActive: true,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(rule.name).toBe('Passage Rule');
    expect(rule.conditions).toHaveLength(1);
    expect(rule.grade).toBe('PASS');
  });

  it('should have correct Mark interface shape', () => {
    const mark: Mark = {
      id: 'mark-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      studentId: 'student-1',
      subjectId: 'subject-1',
      classId: 'class-1',
      marksObtained: 15,
      maxMarks: 20,
      percentage: 75,
      isAbsent: false,
      isExcused: false,
      status: 'DRAFT',
      enteredBy: 'teacher-1',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(mark.marksObtained).toBe(15);
    expect(mark.percentage).toBe(75);
    expect(mark.status).toBe('DRAFT');
  });

  it('should support MarkEntryStatus values', () => {
    const statuses: Mark['status'][] = ['DRAFT', 'SUBMITTED', 'VALIDATED', 'PUBLISHED'];
    expect(statuses).toHaveLength(4);
  });

  it('should have correct MarkEntry interface shape', () => {
    const entry: MarkEntry = {
      id: 'entry-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      studentId: 'student-1',
      marksObtained: 14,
      maxMarks: 20,
      enteredBy: 'teacher-1',
      status: 'DRAFT',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(entry.marksObtained).toBe(14);
    expect(entry.status).toBe('DRAFT');
  });

  it('should have correct MarkHistory interface shape', () => {
    const history: MarkHistory = {
      id: 'history-1',
      schoolId: 'school-1',
      markId: 'mark-1',
      previousMarks: 12,
      newMarks: 15,
      reason: 'Correction after review',
      changedBy: 'teacher-1',
      changedAt: '2026-01-01T00:00:00Z',
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(history.previousMarks).toBe(12);
    expect(history.newMarks).toBe(15);
  });

  it('should have correct SubjectAverage interface shape', () => {
    const avg: SubjectAverage = {
      id: 'sa-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      subjectId: 'subject-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      average: 14.5,
      totalMarks: 87,
      maxMarks: 120,
      examCount: 6,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(avg.average).toBe(14.5);
    expect(avg.examCount).toBe(6);
  });

  it('should have correct TermAverage interface shape', () => {
    const avg: TermAverage = {
      id: 'ta-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      termId: 'term-1',
      average: 13.2,
      totalMarks: 65,
      maxMarks: 100,
      status: 'CALCULATED',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(avg.termId).toBe('term-1');
    expect(avg.status).toBe('CALCULATED');
  });

  it('should have correct SemesterAverage interface shape', () => {
    const avg: SemesterAverage = {
      id: 'sem-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      semester: 1,
      average: 14.0,
      totalMarks: 140,
      maxMarks: 200,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(avg.semester).toBe(1);
    expect(avg.average).toBe(14.0);
  });

  it('should have correct AnnualAverage interface shape', () => {
    const avg: AnnualAverage = {
      id: 'ann-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      average: 13.8,
      totalMarks: 280,
      maxMarks: 400,
      status: 'CALCULATED',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(avg.average).toBe(13.8);
    expect(avg.status).toBe('CALCULATED');
  });

  it('should have correct StudentRanking interface shape', () => {
    const rank: StudentRanking = {
      id: 'rank-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      studentName: 'Jean Dupont',
      classId: 'class-1',
      className: '6ème A',
      academicYearId: 'year-1',
      rank: 3,
      totalStudents: 30,
      average: 14.5,
      percentage: 72.5,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(rank.rank).toBe(3);
    expect(rank.totalStudents).toBe(30);
  });

  it('should have correct ClassRanking interface shape', () => {
    const classRank: ClassRanking = {
      id: 'cr-1',
      schoolId: 'school-1',
      classId: 'class-1',
      className: '6ème A',
      academicYearId: 'year-1',
      rankings: [],
      averageRate: 12.5,
      topAverage: 18.0,
      bottomAverage: 5.0,
      medianAverage: 13.0,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(classRank.averageRate).toBe(12.5);
    expect(classRank.rankings).toHaveLength(0);
  });

  it('should have correct SchoolRanking interface shape', () => {
    const schoolRank: SchoolRanking = {
      id: 'sr-1',
      schoolId: 'school-1',
      academicYearId: 'year-1',
      classRankings: [],
      overallAverage: 12.8,
      totalStudents: 200,
      overallPassRate: 75,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(schoolRank.overallAverage).toBe(12.8);
    expect(schoolRank.totalStudents).toBe(200);
  });

  it('should have correct Decision interface shape', () => {
    const decision: Decision = {
      id: 'dec-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      decisionType: 'PASSAGE',
      status: 'PENDING',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(decision.decisionType).toBe('PASSAGE');
    expect(decision.status).toBe('PENDING');
  });

  it('should support all DecisionType values', () => {
    const types: Decision['decisionType'][] = ['PASSAGE', 'REPETITION', 'ORIENTATION', 'EXCLUSION', 'HONOR', 'ENCOURAGEMENT', 'CONDITIONAL_PASSAGE', 'BOARD_DECISION'];
    expect(types).toHaveLength(8);
  });

  it('should have correct Transcript interface shape', () => {
    const transcript: Transcript = {
      id: 'trans-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      academicYearId: 'year-1',
      status: 'GENERATED',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(transcript.status).toBe('GENERATED');
  });

  it('should support TranscriptStatus values', () => {
    const statuses: Transcript['status'][] = ['PENDING', 'GENERATED', 'DELIVERED', 'ARCHIVED'];
    expect(statuses).toHaveLength(4);
  });

  it('should have correct ReportCard interface shape', () => {
    const reportCard: ReportCard = {
      id: 'rc-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      studentName: 'Jean Dupont',
      className: '6ème A',
      academicYearId: 'year-1',
      termId: 'term-1',
      termName: 'Trimestre 1',
      average: 14.5,
      rank: 5,
      totalStudents: 30,
      status: 'GENERATED',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(reportCard.average).toBe(14.5);
    expect(reportCard.rank).toBe(5);
    expect(reportCard.status).toBe('GENERATED');
  });

  it('should have correct Competency interface shape', () => {
    const competency: Competency = {
      id: 'comp-1',
      schoolId: 'school-1',
      name: 'Reading Comprehension',
      description: 'Ability to understand written texts',
      domain: 'Language',
      level: 'PROFICIENT',
      order: 1,
      isActive: true,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(competency.name).toBe('Reading Comprehension');
    expect(competency.level).toBe('PROFICIENT');
  });

  it('should support CompetencyLevel values', () => {
    const levels: Competency['level'][] = ['BEGINNER', 'DEVELOPING', 'PROFICIENT', 'ADVANCED', 'EXCELLENT'];
    expect(levels).toHaveLength(5);
  });

  it('should have correct CompetencyResult interface shape', () => {
    const result: CompetencyResult = {
      id: 'cr-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      competencyId: 'comp-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      level: 'ADVANCED',
      score: 85,
      assessedBy: 'teacher-1',
      assessedAt: '2026-01-01T00:00:00Z',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(result.score).toBe(85);
    expect(result.level).toBe('ADVANCED');
  });

  it('should have correct Correction interface shape', () => {
    const correction: Correction = {
      id: 'corr-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      studentId: 'student-1',
      previousMarks: 12,
      newMarks: 15,
      reason: 'Calculation error',
      status: 'PENDING',
      requestedBy: 'teacher-1',
      requestedAt: '2026-01-01T00:00:00Z',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(correction.previousMarks).toBe(12);
    expect(correction.newMarks).toBe(15);
    expect(correction.status).toBe('PENDING');
  });

  it('should support CorrectionStatus values', () => {
    const statuses: Correction['status'][] = ['PENDING', 'APPROVED', 'REJECTED'];
    expect(statuses).toHaveLength(3);
  });

  it('should have correct ExamStatistics interface shape', () => {
    const stats: ExamStatistics = {
      id: 'stats-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      totalStudents: 30,
      presentStudents: 28,
      absentStudents: 2,
      average: 13.5,
      median: 14.0,
      standardDeviation: 3.2,
      highestMark: 19.5,
      lowestMark: 4.0,
      passRate: 78,
      failRate: 22,
      gradeDistribution: [{ grade: 'A', count: 5, percentage: 18 }],
      markDistribution: [{ range: '10-14', count: 12, percentage: 43 }],
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(stats.totalStudents).toBe(30);
    expect(stats.average).toBe(13.5);
    expect(stats.passRate).toBe(78);
  });

  it('should have correct ExamDashboard interface shape', () => {
    const dashboard: ExamDashboard = {
      schoolId: 'school-1',
      totalExams: 25,
      publishedExams: 15,
      pendingExams: 5,
      lockedExams: 5,
      totalMarks: 500,
      pendingMarks: 50,
      averagePassRate: 75,
      upcomingExams: [],
      recentResults: [],
      alerts: [],
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(dashboard.totalExams).toBe(25);
    expect(dashboard.publishedExams).toBe(15);
  });

  it('should have correct ExamTimeline interface shape', () => {
    const timeline: ExamTimeline = {
      schoolId: 'school-1',
      events: [],
      totalEvents: 0,
      page: 1,
      limit: 20,
    };
    expect(timeline.totalEvents).toBe(0);
    expect(timeline.page).toBe(1);
  });

  it('should have correct ExamAudit interface shape', () => {
    const audit: ExamAudit = {
      id: 'audit-1',
      schoolId: 'school-1',
      userId: 'user-1',
      action: 'EXAM_CREATE',
      entityType: 'exam',
      entityId: 'exam-1',
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(audit.action).toBe('EXAM_CREATE');
    expect(audit.entityType).toBe('exam');
  });

  it('should have correct MarkValidation interface shape', () => {
    const validation: MarkValidation = {
      id: 'mv-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      classId: 'class-1',
      subjectId: 'subject-1',
      totalStudents: 30,
      validatedCount: 25,
      pendingCount: 5,
      status: 'PARTIAL',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(validation.totalStudents).toBe(30);
    expect(validation.status).toBe('PARTIAL');
  });

  it('should have correct SubjectCoefficient interface shape', () => {
    const coeff: SubjectCoefficient = {
      id: 'sc-1',
      schoolId: 'school-1',
      subjectId: 'subject-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      coefficient: 2.5,
      isActive: true,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(coeff.coefficient).toBe(2.5);
    expect(coeff.isActive).toBe(true);
  });

  it('should have correct Merit interface shape', () => {
    const merit: Merit = {
      id: 'merit-1',
      schoolId: 'school-1',
      studentId: 'student-1',
      classId: 'class-1',
      academicYearId: 'year-1',
      meritType: 'HONOR_ROLL',
      average: 17.5,
      rank: 1,
      description: 'First in class',
      issuedAt: '2026-06-30T00:00:00Z',
      issuedBy: 'admin-1',
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(merit.meritType).toBe('HONOR_ROLL');
    expect(merit.average).toBe(17.5);
  });

  it('should have correct ImportMarks interface shape', () => {
    const importMarks: ImportMarks = {
      id: 'imp-1',
      schoolId: 'school-1',
      examId: 'exam-1',
      fileName: 'marks.csv',
      importType: 'CSV',
      status: 'COMPLETED',
      totalRows: 30,
      processedRows: 30,
      successRows: 28,
      errorRows: 2,
      errors: [],
      importedBy: 'teacher-1',
      importedAt: '2026-01-01T00:00:00Z',
    };
    expect(importMarks.importType).toBe('CSV');
    expect(importMarks.successRows).toBe(28);
  });

  it('should have correct ExportMarks interface shape', () => {
    const exportMarks: ExportMarks = {
      id: 'exp-1',
      schoolId: 'school-1',
      format: 'PDF',
      exportType: 'MARKS',
      filters: {},
      filename: 'marks-export.pdf',
      generatedBy: 'admin-1',
      generatedAt: '2026-01-01T00:00:00Z',
    };
    expect(exportMarks.format).toBe('PDF');
    expect(exportMarks.exportType).toBe('MARKS');
  });

  it('should have correct ExamSearch interface shape', () => {
    const search: ExamSearch = {
      query: 'math',
      types: ['FINAL'],
      status: 'PUBLISHED',
      limit: 10,
    };
    expect(search.query).toBe('math');
    expect(search.limit).toBe(10);
  });

  it('should have correct ExamFilters interface shape', () => {
    const filters: ExamFilters = {
      examType: 'FINAL',
      classId: 'class-1',
      status: 'PUBLISHED',
      page: 1,
      limit: 20,
      sortBy: 'date',
      sortOrder: 'desc',
    };
    expect(filters.page).toBe(1);
    expect(filters.sortOrder).toBe('desc');
  });

  it('should have correct ExamNotification interface shape', () => {
    const notif: ExamNotification = {
      id: 'notif-1',
      schoolId: 'school-1',
      notificationType: 'EXAM_PUBLISHED',
      recipientType: 'STUDENT',
      recipientId: 'student-1',
      channel: 'IN_APP',
      title: 'Exam Published',
      message: 'Your exam has been published',
      sent: true,
      read: false,
      createdAt: '2026-01-01T00:00:00Z',
    };
    expect(notif.notificationType).toBe('EXAM_PUBLISHED');
    expect(notif.sent).toBe(true);
  });

  it('should have correct ExamSettings interface shape', () => {
    const settings: ExamSettings = {
      id: 'settings-1',
      schoolId: 'school-1',
      defaultTotalMarks: 20,
      defaultPassingMarks: 10,
      defaultCoefficient: 1,
      roundingMethod: 'HALF_UP',
      decimalPlaces: 2,
      allowNegativeMarks: false,
      autoCalculateAverages: true,
      autoGenerateRankings: true,
      autoGenerateDecisions: true,
      passThreshold: 10,
      honorThreshold: 16,
      excellenceThreshold: 18,
      enableCompetencies: false,
      enableTranscripts: true,
      enableReportCards: true,
      enableQRVerification: false,
      enableElectronicSignature: false,
      enableParentNotifications: true,
      enableStudentNotifications: true,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    };
    expect(settings.defaultTotalMarks).toBe(20);
    expect(settings.roundingMethod).toBe('HALF_UP');
  });
});
