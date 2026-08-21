// Enterprise Platform Service - SecurityCenter
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityCenter, SecurityCenterCreate } from '@educi/types';
import { EntSecurityCenterNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecurityCenterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityCenter(schoolId: string, id: string): Promise<SecurityCenter> {
    const item = await this.repo.findSecurityCenterById(schoolId, id);
    if (!item) throw new EntSecurityCenterNotFoundError(id);
    return item;
  }
  async listSecurityCenters(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityCenter[]> {
    return this.repo.findAllSecurityCenters(schoolId, filters);
  }
  async createSecurityCenter(schoolId: string, data: SecurityCenterCreate): Promise<SecurityCenter> {
    return this.repo.createSecurityCenter(schoolId, data);
  }
  async updateSecurityCenter(schoolId: string, id: string, data: Partial<SecurityCenterCreate>): Promise<SecurityCenter> {
    const existing = await this.repo.findSecurityCenterById(schoolId, id);
    if (!existing) throw new EntSecurityCenterNotFoundError(id);
    return this.repo.updateSecurityCenter(schoolId, id, data);
  }
  async deleteSecurityCenter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityCenterById(schoolId, id);
    if (!existing) throw new EntSecurityCenterNotFoundError(id);
    return this.repo.deleteSecurityCenter(schoolId, id);
  }
  async countSecurityCenters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityCenters(schoolId, filters);
  }
}
