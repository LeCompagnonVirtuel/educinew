// Enterprise Platform Service - RedisCluster
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RedisCluster, RedisClusterCreate } from '@educi/types';
import { EntRedisClusterNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRedisClusterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRedisCluster(schoolId: string, id: string): Promise<RedisCluster> {
    const item = await this.repo.findRedisClusterById(schoolId, id);
    if (!item) throw new EntRedisClusterNotFoundError(id);
    return item;
  }
  async listRedisClusters(schoolId: string, filters?: Record<string, unknown>): Promise<RedisCluster[]> {
    return this.repo.findAllRedisClusters(schoolId, filters);
  }
  async createRedisCluster(schoolId: string, data: RedisClusterCreate): Promise<RedisCluster> {
    return this.repo.createRedisCluster(schoolId, data);
  }
  async updateRedisCluster(schoolId: string, id: string, data: Partial<RedisClusterCreate>): Promise<RedisCluster> {
    const existing = await this.repo.findRedisClusterById(schoolId, id);
    if (!existing) throw new EntRedisClusterNotFoundError(id);
    return this.repo.updateRedisCluster(schoolId, id, data);
  }
  async deleteRedisCluster(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRedisClusterById(schoolId, id);
    if (!existing) throw new EntRedisClusterNotFoundError(id);
    return this.repo.deleteRedisCluster(schoolId, id);
  }
  async countRedisClusters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRedisClusters(schoolId, filters);
  }
}
