import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAudit, AiAuditQuery, AiAuditCreate, AiAuditUpdate } from '@educi/types';
import { AiAuditNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAuditService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAudit(schoolId: string, id: string): Promise<AiAudit> {
    const audit = await this.repo.findById(schoolId, id);
    if (!audit) throw new AiAuditNotFoundError(id);
    return audit;
  }

  async listAudits(schoolId: string, query: AiAuditQuery): Promise<AiAudit[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAudit(schoolId: string, data: AiAuditCreate): Promise<AiAudit> {
    return this.repo.create(schoolId, data);
  }

  async updateAudit(schoolId: string, id: string, data: AiAuditUpdate): Promise<AiAudit> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAuditNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAuditNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
