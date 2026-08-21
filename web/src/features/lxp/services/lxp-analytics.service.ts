import type { SupabaseClient } from '@supabase/supabase-js';
import type { CourseAnalytics, LearningPathAnalytics, QuizAnalytics, AssignmentAnalytics, ProgressReport, EngagementReport } from '@educi/types';
import { LxpCourseAnalyticsError, LxpReportNotFoundError, LxpReportGenerateError, LxpAnalyticsExportError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpAnalyticsService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getCourseAnalytics(schoolId: string, courseId: string): Promise<CourseAnalytics> {
    const course = await this.repo.findCourseById(schoolId, courseId);
    if (!course) throw new LxpCourseAnalyticsError();
    const analytics = await this.repo.getCourseAnalytics(courseId);
    if (!analytics) throw new LxpCourseAnalyticsError();
    return analytics;
  }

  async getLearningPathAnalytics(schoolId: string, learningPathId: string): Promise<LearningPathAnalytics> {
    const path = await this.repo.findLearningPathById(schoolId, learningPathId);
    if (!path) throw new LxpCourseAnalyticsError();
    const analytics = await this.repo.getLearningPathAnalytics(learningPathId);
    if (!analytics) throw new LxpCourseAnalyticsError();
    return analytics;
  }

  async getQuizAnalytics(schoolId: string, quizId: string): Promise<QuizAnalytics> {
    const quiz = await this.repo.findQuizById(schoolId, quizId);
    if (!quiz) throw new LxpCourseAnalyticsError();
    const analytics = await this.repo.getQuizAnalytics(quizId);
    if (!analytics) throw new LxpCourseAnalyticsError();
    return analytics;
  }

  async getAssignmentAnalytics(schoolId: string, assignmentId: string): Promise<AssignmentAnalytics> {
    const assignment = await this.repo.findAssignmentById(schoolId, assignmentId);
    if (!assignment) throw new LxpCourseAnalyticsError();
    const analytics = await this.repo.getAssignmentAnalytics(assignmentId);
    if (!analytics) throw new LxpCourseAnalyticsError();
    return analytics;
  }

  async getProgressReport(schoolId: string, userId: string): Promise<ProgressReport> {
    const report = await this.repo.getProgressReport(schoolId, userId);
    if (!report) throw new LxpReportNotFoundError();
    return report;
  }

  async getEngagementReport(schoolId: string, startDate: string, endDate: string): Promise<EngagementReport> {
    const report = await this.repo.getEngagementReport(schoolId, startDate, endDate);
    if (!report) throw new LxpReportGenerateError();
    return report;
  }

  async generateReport(schoolId: string, type: string, params: Record<string, unknown>): Promise<Record<string, unknown>> {
    const report = await this.repo.generateReport(schoolId, type, params);
    if (!report) throw new LxpReportGenerateError();
    return report;
  }

  async exportAnalytics(schoolId: string, type: string, format: string): Promise<string> {
    const url = await this.repo.exportAnalytics(schoolId, type, format);
    if (!url) throw new LxpAnalyticsExportError();
    return url;
  }
}
