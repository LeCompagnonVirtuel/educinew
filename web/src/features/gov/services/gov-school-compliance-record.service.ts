// Government & National Governance Service - SchoolComplianceRecord
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolComplianceRecord, SchoolComplianceRecordCreate } from '@educi/types';
import { GovSchoolComplianceRecordNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSchoolComplianceRecordService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSchoolComplianceRecord(schoolId: string, id: string): Promise<SchoolComplianceRecord> {
    const item = await this.repo.findSchoolComplianceRecordById(schoolId, id);
    if (!item) throw new GovSchoolComplianceRecordNotFoundError(id);
    return item;
  }

  async listSchoolComplianceRecords(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolComplianceRecord[]> {
    return this.repo.findAllSchoolComplianceRecords(schoolId, filters);
  }

  async createSchoolComplianceRecord(schoolId: string, data: SchoolComplianceRecordCreate): Promise<SchoolComplianceRecord> {
    return this.repo.createSchoolComplianceRecord(schoolId, data);
  }

  async updateSchoolComplianceRecord(schoolId: string, id: string, data: Partial<SchoolComplianceRecordCreate>): Promise<SchoolComplianceRecord> {
    const existing = await this.repo.findSchoolComplianceRecordById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceRecordNotFoundError(id);
    return this.repo.updateSchoolComplianceRecord(schoolId, id, data);
  }

  async deleteSchoolComplianceRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolComplianceRecordById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceRecordNotFoundError(id);
    return this.repo.deleteSchoolComplianceRecord(schoolId, id);
  }

  async countSchoolComplianceRecords(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolComplianceRecords(schoolId, filters);
  }
}
