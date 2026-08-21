import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiSafety, AiSafetyQuery, AiSafetyCreate, AiSafetyUpdate } from '@educi/types';
import { AiSafetyNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiSafetyService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getSafetyCheck(schoolId: string, id: string): Promise<AiSafety> {
    const check = await this.repo.findById(schoolId, id);
    if (!check) throw new AiSafetyNotFoundError(id);
    return check;
  }

  async listSafetyChecks(schoolId: string, query: AiSafetyQuery): Promise<AiSafety[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createSafetyCheck(schoolId: string, data: AiSafetyCreate): Promise<AiSafety> {
    return this.repo.create(schoolId, data);
  }

  async updateSafetyCheck(schoolId: string, id: string, data: AiSafetyUpdate): Promise<AiSafety> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSafetyNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteSafetyCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSafetyNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async runSafetyCheck(schoolId: string, content: string): Promise<AiSafetyResult> {
    return this.repo.runSafetyCheck(schoolId, content);
  }

  async getSafetyReport(schoolId: string, id: string): Promise<AiSafetyReport> {
    const check = await this.repo.findById(schoolId, id);
    if (!check) throw new AiSafetyNotFoundError(id);
    return this.repo.findReportById(schoolId, id);
  }

  async getSafetyMetrics(schoolId: string): Promise<AiSafetyMetrics> {
    return this.repo.findSafetyMetrics(schoolId);
  }
}
