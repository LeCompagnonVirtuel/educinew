import type { SupabaseClient } from '@supabase/supabase-js';
import type { Inspector, InspectorCreate } from '@educi/types';
import { GovInspectorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegistryInspectorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Inspector> {
    const item = await this.repo.findInspectorById(schoolId, id);
    if (!item) throw new GovInspectorNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Inspector[]> {
    return this.repo.findAllInspectors(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectorCreate>): Promise<Inspector> {
    return this.repo.createInspector(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectorCreate>): Promise<Inspector> {
    const existing = await this.repo.findInspectorById(schoolId, id);
    if (!existing) throw new GovInspectorNotFoundError(id);
    return this.repo.updateInspector(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectorById(schoolId, id);
    if (!existing) throw new GovInspectorNotFoundError(id);
    return this.repo.deleteInspector(schoolId, id);
  }
}
