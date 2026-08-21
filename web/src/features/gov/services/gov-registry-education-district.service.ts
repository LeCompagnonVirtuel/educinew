import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationDistrict, EducationDistrictCreate } from '@educi/types';
import { GovEducationDistrictNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegistryEducationDistrictService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationDistrict> {
    const item = await this.repo.findEducationDistrictById(schoolId, id);
    if (!item) throw new GovEducationDistrictNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationDistrict[]> {
    return this.repo.findAllEducationDistricts(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationDistrictCreate>): Promise<EducationDistrict> {
    return this.repo.createEducationDistrict(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationDistrictCreate>): Promise<EducationDistrict> {
    const existing = await this.repo.findEducationDistrictById(schoolId, id);
    if (!existing) throw new GovEducationDistrictNotFoundError(id);
    return this.repo.updateEducationDistrict(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationDistrictById(schoolId, id);
    if (!existing) throw new GovEducationDistrictNotFoundError(id);
    return this.repo.deleteEducationDistrict(schoolId, id);
  }
}
