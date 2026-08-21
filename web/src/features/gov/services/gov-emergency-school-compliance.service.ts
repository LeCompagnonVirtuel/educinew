import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolCompliance, SchoolComplianceCreate } from '@educi/types';
import { GovSchoolComplianceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencySchoolComplianceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SchoolCompliance> {
    const item = await this.repo.findSchoolComplianceById(schoolId, id);
    if (!item) throw new GovSchoolComplianceNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolCompliance[]> {
    return this.repo.findAllSchoolCompliances(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance> {
    return this.repo.createSchoolCompliance(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance> {
    const existing = await this.repo.findSchoolComplianceById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceNotFoundError(id);
    return this.repo.updateSchoolCompliance(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolComplianceById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceNotFoundError(id);
    return this.repo.deleteSchoolCompliance(schoolId, id);
  }
}
