// Enterprise Platform Service - ClustersNodes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntClusterNodeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getClustersNode(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findClustersNodeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listClustersNodes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllClustersNodes(schoolId, filters);
  }
  async createClustersNode(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createClustersNode(schoolId, data);
  }
  async updateClustersNode(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findClustersNodeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateClustersNode(schoolId, id, data);
  }
  async deleteClustersNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findClustersNodeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteClustersNode(schoolId, id);
  }
  async countClustersNodes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countClustersNodes(schoolId, filters);
  }
}
