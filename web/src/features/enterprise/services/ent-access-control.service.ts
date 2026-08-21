// Enterprise Platform Service - AccessControl
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessControl, AccessControlCreate } from '@educi/types';
import { EntAccessControlNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAccessControlService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAccessControl(schoolId: string, id: string): Promise<AccessControl> {
    const item = await this.repo.findAccessControlById(schoolId, id);
    if (!item) throw new EntAccessControlNotFoundError(id);
    return item;
  }
  async listAccessControls(schoolId: string, filters?: Record<string, unknown>): Promise<AccessControl[]> {
    return this.repo.findAllAccessControls(schoolId, filters);
  }
  async createAccessControl(schoolId: string, data: AccessControlCreate): Promise<AccessControl> {
    return this.repo.createAccessControl(schoolId, data);
  }
  async updateAccessControl(schoolId: string, id: string, data: Partial<AccessControlCreate>): Promise<AccessControl> {
    const existing = await this.repo.findAccessControlById(schoolId, id);
    if (!existing) throw new EntAccessControlNotFoundError(id);
    return this.repo.updateAccessControl(schoolId, id, data);
  }
  async deleteAccessControl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccessControlById(schoolId, id);
    if (!existing) throw new EntAccessControlNotFoundError(id);
    return this.repo.deleteAccessControl(schoolId, id);
  }
  async countAccessControls(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccessControls(schoolId, filters);
  }
}
