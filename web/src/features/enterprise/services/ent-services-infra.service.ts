// Enterprise Platform Service - ServicesInfra
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntServiceInfraService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getServicesInfra(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findServicesInfraById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listServicesInfra(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllServicesInfra(schoolId, filters);
  }
  async createServicesInfra(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createServicesInfra(schoolId, data);
  }
  async updateServicesInfra(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findServicesInfraById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateServicesInfra(schoolId, id, data);
  }
  async deleteServicesInfra(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findServicesInfraById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteServicesInfra(schoolId, id);
  }
  async countServicesInfra(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countServicesInfra(schoolId, filters);
  }
}
