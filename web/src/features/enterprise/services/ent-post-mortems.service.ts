// Enterprise Platform Service - PostMortems
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPostMortemService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPostMortem(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPostMortemById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPostMortems(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPostMortems(schoolId, filters);
  }
  async createPostMortem(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPostMortem(schoolId, data);
  }
  async updatePostMortem(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPostMortemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePostMortem(schoolId, id, data);
  }
  async deletePostMortem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPostMortemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePostMortem(schoolId, id);
  }
  async countPostMortems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPostMortems(schoolId, filters);
  }
}
