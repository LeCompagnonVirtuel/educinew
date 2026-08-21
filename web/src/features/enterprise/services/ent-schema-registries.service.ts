// Enterprise Platform Service - SchemaRegistries
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchemaRegistryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchemaRegistrie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchemaRegistrieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchemaRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchemaRegistries(schoolId, filters);
  }
  async createSchemaRegistrie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchemaRegistrie(schoolId, data);
  }
  async updateSchemaRegistrie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchemaRegistrieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchemaRegistrie(schoolId, id, data);
  }
  async deleteSchemaRegistrie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchemaRegistrieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchemaRegistrie(schoolId, id);
  }
  async countSchemaRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchemaRegistries(schoolId, filters);
  }
}
