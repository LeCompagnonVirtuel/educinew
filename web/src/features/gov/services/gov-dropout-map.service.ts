// Government & National Governance Service - DropoutMap
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DropoutMap, DropoutMapCreate } from '@educi/types';
import { GovDropoutMapNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDropoutMapService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDropoutMap(schoolId: string, id: string): Promise<DropoutMap> {
    const item = await this.repo.findDropoutMapById(schoolId, id);
    if (!item) throw new GovDropoutMapNotFoundError(id);
    return item;
  }

  async listDropoutMaps(schoolId: string, filters?: Record<string, unknown>): Promise<DropoutMap[]> {
    return this.repo.findAllDropoutMaps(schoolId, filters);
  }

  async createDropoutMap(schoolId: string, data: DropoutMapCreate): Promise<DropoutMap> {
    return this.repo.createDropoutMap(schoolId, data);
  }

  async updateDropoutMap(schoolId: string, id: string, data: Partial<DropoutMapCreate>): Promise<DropoutMap> {
    const existing = await this.repo.findDropoutMapById(schoolId, id);
    if (!existing) throw new GovDropoutMapNotFoundError(id);
    return this.repo.updateDropoutMap(schoolId, id, data);
  }

  async deleteDropoutMap(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDropoutMapById(schoolId, id);
    if (!existing) throw new GovDropoutMapNotFoundError(id);
    return this.repo.deleteDropoutMap(schoolId, id);
  }

  async countDropoutMaps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDropoutMaps(schoolId, filters);
  }
}
