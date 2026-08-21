import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeacherRegistry, TeacherRegistryCreate } from '@educi/types';
import { GovTeacherRegistryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityTeacherRegistryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<TeacherRegistry> {
    const item = await this.repo.findTeacherRegistryById(schoolId, id);
    if (!item) throw new GovTeacherRegistryNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherRegistry[]> {
    return this.repo.findAllTeacherRegistries(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<TeacherRegistryCreate>): Promise<TeacherRegistry> {
    return this.repo.createTeacherRegistry(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<TeacherRegistryCreate>): Promise<TeacherRegistry> {
    const existing = await this.repo.findTeacherRegistryById(schoolId, id);
    if (!existing) throw new GovTeacherRegistryNotFoundError(id);
    return this.repo.updateTeacherRegistry(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTeacherRegistryById(schoolId, id);
    if (!existing) throw new GovTeacherRegistryNotFoundError(id);
    return this.repo.deleteTeacherRegistry(schoolId, id);
  }
}
