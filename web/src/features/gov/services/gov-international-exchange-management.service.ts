// Government & National Governance Service - InternationalExchangeManagement
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalExchangeManagement, InternationalExchangeManagementCreate } from '@educi/types';
import { GovInternationalExchangeManagementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalExchangeManagementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalExchangeManagement(schoolId: string, id: string): Promise<InternationalExchangeManagement> {
    const item = await this.repo.findInternationalExchangeManagementById(schoolId, id);
    if (!item) throw new GovInternationalExchangeManagementNotFoundError(id);
    return item;
  }

  async listInternationalExchangeManagements(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalExchangeManagement[]> {
    return this.repo.findAllInternationalExchangeManagements(schoolId, filters);
  }

  async createInternationalExchangeManagement(schoolId: string, data: InternationalExchangeManagementCreate): Promise<InternationalExchangeManagement> {
    return this.repo.createInternationalExchangeManagement(schoolId, data);
  }

  async updateInternationalExchangeManagement(schoolId: string, id: string, data: Partial<InternationalExchangeManagementCreate>): Promise<InternationalExchangeManagement> {
    const existing = await this.repo.findInternationalExchangeManagementById(schoolId, id);
    if (!existing) throw new GovInternationalExchangeManagementNotFoundError(id);
    return this.repo.updateInternationalExchangeManagement(schoolId, id, data);
  }

  async deleteInternationalExchangeManagement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalExchangeManagementById(schoolId, id);
    if (!existing) throw new GovInternationalExchangeManagementNotFoundError(id);
    return this.repo.deleteInternationalExchangeManagement(schoolId, id);
  }

  async countInternationalExchangeManagements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalExchangeManagements(schoolId, filters);
  }
}
