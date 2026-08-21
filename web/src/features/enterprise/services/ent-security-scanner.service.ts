// Enterprise Platform Service - SecurityScanner
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityScanner, SecurityScannerCreate } from '@educi/types';
import { EntSecurityScannerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityScannerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityScanner(schoolId: string, id: string): Promise<SecurityScanner> {
    const item = await this.repo.findSecurityScannerById(schoolId, id);
    if (!item) throw new EntSecurityScannerNotFoundError(id);
    return item;
  }
  async listSecurityScanners(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityScanner[]> {
    return this.repo.findAllSecurityScanners(schoolId, filters);
  }
  async createSecurityScanner(schoolId: string, data: SecurityScannerCreate): Promise<SecurityScanner> {
    return this.repo.createSecurityScanner(schoolId, data);
  }
  async updateSecurityScanner(schoolId: string, id: string, data: Partial<SecurityScannerCreate>): Promise<SecurityScanner> {
    const existing = await this.repo.findSecurityScannerById(schoolId, id);
    if (!existing) throw new EntSecurityScannerNotFoundError(id);
    return this.repo.updateSecurityScanner(schoolId, id, data);
  }
  async deleteSecurityScanner(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityScannerById(schoolId, id);
    if (!existing) throw new EntSecurityScannerNotFoundError(id);
    return this.repo.deleteSecurityScanner(schoolId, id);
  }
  async countSecurityScanners(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityScanners(schoolId, filters);
  }
}
