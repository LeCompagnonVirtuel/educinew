import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationSystem, EducationSystemCreate } from '@educi/types';
import { GovEducationSystemNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataEducationSystemService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationSystem> {
    const item = await this.repo.findEducationSystemById(schoolId, id);
    if (!item) throw new GovEducationSystemNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationSystem[]> {
    return this.repo.findAllEducationSystems(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationSystemCreate>): Promise<EducationSystem> {
    return this.repo.createEducationSystem(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationSystemCreate>): Promise<EducationSystem> {
    const existing = await this.repo.findEducationSystemById(schoolId, id);
    if (!existing) throw new GovEducationSystemNotFoundError(id);
    return this.repo.updateEducationSystem(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationSystemById(schoolId, id);
    if (!existing) throw new GovEducationSystemNotFoundError(id);
    return this.repo.deleteEducationSystem(schoolId, id);
  }
}
