// Government & National Governance Service - HashService
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { HashService, HashServiceCreate } from '@educi/types';
import { GovHashServiceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovHashServiceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getHashService(schoolId: string, id: string): Promise<HashService> {
    const item = await this.repo.findHashServiceById(schoolId, id);
    if (!item) throw new GovHashServiceNotFoundError(id);
    return item;
  }

  async listHashServices(schoolId: string, filters?: Record<string, unknown>): Promise<HashService[]> {
    return this.repo.findAllHashServices(schoolId, filters);
  }

  async createHashService(schoolId: string, data: HashServiceCreate): Promise<HashService> {
    return this.repo.createHashService(schoolId, data);
  }

  async updateHashService(schoolId: string, id: string, data: Partial<HashServiceCreate>): Promise<HashService> {
    const existing = await this.repo.findHashServiceById(schoolId, id);
    if (!existing) throw new GovHashServiceNotFoundError(id);
    return this.repo.updateHashService(schoolId, id, data);
  }

  async deleteHashService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHashServiceById(schoolId, id);
    if (!existing) throw new GovHashServiceNotFoundError(id);
    return this.repo.deleteHashService(schoolId, id);
  }

  async countHashServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHashServices(schoolId, filters);
  }
}
