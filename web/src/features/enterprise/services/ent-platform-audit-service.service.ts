// Enterprise Platform Service - PlatformAudit
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformAudit, PlatformAuditCreate } from '@educi/types';
import { EntPlatformAuditNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformAuditServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformAuditService(schoolId: string, id: string): Promise<PlatformAudit> {
    const item = await this.repo.findPlatformAuditServiceById(schoolId, id);
    if (!item) throw new EntPlatformAuditNotFoundError(id);
    return item;
  }
  async listPlatformAuditServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformAudit[]> {
    return this.repo.findAllPlatformAuditServices(schoolId, filters);
  }
  async createPlatformAuditService(schoolId: string, data: PlatformAuditCreate): Promise<PlatformAudit> {
    return this.repo.createPlatformAuditService(schoolId, data);
  }
  async updatePlatformAuditService(schoolId: string, id: string, data: Partial<PlatformAuditCreate>): Promise<PlatformAudit> {
    const existing = await this.repo.findPlatformAuditServiceById(schoolId, id);
    if (!existing) throw new EntPlatformAuditNotFoundError(id);
    return this.repo.updatePlatformAuditService(schoolId, id, data);
  }
  async deletePlatformAuditService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformAuditServiceById(schoolId, id);
    if (!existing) throw new EntPlatformAuditNotFoundError(id);
    return this.repo.deletePlatformAuditService(schoolId, id);
  }
  async countPlatformAuditServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformAuditServices(schoolId, filters);
  }
}
