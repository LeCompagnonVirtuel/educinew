// Enterprise Platform Service - UserStories
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserStoryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUserStorie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUserStorieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUserStories(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUserStories(schoolId, filters);
  }
  async createUserStorie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUserStorie(schoolId, data);
  }
  async updateUserStorie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUserStorieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUserStorie(schoolId, id, data);
  }
  async deleteUserStorie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUserStorieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUserStorie(schoolId, id);
  }
  async countUserStories(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUserStories(schoolId, filters);
  }
}
