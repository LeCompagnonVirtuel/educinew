// Enterprise Platform Service - ElasticCluster
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ElasticCluster, ElasticClusterCreate } from '@educi/types';
import { EntElasticClusterNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntElasticClusterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getElasticCluster(schoolId: string, id: string): Promise<ElasticCluster> {
    const item = await this.repo.findElasticClusterById(schoolId, id);
    if (!item) throw new EntElasticClusterNotFoundError(id);
    return item;
  }
  async listElasticClusters(schoolId: string, filters?: Record<string, unknown>): Promise<ElasticCluster[]> {
    return this.repo.findAllElasticClusters(schoolId, filters);
  }
  async createElasticCluster(schoolId: string, data: ElasticClusterCreate): Promise<ElasticCluster> {
    return this.repo.createElasticCluster(schoolId, data);
  }
  async updateElasticCluster(schoolId: string, id: string, data: Partial<ElasticClusterCreate>): Promise<ElasticCluster> {
    const existing = await this.repo.findElasticClusterById(schoolId, id);
    if (!existing) throw new EntElasticClusterNotFoundError(id);
    return this.repo.updateElasticCluster(schoolId, id, data);
  }
  async deleteElasticCluster(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findElasticClusterById(schoolId, id);
    if (!existing) throw new EntElasticClusterNotFoundError(id);
    return this.repo.deleteElasticCluster(schoolId, id);
  }
  async countElasticClusters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countElasticClusters(schoolId, filters);
  }
}
