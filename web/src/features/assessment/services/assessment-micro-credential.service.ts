import type { SupabaseClient } from '@supabase/supabase-js';
import type { MicroCredential, MicroCredentialCreate } from '@educi/types';
import { AssessmentMicroCredentialError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentMicroCredentialService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getMicroCredential(schoolId: string, id: string): Promise<MicroCredential> {
    const item = await this.repo.getMicroCredential(id, schoolId);
    if (!item) throw new AssessmentMicroCredentialError(id);
    return item;
  }
  async listMicroCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<MicroCredential[]> {
    return this.repo.listMicroCredentials(schoolId, filters);
  }
  async createMicroCredential(schoolId: string, data: MicroCredentialCreate): Promise<MicroCredential> {
    return this.repo.createMicroCredential({ ...data, school_id: schoolId } as any);
  }
  async updateMicroCredential(schoolId: string, id: string, data: Partial<MicroCredentialCreate>): Promise<MicroCredential> {
    const existing = await this.repo.getMicroCredential(id, schoolId);
    if (!existing) throw new AssessmentMicroCredentialError(id);
    return this.repo.updateMicroCredential(id, schoolId, data as any);
  }
  async deleteMicroCredential(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMicroCredential(id, schoolId);
    if (!existing) throw new AssessmentMicroCredentialError(id);
    return this.repo.deleteMicroCredential(id, schoolId);
  }
}
