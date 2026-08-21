import type { SupabaseClient } from '@supabase/supabase-js';
import type { Circular, CircularCreate } from '@educi/types';
import { GovCircularNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryCircularService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Circular> {
    const item = await this.repo.findCircularById(schoolId, id);
    if (!item) throw new GovCircularNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Circular[]> {
    return this.repo.findAllCirculars(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CircularCreate>): Promise<Circular> {
    return this.repo.createCircular(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CircularCreate>): Promise<Circular> {
    const existing = await this.repo.findCircularById(schoolId, id);
    if (!existing) throw new GovCircularNotFoundError(id);
    return this.repo.updateCircular(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCircularById(schoolId, id);
    if (!existing) throw new GovCircularNotFoundError(id);
    return this.repo.deleteCircular(schoolId, id);
  }
}
