// Enterprise Platform Service - ProcurementApprovals
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProcurementApprovalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProcurementApproval(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProcurementApprovalById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProcurementApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProcurementApprovals(schoolId, filters);
  }
  async createProcurementApproval(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProcurementApproval(schoolId, data);
  }
  async updateProcurementApproval(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProcurementApprovalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProcurementApproval(schoolId, id, data);
  }
  async deleteProcurementApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProcurementApprovalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProcurementApproval(schoolId, id);
  }
  async countProcurementApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProcurementApprovals(schoolId, filters);
  }
}
