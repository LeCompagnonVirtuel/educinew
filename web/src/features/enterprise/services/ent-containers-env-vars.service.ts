// Enterprise Platform Service - ContainersEnvVars
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntContainerEnvVarService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getContainersEnvVar(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findContainersEnvVarById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listContainersEnvVars(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllContainersEnvVars(schoolId, filters);
  }
  async createContainersEnvVar(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createContainersEnvVar(schoolId, data);
  }
  async updateContainersEnvVar(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findContainersEnvVarById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateContainersEnvVar(schoolId, id, data);
  }
  async deleteContainersEnvVar(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findContainersEnvVarById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteContainersEnvVar(schoolId, id);
  }
  async countContainersEnvVars(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countContainersEnvVars(schoolId, filters);
  }
}
