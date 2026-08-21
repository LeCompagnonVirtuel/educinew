import type { SupabaseClient } from '@supabase/supabase-js';
import type { Assignment, AssignmentCreate, AssignmentUpdate, AssignmentQuery, AssignmentListResult, AssignmentAnalytics } from '@educi/types';
import { LxpAssignmentNotFoundError, LxpAssignmentCreateError, LxpAssignmentUpdateError, LxpAssignmentDeleteError, LxpAssignmentPublishError, LxpAssignmentSubmitError, LxpAssignmentGradeError, LxpAssignmentFeedbackError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpAssignmentService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getAssignment(schoolId: string, id: string): Promise<Assignment> {
    const assignment = await this.repo.findAssignmentById(schoolId, id);
    if (!assignment) throw new LxpAssignmentNotFoundError(id);
    return assignment;
  }

  async listAssignments(courseId: string, query: AssignmentQuery): Promise<AssignmentListResult> {
    return this.repo.findAssignments(courseId, query);
  }

  async createAssignment(data: AssignmentCreate): Promise<Assignment> {
    const created = await this.repo.createAssignment(data);
    if (!created) throw new LxpAssignmentCreateError();
    return created;
  }

  async updateAssignment(schoolId: string, id: string, data: AssignmentUpdate): Promise<Assignment> {
    const existing = await this.repo.findAssignmentById(schoolId, id);
    if (!existing) throw new LxpAssignmentNotFoundError(id);
    const updated = await this.repo.updateAssignment(id, data);
    if (!updated) throw new LxpAssignmentUpdateError();
    return updated;
  }

  async deleteAssignment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAssignmentById(schoolId, id);
    if (!existing) throw new LxpAssignmentNotFoundError(id);
    const deleted = await this.repo.deleteAssignment(id);
    if (!deleted) throw new LxpAssignmentDeleteError();
  }

  async publishAssignment(schoolId: string, id: string): Promise<Assignment> {
    const existing = await this.repo.findAssignmentById(schoolId, id);
    if (!existing) throw new LxpAssignmentNotFoundError(id);
    const published = await this.repo.publishAssignment(id);
    if (!published) throw new LxpAssignmentPublishError();
    return published;
  }

  async gradeAssignment(assignmentId: string, userId: string, score: number): Promise<boolean> {
    const result = await this.repo.gradeAssignment(assignmentId, userId, score);
    if (!result) throw new LxpAssignmentGradeError();
    return result;
  }

  async getAssignmentAnalytics(schoolId: string, id: string): Promise<AssignmentAnalytics> {
    const existing = await this.repo.findAssignmentById(schoolId, id);
    if (!existing) throw new LxpAssignmentNotFoundError(id);
    const analytics = await this.repo.getAssignmentAnalytics(id);
    if (!analytics) throw new LxpAssignmentFeedbackError();
    return analytics;
  }
}
