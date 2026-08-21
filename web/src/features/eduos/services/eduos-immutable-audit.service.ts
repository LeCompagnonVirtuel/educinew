import type { SupabaseClient } from '@supabase/supabase-js';
import type { ImmutableAudit } from '@educi/types';
import { EduOSImmutableAuditError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSImmutableAuditService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getImmutableAudit(schoolId: string, id: string): Promise<ImmutableAudit> {
    const item = await this.repo.getImmutableAudit(schoolId, id);
    if (!item) throw new EduOSImmutableAuditError(id);
    return item;
  }
  async listImmutableAudits(schoolId: string, filters?: Record<string, unknown>): Promise<ImmutableAudit[]> {
    return this.repo.listImmutableAudits(schoolId, filters);
  }
  async createImmutableAudit(schoolId: string, data: Partial<ImmutableAudit>): Promise<ImmutableAudit> {
    return this.repo.createImmutableAudit(schoolId, data as any);
  }
  async updateImmutableAudit(schoolId: string, id: string, data: Partial<ImmutableAudit>): Promise<ImmutableAudit> {
    const existing = await this.repo.getImmutableAudit(schoolId, id);
    if (!existing) throw new EduOSImmutableAuditError(id);
    return this.repo.updateImmutableAudit(schoolId, id, data as any);
  }
  async deleteImmutableAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getImmutableAudit(schoolId, id);
    if (!existing) throw new EduOSImmutableAuditError(id);
    return this.repo.deleteImmutableAudit(schoolId, id);
  }
}

