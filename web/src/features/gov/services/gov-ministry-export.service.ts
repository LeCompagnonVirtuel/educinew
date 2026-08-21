// Government & National Governance Service - MinistryExport
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryExport, MinistryExportCreate } from '@educi/types';
import { GovMinistryExportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryExportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getMinistryExport(schoolId: string, id: string): Promise<MinistryExport> {
    const item = await this.repo.findMinistryExportById(schoolId, id);
    if (!item) throw new GovMinistryExportNotFoundError(id);
    return item;
  }

  async listMinistryExports(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryExport[]> {
    return this.repo.findAllMinistryExports(schoolId, filters);
  }

  async createMinistryExport(schoolId: string, data: MinistryExportCreate): Promise<MinistryExport> {
    return this.repo.createMinistryExport(schoolId, data);
  }

  async updateMinistryExport(schoolId: string, id: string, data: Partial<MinistryExportCreate>): Promise<MinistryExport> {
    const existing = await this.repo.findMinistryExportById(schoolId, id);
    if (!existing) throw new GovMinistryExportNotFoundError(id);
    return this.repo.updateMinistryExport(schoolId, id, data);
  }

  async deleteMinistryExport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryExportById(schoolId, id);
    if (!existing) throw new GovMinistryExportNotFoundError(id);
    return this.repo.deleteMinistryExport(schoolId, id);
  }

  async countMinistryExports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMinistryExports(schoolId, filters);
  }
}
