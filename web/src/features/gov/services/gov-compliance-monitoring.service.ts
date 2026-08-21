// Government & National Governance Service - ComplianceMonitoring
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceMonitoring, ComplianceMonitoringCreate } from '@educi/types';
import { GovComplianceMonitoringNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceMonitoringService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceMonitoring(schoolId: string, id: string): Promise<ComplianceMonitoring> {
    const item = await this.repo.findComplianceMonitoringById(schoolId, id);
    if (!item) throw new GovComplianceMonitoringNotFoundError(id);
    return item;
  }

  async listComplianceMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceMonitoring[]> {
    return this.repo.findAllComplianceMonitorings(schoolId, filters);
  }

  async createComplianceMonitoring(schoolId: string, data: ComplianceMonitoringCreate): Promise<ComplianceMonitoring> {
    return this.repo.createComplianceMonitoring(schoolId, data);
  }

  async updateComplianceMonitoring(schoolId: string, id: string, data: Partial<ComplianceMonitoringCreate>): Promise<ComplianceMonitoring> {
    const existing = await this.repo.findComplianceMonitoringById(schoolId, id);
    if (!existing) throw new GovComplianceMonitoringNotFoundError(id);
    return this.repo.updateComplianceMonitoring(schoolId, id, data);
  }

  async deleteComplianceMonitoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceMonitoringById(schoolId, id);
    if (!existing) throw new GovComplianceMonitoringNotFoundError(id);
    return this.repo.deleteComplianceMonitoring(schoolId, id);
  }

  async countComplianceMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceMonitorings(schoolId, filters);
  }
}
