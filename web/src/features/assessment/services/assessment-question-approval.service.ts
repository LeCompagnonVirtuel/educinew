import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionApprovalWorkflow, QuestionApprovalWorkflowCreate } from '@educi/types';
import { AssessmentQuestionApprovalError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentQuestionApprovalService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getQuestionApproval(schoolId: string, id: string): Promise<QuestionApprovalWorkflow> {
    const item = await this.repo.getQuestionApproval(id, schoolId);
    if (!item) throw new AssessmentQuestionApprovalError(id);
    return item;
  }
  async listQuestionApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<QuestionApprovalWorkflow[]> {
    return this.repo.listQuestionApprovals(schoolId, filters);
  }
  async createQuestionApproval(schoolId: string, data: QuestionApprovalWorkflowCreate): Promise<QuestionApprovalWorkflow> {
    return this.repo.createQuestionApproval({ ...data, school_id: schoolId } as any);
  }
  async updateQuestionApproval(schoolId: string, id: string, data: Partial<QuestionApprovalWorkflowCreate>): Promise<QuestionApprovalWorkflow> {
    const existing = await this.repo.getQuestionApproval(id, schoolId);
    if (!existing) throw new AssessmentQuestionApprovalError(id);
    return this.repo.updateQuestionApproval(id, schoolId, data as any);
  }
  async deleteQuestionApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQuestionApproval(id, schoolId);
    if (!existing) throw new AssessmentQuestionApprovalError(id);
    return this.repo.deleteQuestionApproval(id, schoolId);
  }
}
