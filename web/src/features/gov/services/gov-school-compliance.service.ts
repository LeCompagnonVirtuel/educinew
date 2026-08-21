// Government & National Governance Service - SchoolCompliance
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolCompliance, SchoolComplianceCreate } from '@educi/types';
import { GovSchoolComplianceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSchoolComplianceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSchoolCompliance(schoolId: string, id: string): Promise<SchoolCompliance> {
    const item = await this.repo.findSchoolComplianceById(schoolId, id);
    if (!item) throw new GovSchoolComplianceNotFoundError(id);
    return item;
  }

  async listSchoolCompliances(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolCompliance[]> {
    return this.repo.findAllSchoolCompliances(schoolId, filters);
  }

  async createSchoolCompliance(schoolId: string, data: SchoolComplianceCreate): Promise<SchoolCompliance> {
    return this.repo.createSchoolCompliance(schoolId, data);
  }

  async updateSchoolCompliance(schoolId: string, id: string, data: Partial<SchoolComplianceCreate>): Promise<SchoolCompliance> {
    const existing = await this.repo.findSchoolComplianceById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceNotFoundError(id);
    return this.repo.updateSchoolCompliance(schoolId, id, data);
  }

  async deleteSchoolCompliance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolComplianceById(schoolId, id);
    if (!existing) throw new GovSchoolComplianceNotFoundError(id);
    return this.repo.deleteSchoolCompliance(schoolId, id);
  }

  async countSchoolCompliances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolCompliances(schoolId, filters);
  }
}
