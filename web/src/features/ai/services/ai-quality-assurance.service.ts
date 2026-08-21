import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiQualityAssurance, AiQualityAssuranceQuery, AiQualityAssuranceCreate, AiQualityAssuranceUpdate } from '@educi/types';
import { AiQualityAssuranceNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiQualityAssuranceService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getQualityCheck(schoolId: string, id: string): Promise<AiQualityAssurance> {
    const check = await this.repo.findById(schoolId, id);
    if (!check) throw new AiQualityAssuranceNotFoundError(id);
    return check;
  }

  async listQualityChecks(schoolId: string, query: AiQualityAssuranceQuery): Promise<AiQualityAssurance[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createQualityCheck(schoolId: string, data: AiQualityAssuranceCreate): Promise<AiQualityAssurance> {
    return this.repo.create(schoolId, data);
  }

  async updateQualityCheck(schoolId: string, id: string, data: AiQualityAssuranceUpdate): Promise<AiQualityAssurance> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiQualityAssuranceNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteQualityCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiQualityAssuranceNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getQualityReport(schoolId: string, id: string): Promise<AiQualityReport> {
    const check = await this.repo.findById(schoolId, id);
    if (!check) throw new AiQualityAssuranceNotFoundError(id);
    return this.repo.findReportById(schoolId, id);
  }
}
