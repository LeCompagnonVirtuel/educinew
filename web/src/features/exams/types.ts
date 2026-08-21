import type { Exam, ExamSession, ExamResult, ExamResultItem, Grade, GradeRule, Mark, MarkEntry, MarkHistory, MarkValidation, SubjectCoefficient, SubjectAverage, TermAverage, SemesterAverage, AnnualAverage, StudentRanking, ClassRanking, SchoolRanking, Decision, Merit, Transcript, ReportCard, Competency, CompetencyResult, Correction, ExamStatistics, ExamDashboard, ExamTimeline, ExamAudit, ImportMarks, ExportMarks, ExamSearch, ExamFilters, ExamNotification, ExamSettings, ExamRepository } from '@educi/types';

export interface ExamRepositoryExtended extends ExamRepository {
  findStudent(studentId: string): Promise<any | null>;
  findClass(classId: string): Promise<any | null>;
  findSubject(subjectId: string): Promise<any | null>;
  findAcademicYear(yearId: string): Promise<any | null>;
  findTerm(termId: string): Promise<any | null>;
  findUser(userId: string): Promise<any | null>;
  findStudentsByClass(classId: string): Promise<any[]>;
  findSubjectsByClass(classId: string): Promise<any[]>;
  getSchoolSettings(schoolId: string): Promise<any>;
  logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
}

export type {
  Exam, ExamSession, ExamResult, ExamResultItem, Grade, GradeRule, Mark, MarkEntry, MarkHistory, MarkValidation,
  SubjectCoefficient, SubjectAverage, TermAverage, SemesterAverage, AnnualAverage,
  StudentRanking, ClassRanking, SchoolRanking, Decision, Merit, Transcript, ReportCard,
  Competency, CompetencyResult, Correction, ExamStatistics, ExamDashboard, ExamTimeline, ExamAudit,
  ImportMarks, ExportMarks, ExamSearch, ExamFilters, ExamNotification, ExamSettings
};
