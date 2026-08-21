// Government & National Governance Service - ComplianceWaiver
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceWaiver, ComplianceWaiverCreate } from '@educi/types';
import { GovComplianceWaiverNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceWaiverService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceWaiver(schoolId: string, id: string): Promise<ComplianceWaiver> {
    const item = await this.repo.findComplianceWaiverById(schoolId, id);
    if (!item) throw new GovComplianceWaiverNotFoundError(id);
    return item;
  }

  async listComplianceWaivers(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceWaiver[]> {
    return this.repo.findAllComplianceWaivers(schoolId, filters);
  }

  async createComplianceWaiver(schoolId: string, data: ComplianceWaiverCreate): Promise<ComplianceWaiver> {
    return this.repo.createComplianceWaiver(schoolId, data);
  }

  async updateComplianceWaiver(schoolId: string, id: string, data: Partial<ComplianceWaiverCreate>): Promise<ComplianceWaiver> {
    const existing = await this.repo.findComplianceWaiverById(schoolId, id);
    if (!existing) throw new GovComplianceWaiverNotFoundError(id);
    return this.repo.updateComplianceWaiver(schoolId, id, data);
  }

  async deleteComplianceWaiver(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceWaiverById(schoolId, id);
    if (!existing) throw new GovComplianceWaiverNotFoundError(id);
    return this.repo.deleteComplianceWaiver(schoolId, id);
  }

  async countComplianceWaivers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceWaivers(schoolId, filters);
  }
}
