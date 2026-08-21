import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiCompliance, AiComplianceQuery, AiComplianceCreate, AiComplianceUpdate } from '@educi/types';
import { AiComplianceNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiComplianceService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getCompliance(schoolId: string, id: string): Promise<AiCompliance> {
    const compliance = await this.repo.findById(schoolId, id);
    if (!compliance) throw new AiComplianceNotFoundError(id);
    return compliance;
  }

  async listCompliance(schoolId: string, query: AiComplianceQuery): Promise<AiCompliance[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createCompliance(schoolId: string, data: AiComplianceCreate): Promise<AiCompliance> {
    return this.repo.create(schoolId, data);
  }

  async updateCompliance(schoolId: string, id: string, data: AiComplianceUpdate): Promise<AiCompliance> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiComplianceNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteCompliance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiComplianceNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
