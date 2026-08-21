// Government & National Governance Service - VersionControl
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { VersionControl, VersionControlCreate } from '@educi/types';
import { GovVersionControlNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovVersionControlService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getVersionControl(schoolId: string, id: string): Promise<VersionControl> {
    const item = await this.repo.findVersionControlById(schoolId, id);
    if (!item) throw new GovVersionControlNotFoundError(id);
    return item;
  }

  async listVersionControls(schoolId: string, filters?: Record<string, unknown>): Promise<VersionControl[]> {
    return this.repo.findAllVersionControls(schoolId, filters);
  }

  async createVersionControl(schoolId: string, data: VersionControlCreate): Promise<VersionControl> {
    return this.repo.createVersionControl(schoolId, data);
  }

  async updateVersionControl(schoolId: string, id: string, data: Partial<VersionControlCreate>): Promise<VersionControl> {
    const existing = await this.repo.findVersionControlById(schoolId, id);
    if (!existing) throw new GovVersionControlNotFoundError(id);
    return this.repo.updateVersionControl(schoolId, id, data);
  }

  async deleteVersionControl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVersionControlById(schoolId, id);
    if (!existing) throw new GovVersionControlNotFoundError(id);
    return this.repo.deleteVersionControl(schoolId, id);
  }

  async countVersionControls(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVersionControls(schoolId, filters);
  }
}
