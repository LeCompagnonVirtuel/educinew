// Enterprise Platform Service - ComplianceControls
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntComplianceControlService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getComplianceControl(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findComplianceControlById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listComplianceControls(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllComplianceControls(schoolId, filters);
  }
  async createComplianceControl(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createComplianceControl(schoolId, data);
  }
  async updateComplianceControl(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findComplianceControlById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateComplianceControl(schoolId, id, data);
  }
  async deleteComplianceControl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceControlById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteComplianceControl(schoolId, id);
  }
  async countComplianceControls(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceControls(schoolId, filters);
  }
}
