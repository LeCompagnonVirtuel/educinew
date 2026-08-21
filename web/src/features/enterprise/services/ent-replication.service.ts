// Enterprise Platform Service - Replication
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Replication, ReplicationCreate } from '@educi/types';
import { EntReplicationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReplicationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReplication(schoolId: string, id: string): Promise<Replication> {
    const item = await this.repo.findReplicationById(schoolId, id);
    if (!item) throw new EntReplicationNotFoundError(id);
    return item;
  }
  async listReplications(schoolId: string, filters?: Record<string, unknown>): Promise<Replication[]> {
    return this.repo.findAllReplications(schoolId, filters);
  }
  async createReplication(schoolId: string, data: ReplicationCreate): Promise<Replication> {
    return this.repo.createReplication(schoolId, data);
  }
  async updateReplication(schoolId: string, id: string, data: Partial<ReplicationCreate>): Promise<Replication> {
    const existing = await this.repo.findReplicationById(schoolId, id);
    if (!existing) throw new EntReplicationNotFoundError(id);
    return this.repo.updateReplication(schoolId, id, data);
  }
  async deleteReplication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReplicationById(schoolId, id);
    if (!existing) throw new EntReplicationNotFoundError(id);
    return this.repo.deleteReplication(schoolId, id);
  }
  async countReplications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReplications(schoolId, filters);
  }
}
