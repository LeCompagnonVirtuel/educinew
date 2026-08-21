// Enterprise Platform Service - NetworksRoutes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNetworkRouteService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNetworksRoute(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNetworksRouteById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNetworksRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNetworksRoutes(schoolId, filters);
  }
  async createNetworksRoute(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNetworksRoute(schoolId, data);
  }
  async updateNetworksRoute(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNetworksRouteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNetworksRoute(schoolId, id, data);
  }
  async deleteNetworksRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworksRouteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNetworksRoute(schoolId, id);
  }
  async countNetworksRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworksRoutes(schoolId, filters);
  }
}
