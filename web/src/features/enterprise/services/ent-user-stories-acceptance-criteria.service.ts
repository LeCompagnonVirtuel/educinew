// Enterprise Platform Service - UserStoriesAcceptanceCriteria
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAcceptanceCriterionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUserStoriesAcceptanceCriteria(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUserStoriesAcceptanceCriteriaById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUserStoriesAcceptanceCriteria(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUserStoriesAcceptanceCriteria(schoolId, filters);
  }
  async createUserStoriesAcceptanceCriteria(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUserStoriesAcceptanceCriteria(schoolId, data);
  }
  async updateUserStoriesAcceptanceCriteria(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUserStoriesAcceptanceCriteriaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUserStoriesAcceptanceCriteria(schoolId, id, data);
  }
  async deleteUserStoriesAcceptanceCriteria(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUserStoriesAcceptanceCriteriaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUserStoriesAcceptanceCriteria(schoolId, id);
  }
  async countUserStoriesAcceptanceCriteria(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUserStoriesAcceptanceCriteria(schoolId, filters);
  }
}
