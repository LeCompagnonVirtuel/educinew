// Enterprise Platform Service - ContainersLogs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntContainerLogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getContainersLog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findContainersLogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listContainersLogs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllContainersLogs(schoolId, filters);
  }
  async createContainersLog(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createContainersLog(schoolId, data);
  }
  async updateContainersLog(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findContainersLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateContainersLog(schoolId, id, data);
  }
  async deleteContainersLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findContainersLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteContainersLog(schoolId, id);
  }
  async countContainersLogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countContainersLogs(schoolId, filters);
  }
}
