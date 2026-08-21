// Government & National Governance Service - Directorate
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Directorate, DirectorateCreate } from '@educi/types';
import { GovDirectorateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDirectorateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDirectorate(schoolId: string, id: string): Promise<Directorate> {
    const item = await this.repo.findDirectorateById(schoolId, id);
    if (!item) throw new GovDirectorateNotFoundError(id);
    return item;
  }

  async listDirectorates(schoolId: string, filters?: Record<string, unknown>): Promise<Directorate[]> {
    return this.repo.findAllDirectorates(schoolId, filters);
  }

  async createDirectorate(schoolId: string, data: DirectorateCreate): Promise<Directorate> {
    return this.repo.createDirectorate(schoolId, data);
  }

  async updateDirectorate(schoolId: string, id: string, data: Partial<DirectorateCreate>): Promise<Directorate> {
    const existing = await this.repo.findDirectorateById(schoolId, id);
    if (!existing) throw new GovDirectorateNotFoundError(id);
    return this.repo.updateDirectorate(schoolId, id, data);
  }

  async deleteDirectorate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDirectorateById(schoolId, id);
    if (!existing) throw new GovDirectorateNotFoundError(id);
    return this.repo.deleteDirectorate(schoolId, id);
  }

  async countDirectorates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDirectorates(schoolId, filters);
  }
}
