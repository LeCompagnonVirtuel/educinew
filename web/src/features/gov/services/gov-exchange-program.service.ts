// Government & National Governance Service - ExchangeProgram
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExchangeProgram, ExchangeProgramCreate } from '@educi/types';
import { GovExchangeProgramNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExchangeProgramService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExchangeProgram(schoolId: string, id: string): Promise<ExchangeProgram> {
    const item = await this.repo.findExchangeProgramById(schoolId, id);
    if (!item) throw new GovExchangeProgramNotFoundError(id);
    return item;
  }

  async listExchangePrograms(schoolId: string, filters?: Record<string, unknown>): Promise<ExchangeProgram[]> {
    return this.repo.findAllExchangePrograms(schoolId, filters);
  }

  async createExchangeProgram(schoolId: string, data: ExchangeProgramCreate): Promise<ExchangeProgram> {
    return this.repo.createExchangeProgram(schoolId, data);
  }

  async updateExchangeProgram(schoolId: string, id: string, data: Partial<ExchangeProgramCreate>): Promise<ExchangeProgram> {
    const existing = await this.repo.findExchangeProgramById(schoolId, id);
    if (!existing) throw new GovExchangeProgramNotFoundError(id);
    return this.repo.updateExchangeProgram(schoolId, id, data);
  }

  async deleteExchangeProgram(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExchangeProgramById(schoolId, id);
    if (!existing) throw new GovExchangeProgramNotFoundError(id);
    return this.repo.deleteExchangeProgram(schoolId, id);
  }

  async countExchangePrograms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExchangePrograms(schoolId, filters);
  }
}
