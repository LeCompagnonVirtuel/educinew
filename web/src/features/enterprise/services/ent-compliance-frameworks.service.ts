// Enterprise Platform Service - ComplianceFrameworks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntComplianceFrameworkService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getComplianceFramework(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findComplianceFrameworkById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listComplianceFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllComplianceFrameworks(schoolId, filters);
  }
  async createComplianceFramework(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createComplianceFramework(schoolId, data);
  }
  async updateComplianceFramework(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findComplianceFrameworkById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateComplianceFramework(schoolId, id, data);
  }
  async deleteComplianceFramework(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceFrameworkById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteComplianceFramework(schoolId, id);
  }
  async countComplianceFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceFrameworks(schoolId, filters);
  }
}
