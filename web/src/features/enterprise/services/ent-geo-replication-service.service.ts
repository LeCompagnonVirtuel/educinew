// Enterprise Platform Service - GeoReplication
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GeoReplication, GeoReplicationCreate } from '@educi/types';
import { EntGeoReplicationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGeoReplicationServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGeoReplicationService(schoolId: string, id: string): Promise<GeoReplication> {
    const item = await this.repo.findGeoReplicationServiceById(schoolId, id);
    if (!item) throw new EntGeoReplicationNotFoundError(id);
    return item;
  }
  async listGeoReplicationServices(schoolId: string, filters?: Record<string, unknown>): Promise<GeoReplication[]> {
    return this.repo.findAllGeoReplicationServices(schoolId, filters);
  }
  async createGeoReplicationService(schoolId: string, data: GeoReplicationCreate): Promise<GeoReplication> {
    return this.repo.createGeoReplicationService(schoolId, data);
  }
  async updateGeoReplicationService(schoolId: string, id: string, data: Partial<GeoReplicationCreate>): Promise<GeoReplication> {
    const existing = await this.repo.findGeoReplicationServiceById(schoolId, id);
    if (!existing) throw new EntGeoReplicationNotFoundError(id);
    return this.repo.updateGeoReplicationService(schoolId, id, data);
  }
  async deleteGeoReplicationService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGeoReplicationServiceById(schoolId, id);
    if (!existing) throw new EntGeoReplicationNotFoundError(id);
    return this.repo.deleteGeoReplicationService(schoolId, id);
  }
  async countGeoReplicationServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGeoReplicationServices(schoolId, filters);
  }
}
