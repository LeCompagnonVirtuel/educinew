// Enterprise Platform Service - PlatformAudit
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformAudit, PlatformAuditCreate } from '@educi/types';
import { EntPlatformAuditNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformAuditService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformAudit(schoolId: string, id: string): Promise<PlatformAudit> {
    const item = await this.repo.findPlatformAuditById(schoolId, id);
    if (!item) throw new EntPlatformAuditNotFoundError(id);
    return item;
  }
  async listPlatformAudits(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformAudit[]> {
    return this.repo.findAllPlatformAudits(schoolId, filters);
  }
  async createPlatformAudit(schoolId: string, data: PlatformAuditCreate): Promise<PlatformAudit> {
    return this.repo.createPlatformAudit(schoolId, data);
  }
  async updatePlatformAudit(schoolId: string, id: string, data: Partial<PlatformAuditCreate>): Promise<PlatformAudit> {
    const existing = await this.repo.findPlatformAuditById(schoolId, id);
    if (!existing) throw new EntPlatformAuditNotFoundError(id);
    return this.repo.updatePlatformAudit(schoolId, id, data);
  }
  async deletePlatformAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformAuditById(schoolId, id);
    if (!existing) throw new EntPlatformAuditNotFoundError(id);
    return this.repo.deletePlatformAudit(schoolId, id);
  }
  async countPlatformAudits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformAudits(schoolId, filters);
  }
}
