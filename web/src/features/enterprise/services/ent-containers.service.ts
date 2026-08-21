// Enterprise Platform Service - Containers
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntContainerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getContainer(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findContainerById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listContainers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllContainers(schoolId, filters);
  }
  async createContainer(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createContainer(schoolId, data);
  }
  async updateContainer(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findContainerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateContainer(schoolId, id, data);
  }
  async deleteContainer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findContainerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteContainer(schoolId, id);
  }
  async countContainers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countContainers(schoolId, filters);
  }
}
