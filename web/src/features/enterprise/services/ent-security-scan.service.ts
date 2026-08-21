// Enterprise Platform Service - SecurityScan
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityScan, SecurityScanCreate } from '@educi/types';
import { EntSecurityScanNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityScanService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityScan(schoolId: string, id: string): Promise<SecurityScan> {
    const item = await this.repo.findSecurityScanById(schoolId, id);
    if (!item) throw new EntSecurityScanNotFoundError(id);
    return item;
  }
  async listSecurityScans(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityScan[]> {
    return this.repo.findAllSecurityScans(schoolId, filters);
  }
  async createSecurityScan(schoolId: string, data: SecurityScanCreate): Promise<SecurityScan> {
    return this.repo.createSecurityScan(schoolId, data);
  }
  async updateSecurityScan(schoolId: string, id: string, data: Partial<SecurityScanCreate>): Promise<SecurityScan> {
    const existing = await this.repo.findSecurityScanById(schoolId, id);
    if (!existing) throw new EntSecurityScanNotFoundError(id);
    return this.repo.updateSecurityScan(schoolId, id, data);
  }
  async deleteSecurityScan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityScanById(schoolId, id);
    if (!existing) throw new EntSecurityScanNotFoundError(id);
    return this.repo.deleteSecurityScan(schoolId, id);
  }
  async countSecurityScans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityScans(schoolId, filters);
  }
}
