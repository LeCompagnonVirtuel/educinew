import { MobileExamRepository } from '../repositories/exam.repository';
import { logger } from '@educi/logger';

export class MobileExamService {
  private readonly repository: MobileExamRepository;
  private readonly schoolId: string;

  constructor({ repository, schoolId }: { repository: MobileExamRepository; schoolId: string }) {
    this.repository = repository;
    this.schoolId = schoolId;
  }

  async findExam(id: string) {
    return this.repository.findExam(id);
  }

  async findAllExams(filters: Record<string, unknown>) {
    return this.repository.findAllExams({ ...filters, schoolId: this.schoolId });
  }

  async createExam(examData: Record<string, unknown>) {
    logger.info('Creating exam', { schoolId: this.schoolId });
    return this.repository.createExam({ ...examData, school_id: this.schoolId });
  }

  async updateExam(id: string, examData: Record<string, unknown>) {
    logger.info('Updating exam', { examId: id });
    return this.repository.updateExam(id, examData);
  }

  async deleteExam(id: string) {
    logger.info('Deleting exam', { examId: id });
    return this.repository.deleteExam(id);
  }

  async findMarks(examId: string) {
    return this.repository.findMarks(examId);
  }

  async enterMark(markData: Record<string, unknown>) {
    logger.info('Entering mark', { examId: markData.examId, studentId: markData.studentId });
    return this.repository.enterMark({ ...markData, school_id: this.schoolId });
  }

  async bulkEnterMarks(marks: Record<string, unknown>[]) {
    logger.info('Bulk entering marks', { count: marks.length });
    const enriched = marks.map((m) => ({ ...m, school_id: this.schoolId }));
    return this.repository.bulkEnterMarks(enriched);
  }

  async updateMark(id: string, markData: Record<string, unknown>) {
    logger.info('Updating mark', { markId: id });
    return this.repository.updateMark(id, markData);
  }

  async validateMarks(examId: string, validatedBy: string) {
    logger.info('Validating marks', { examId, validatedBy });
    return this.repository.validateMarks(examId, validatedBy);
  }

  async calculateAverage(studentId: string, classId: string, academicYearId: string, termId?: string) {
    return this.repository.calculateAverage(studentId, classId, academicYearId, termId);
  }

  async findRanking(classId: string, academicYearId: string, termId?: string) {
    return this.repository.findRanking(classId, academicYearId, termId);
  }

  async findDecisions(classId: string, academicYearId: string) {
    return this.repository.findDecisions(classId, academicYearId);
  }

  async createDecision(decisionData: Record<string, unknown>) {
    logger.info('Creating decision', { studentId: decisionData.studentId });
    return this.repository.createDecision({ ...decisionData, school_id: this.schoolId });
  }

  async findCompetencies(classId?: string) {
    return this.repository.findCompetencies(classId);
  }

  async findReportCards(classId: string, termId: string) {
    return this.repository.findReportCards(classId, termId);
  }

  async findTranscript(studentId: string) {
    return this.repository.findTranscripts(studentId);
  }

  async getExamStatistics(examId: string) {
    return this.repository.getExamStatistics(examId);
  }

  async getExamDashboard() {
    return this.repository.getExamDashboard(this.schoolId);
  }

  async searchExams(query: string) {
    return this.repository.searchExams(this.schoolId, query);
  }

  async getTimeline(examId?: string, studentId?: string) {
    return this.repository.getTimeline(this.schoolId, examId, studentId);
  }

  async findCorrections(examId: string) {
    return this.repository.findCorrections(examId);
  }

  async approveCorrection(id: string, reviewedBy: string, reviewNote?: string) {
    logger.info('Approving correction', { correctionId: id });
    return this.repository.approveCorrection(id, reviewedBy, reviewNote);
  }

  async findNotifications(recipientId: string) {
    return this.repository.findNotifications(recipientId);
  }

  async markNotificationRead(id: string) {
    return this.repository.markNotificationRead(id);
  }

  async getAuditLog() {
    return this.repository.getAuditLog(this.schoolId);
  }

  async exportMarks(examId: string, format: string) {
    return this.repository.exportMarks(examId, format);
  }
}
