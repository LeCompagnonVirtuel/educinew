// Government & National Governance Service - InspectionComplianceChecking
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionComplianceChecking, InspectionComplianceCheckingCreate } from '@educi/types';
import { GovInspectionComplianceCheckingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionComplianceCheckingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionComplianceChecking(schoolId: string, id: string): Promise<InspectionComplianceChecking> {
    const item = await this.repo.findInspectionComplianceCheckingById(schoolId, id);
    if (!item) throw new GovInspectionComplianceCheckingNotFoundError(id);
    return item;
  }

  async listInspectionComplianceCheckings(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionComplianceChecking[]> {
    return this.repo.findAllInspectionComplianceCheckings(schoolId, filters);
  }

  async createInspectionComplianceChecking(schoolId: string, data: InspectionComplianceCheckingCreate): Promise<InspectionComplianceChecking> {
    return this.repo.createInspectionComplianceChecking(schoolId, data);
  }

  async updateInspectionComplianceChecking(schoolId: string, id: string, data: Partial<InspectionComplianceCheckingCreate>): Promise<InspectionComplianceChecking> {
    const existing = await this.repo.findInspectionComplianceCheckingById(schoolId, id);
    if (!existing) throw new GovInspectionComplianceCheckingNotFoundError(id);
    return this.repo.updateInspectionComplianceChecking(schoolId, id, data);
  }

  async deleteInspectionComplianceChecking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionComplianceCheckingById(schoolId, id);
    if (!existing) throw new GovInspectionComplianceCheckingNotFoundError(id);
    return this.repo.deleteInspectionComplianceChecking(schoolId, id);
  }

  async countInspectionComplianceCheckings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionComplianceCheckings(schoolId, filters);
  }
}
