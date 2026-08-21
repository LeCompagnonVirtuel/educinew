import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolComplianceRecord, SchoolComplianceRecordCreate } from '@educi/types';
import { GovSchoolComplianceRecordNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatorySchoolComplianceRecordService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<SchoolComplianceRecord> {
    const item = await this.repo.findSchoolComplianceRecordById(schoolId, id);
    if (!item) throw new GovSchoolComplianceRecordNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolComplianceRecord[]> {
    return this.repo.findAllSchoolComplianceRecords(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<SchoolComplianceRecordCreate>): Promise<SchoolComplianceRecord> {
    return this.repo.createSchoolComplianceRecord(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<SchoolComplianceRecordCreate>): Promise<SchoolComplianceRecord> {
    const existing = await this.repo.findSchoolComplianceRecordById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceRecordNotFoundError(id);
    return this.repo.updateSchoolComplianceRecord(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolComplianceRecordById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceRecordNotFoundError(id);
    return this.repo.deleteSchoolComplianceRecord(schoolId, id);
  }
}
