import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExchangeProgram, ExchangeProgramCreate } from '@educi/types';
import { GovExchangeProgramNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataExchangeProgramService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExchangeProgram> {
    const item = await this.repo.findExchangeProgramById(schoolId, id);
    if (!item) throw new GovExchangeProgramNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExchangeProgram[]> {
    return this.repo.findAllExchangePrograms(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExchangeProgramCreate>): Promise<ExchangeProgram> {
    return this.repo.createExchangeProgram(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExchangeProgramCreate>): Promise<ExchangeProgram> {
    const existing = await this.repo.findExchangeProgramById(schoolId, id);
    if (!existing) throw new GovExchangeProgramNotFoundError(id);
    return this.repo.updateExchangeProgram(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExchangeProgramById(schoolId, id);
    if (!existing) throw new GovExchangeProgramNotFoundError(id);
    return this.repo.deleteExchangeProgram(schoolId, id);
  }
}
