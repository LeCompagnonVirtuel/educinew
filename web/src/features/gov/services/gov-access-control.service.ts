// Government & National Governance Service - AccessControl
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessControl, AccessControlCreate } from '@educi/types';
import { GovAccessControlNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccessControlService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccessControl(schoolId: string, id: string): Promise<AccessControl> {
    const item = await this.repo.findAccessControlById(schoolId, id);
    if (!item) throw new GovAccessControlNotFoundError(id);
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
    if (!existing) throw new GovAccessControlNotFoundError(id);
    return this.repo.updateAccessControl(schoolId, id, data);
  }

  async deleteAccessControl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccessControlById(schoolId, id);
    if (!existing) throw new GovAccessControlNotFoundError(id);
    return this.repo.deleteAccessControl(schoolId, id);
  }

  async countAccessControls(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccessControls(schoolId, filters);
  }
}
