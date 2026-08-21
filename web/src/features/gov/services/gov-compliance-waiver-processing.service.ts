// Government & National Governance Service - ComplianceWaiverProcessing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceWaiverProcessing, ComplianceWaiverProcessingCreate } from '@educi/types';
import { GovComplianceWaiverProcessingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceWaiverProcessingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceWaiverProcessing(schoolId: string, id: string): Promise<ComplianceWaiverProcessing> {
    const item = await this.repo.findComplianceWaiverProcessingById(schoolId, id);
    if (!item) throw new GovComplianceWaiverProcessingNotFoundError(id);
    return item;
  }

  async listComplianceWaiverProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceWaiverProcessing[]> {
    return this.repo.findAllComplianceWaiverProcessings(schoolId, filters);
  }

  async createComplianceWaiverProcessing(schoolId: string, data: ComplianceWaiverProcessingCreate): Promise<ComplianceWaiverProcessing> {
    return this.repo.createComplianceWaiverProcessing(schoolId, data);
  }

  async updateComplianceWaiverProcessing(schoolId: string, id: string, data: Partial<ComplianceWaiverProcessingCreate>): Promise<ComplianceWaiverProcessing> {
    const existing = await this.repo.findComplianceWaiverProcessingById(schoolId, id);
    if (!existing) throw new GovComplianceWaiverProcessingNotFoundError(id);
    return this.repo.updateComplianceWaiverProcessing(schoolId, id, data);
  }

  async deleteComplianceWaiverProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceWaiverProcessingById(schoolId, id);
    if (!existing) throw new GovComplianceWaiverProcessingNotFoundError(id);
    return this.repo.deleteComplianceWaiverProcessing(schoolId, id);
  }

  async countComplianceWaiverProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceWaiverProcessings(schoolId, filters);
  }
}
