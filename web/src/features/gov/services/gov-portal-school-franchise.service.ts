import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolFranchise, SchoolFranchiseCreate } from '@educi/types';
import { GovSchoolFranchiseNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalSchoolFranchiseService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SchoolFranchise> {
    const item = await this.repo.findSchoolFranchiseById(schoolId, id);
    if (!item) throw new GovSchoolFranchiseNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolFranchise[]> {
    return this.repo.findAllSchoolFranchises(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SchoolFranchiseCreate>): Promise<SchoolFranchise> {
    return this.repo.createSchoolFranchise(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SchoolFranchiseCreate>): Promise<SchoolFranchise> {
    const existing = await this.repo.findSchoolFranchiseById(schoolId, id);
    if (!existing) throw new GovSchoolFranchiseNotFoundError(id);
    return this.repo.updateSchoolFranchise(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolFranchiseById(schoolId, id);
    if (!existing) throw new GovSchoolFranchiseNotFoundError(id);
    return this.repo.deleteSchoolFranchise(schoolId, id);
  }
}
