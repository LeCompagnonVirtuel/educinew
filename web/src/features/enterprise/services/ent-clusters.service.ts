// Enterprise Platform Service - Clusters
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntClusterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCluster(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findClusterById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listClusters(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllClusters(schoolId, filters);
  }
  async createCluster(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCluster(schoolId, data);
  }
  async updateCluster(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findClusterById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCluster(schoolId, id, data);
  }
  async deleteCluster(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findClusterById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCluster(schoolId, id);
  }
  async countClusters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countClusters(schoolId, filters);
  }
}
