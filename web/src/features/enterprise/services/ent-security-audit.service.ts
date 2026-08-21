// Enterprise Platform Service - SecurityAudit
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityAudit, SecurityAuditCreate } from '@educi/types';
import { EntSecurityAuditNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityAuditService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityAudit(schoolId: string, id: string): Promise<SecurityAudit> {
    const item = await this.repo.findSecurityAuditById(schoolId, id);
    if (!item) throw new EntSecurityAuditNotFoundError(id);
    return item;
  }
  async listSecurityAudits(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityAudit[]> {
    return this.repo.findAllSecurityAudits(schoolId, filters);
  }
  async createSecurityAudit(schoolId: string, data: SecurityAuditCreate): Promise<SecurityAudit> {
    return this.repo.createSecurityAudit(schoolId, data);
  }
  async updateSecurityAudit(schoolId: string, id: string, data: Partial<SecurityAuditCreate>): Promise<SecurityAudit> {
    const existing = await this.repo.findSecurityAuditById(schoolId, id);
    if (!existing) throw new EntSecurityAuditNotFoundError(id);
    return this.repo.updateSecurityAudit(schoolId, id, data);
  }
  async deleteSecurityAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityAuditById(schoolId, id);
    if (!existing) throw new EntSecurityAuditNotFoundError(id);
    return this.repo.deleteSecurityAudit(schoolId, id);
  }
  async countSecurityAudits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityAudits(schoolId, filters);
  }
}
