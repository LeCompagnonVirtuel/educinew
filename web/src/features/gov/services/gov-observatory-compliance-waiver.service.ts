import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceWaiver, ComplianceWaiverCreate } from '@educi/types';
import { GovComplianceWaiverNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatoryComplianceWaiverService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ComplianceWaiver> {
    const item = await this.repo.findComplianceWaiverById(schoolId, id);
    if (!item) throw new GovComplianceWaiverNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceWaiver[]> {
    return this.repo.findAllComplianceWaivers(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ComplianceWaiverCreate>): Promise<ComplianceWaiver> {
    return this.repo.createComplianceWaiver(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ComplianceWaiverCreate>): Promise<ComplianceWaiver> {
    const existing = await this.repo.findComplianceWaiverById(schoolId, id);
    if (!existing) throw new GovComplianceWaiverNotFoundError(id);
    return this.repo.updateComplianceWaiver(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceWaiverById(schoolId, id);
    if (!existing) throw new GovComplianceWaiverNotFoundError(id);
    return this.repo.deleteComplianceWaiver(schoolId, id);
  }
}
