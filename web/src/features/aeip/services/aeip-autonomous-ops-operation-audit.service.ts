import type { SupabaseClient } from '@supabase/supabase-js';
import type { OperationAudit } from '@educi/types';
import { AEIPAutonomousOpsAuditError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousOpsAuditService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAudit(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAudits(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAudit(schoolId: string, data: Partial<OperationAudit>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAudit(schoolId: string, id: string, data: Partial<OperationAudit>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAudit(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}