import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAutomation, AiAutomationQuery, AiAutomationCreate, AiAutomationUpdate } from '@educi/types';
import { AiAutomationNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAutomationService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAutomation(schoolId: string, id: string): Promise<AiAutomation> {
    const automation = await this.repo.findById(schoolId, id);
    if (!automation) throw new AiAutomationNotFoundError(id);
    return automation;
  }

  async listAutomations(schoolId: string, query: AiAutomationQuery): Promise<AiAutomation[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAutomation(schoolId: string, data: AiAutomationCreate): Promise<AiAutomation> {
    return this.repo.create(schoolId, data);
  }

  async updateAutomation(schoolId: string, id: string, data: AiAutomationUpdate): Promise<AiAutomation> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAutomationNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAutomation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAutomationNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async toggleAutomation(schoolId: string, id: string, enabled: boolean): Promise<AiAutomation> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAutomationNotFoundError(id);
    return this.repo.update(schoolId, id, { enabled, updatedAt: new Date().toISOString() });
  }
}
