import type { SupabaseClient } from '@supabase/supabase-js';
import type { DecisionAudit } from '@educi/types';
import { AEIPDecisionAuditError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDecisionAuditService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAudit(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAudits(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAudit(schoolId: string, data: Partial<DecisionAudit>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAudit(schoolId: string, id: string, data: Partial<DecisionAudit>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAudit(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}