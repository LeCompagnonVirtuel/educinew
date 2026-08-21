import type { SupabaseClient } from '@supabase/supabase-js';
import type { PeerAssessment, PeerAssessmentCreate } from '@educi/types';
import { AssessmentPeerAssessmentError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentPeerAssessmentService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getPeerAssessment(schoolId: string, id: string): Promise<PeerAssessment> {
    const item = await this.repo.getPeerAssessment(id, schoolId);
    if (!item) throw new AssessmentPeerAssessmentError(id);
    return item;
  }
  async listPeerAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<PeerAssessment[]> {
    return this.repo.listPeerAssessments(schoolId, filters);
  }
  async createPeerAssessment(schoolId: string, data: PeerAssessmentCreate): Promise<PeerAssessment> {
    return this.repo.createPeerAssessment({ ...data, school_id: schoolId } as any);
  }
  async updatePeerAssessment(schoolId: string, id: string, data: Partial<PeerAssessmentCreate>): Promise<PeerAssessment> {
    const existing = await this.repo.getPeerAssessment(id, schoolId);
    if (!existing) throw new AssessmentPeerAssessmentError(id);
    return this.repo.updatePeerAssessment(id, schoolId, data as any);
  }
  async deletePeerAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPeerAssessment(id, schoolId);
    if (!existing) throw new AssessmentPeerAssessmentError(id);
    return this.repo.deletePeerAssessment(id, schoolId);
  }
}
