// Enterprise Platform Service - Pods
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPodService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPod(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPodById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPods(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPods(schoolId, filters);
  }
  async createPod(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPod(schoolId, data);
  }
  async updatePod(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPodById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePod(schoolId, id, data);
  }
  async deletePod(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPodById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePod(schoolId, id);
  }
  async countPods(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPods(schoolId, filters);
  }
}
