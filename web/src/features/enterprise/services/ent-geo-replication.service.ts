// Enterprise Platform Service - GeoReplication
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GeoReplication, GeoReplicationCreate } from '@educi/types';
import { EntGeoReplicationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGeoReplicationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGeoReplication(schoolId: string, id: string): Promise<GeoReplication> {
    const item = await this.repo.findGeoReplicationById(schoolId, id);
    if (!item) throw new EntGeoReplicationNotFoundError(id);
    return item;
  }
  async listGeoReplications(schoolId: string, filters?: Record<string, unknown>): Promise<GeoReplication[]> {
    return this.repo.findAllGeoReplications(schoolId, filters);
  }
  async createGeoReplication(schoolId: string, data: GeoReplicationCreate): Promise<GeoReplication> {
    return this.repo.createGeoReplication(schoolId, data);
  }
  async updateGeoReplication(schoolId: string, id: string, data: Partial<GeoReplicationCreate>): Promise<GeoReplication> {
    const existing = await this.repo.findGeoReplicationById(schoolId, id);
    if (!existing) throw new EntGeoReplicationNotFoundError(id);
    return this.repo.updateGeoReplication(schoolId, id, data);
  }
  async deleteGeoReplication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGeoReplicationById(schoolId, id);
    if (!existing) throw new EntGeoReplicationNotFoundError(id);
    return this.repo.deleteGeoReplication(schoolId, id);
  }
  async countGeoReplications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGeoReplications(schoolId, filters);
  }
}
