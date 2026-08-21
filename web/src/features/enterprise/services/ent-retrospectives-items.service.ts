// Enterprise Platform Service - RetrospectivesItems
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRetroItemService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRetrospectivesItem(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRetrospectivesItemById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRetrospectivesItems(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRetrospectivesItems(schoolId, filters);
  }
  async createRetrospectivesItem(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRetrospectivesItem(schoolId, data);
  }
  async updateRetrospectivesItem(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRetrospectivesItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRetrospectivesItem(schoolId, id, data);
  }
  async deleteRetrospectivesItem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRetrospectivesItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRetrospectivesItem(schoolId, id);
  }
  async countRetrospectivesItems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRetrospectivesItems(schoolId, filters);
  }
}
