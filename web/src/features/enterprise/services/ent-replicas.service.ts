// Enterprise Platform Service - Replicas
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReplicaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReplica(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReplicaById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReplicas(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReplicas(schoolId, filters);
  }
  async createReplica(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReplica(schoolId, data);
  }
  async updateReplica(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReplicaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReplica(schoolId, id, data);
  }
  async deleteReplica(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReplicaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReplica(schoolId, id);
  }
  async countReplicas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReplicas(schoolId, filters);
  }
}
