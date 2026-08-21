// Enterprise Platform Service - ComplianceFrameworksControls
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFrameworkControlService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getComplianceFrameworksControl(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findComplianceFrameworksControlById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listComplianceFrameworksControls(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllComplianceFrameworksControls(schoolId, filters);
  }
  async createComplianceFrameworksControl(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createComplianceFrameworksControl(schoolId, data);
  }
  async updateComplianceFrameworksControl(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findComplianceFrameworksControlById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateComplianceFrameworksControl(schoolId, id, data);
  }
  async deleteComplianceFrameworksControl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceFrameworksControlById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteComplianceFrameworksControl(schoolId, id);
  }
  async countComplianceFrameworksControls(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceFrameworksControls(schoolId, filters);
  }
}
