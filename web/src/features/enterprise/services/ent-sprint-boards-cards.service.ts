// Enterprise Platform Service - SprintBoardsCards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSprintCardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSprintBoardsCard(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSprintBoardsCardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSprintBoardsCards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSprintBoardsCards(schoolId, filters);
  }
  async createSprintBoardsCard(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSprintBoardsCard(schoolId, data);
  }
  async updateSprintBoardsCard(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSprintBoardsCardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSprintBoardsCard(schoolId, id, data);
  }
  async deleteSprintBoardsCard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSprintBoardsCardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSprintBoardsCard(schoolId, id);
  }
  async countSprintBoardsCards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSprintBoardsCards(schoolId, filters);
  }
}
