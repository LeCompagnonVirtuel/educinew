// Government & National Governance Service - ComplianceNotificationDispatch
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceNotificationDispatch, ComplianceNotificationDispatchCreate } from '@educi/types';
import { GovComplianceNotificationDispatchNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceNotificationDispatchService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceNotificationDispatch(schoolId: string, id: string): Promise<ComplianceNotificationDispatch> {
    const item = await this.repo.findComplianceNotificationDispatchById(schoolId, id);
    if (!item) throw new GovComplianceNotificationDispatchNotFoundError(id);
    return item;
  }

  async listComplianceNotificationDispatchs(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceNotificationDispatch[]> {
    return this.repo.findAllComplianceNotificationDispatchs(schoolId, filters);
  }

  async createComplianceNotificationDispatch(schoolId: string, data: ComplianceNotificationDispatchCreate): Promise<ComplianceNotificationDispatch> {
    return this.repo.createComplianceNotificationDispatch(schoolId, data);
  }

  async updateComplianceNotificationDispatch(schoolId: string, id: string, data: Partial<ComplianceNotificationDispatchCreate>): Promise<ComplianceNotificationDispatch> {
    const existing = await this.repo.findComplianceNotificationDispatchById(schoolId, id);
    if (!existing) throw new GovComplianceNotificationDispatchNotFoundError(id);
    return this.repo.updateComplianceNotificationDispatch(schoolId, id, data);
  }

  async deleteComplianceNotificationDispatch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceNotificationDispatchById(schoolId, id);
    if (!existing) throw new GovComplianceNotificationDispatchNotFoundError(id);
    return this.repo.deleteComplianceNotificationDispatch(schoolId, id);
  }

  async countComplianceNotificationDispatchs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceNotificationDispatchs(schoolId, filters);
  }
}
