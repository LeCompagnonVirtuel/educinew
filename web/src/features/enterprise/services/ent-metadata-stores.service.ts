// Enterprise Platform Service - MetadataStores
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetadataStoreService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetadataStore(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMetadataStoreById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMetadataStores(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMetadataStores(schoolId, filters);
  }
  async createMetadataStore(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMetadataStore(schoolId, data);
  }
  async updateMetadataStore(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMetadataStoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMetadataStore(schoolId, id, data);
  }
  async deleteMetadataStore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetadataStoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMetadataStore(schoolId, id);
  }
  async countMetadataStores(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetadataStores(schoolId, filters);
  }
}
