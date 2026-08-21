// Enterprise Platform Service - ClustersServices
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntClusterServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getClustersService(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findClustersServiceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listClustersServices(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllClustersServices(schoolId, filters);
  }
  async createClustersService(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createClustersService(schoolId, data);
  }
  async updateClustersService(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findClustersServiceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateClustersService(schoolId, id, data);
  }
  async deleteClustersService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findClustersServiceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteClustersService(schoolId, id);
  }
  async countClustersServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countClustersServices(schoolId, filters);
  }
}
