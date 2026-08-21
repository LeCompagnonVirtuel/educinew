import type { SupabaseClient } from '@supabase/supabase-js';
import type { Directorate, DirectorateCreate } from '@educi/types';
import { GovDirectorateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryDirectorateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Directorate> {
    const item = await this.repo.findDirectorateById(schoolId, id);
    if (!item) throw new GovDirectorateNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Directorate[]> {
    return this.repo.findAllDirectorates(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<DirectorateCreate>): Promise<Directorate> {
    return this.repo.createDirectorate(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<DirectorateCreate>): Promise<Directorate> {
    const existing = await this.repo.findDirectorateById(schoolId, id);
    if (!existing) throw new GovDirectorateNotFoundError(id);
    return this.repo.updateDirectorate(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDirectorateById(schoolId, id);
    if (!existing) throw new GovDirectorateNotFoundError(id);
    return this.repo.deleteDirectorate(schoolId, id);
  }
}
