// Enterprise Platform Service - SprintBoardsColumns
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSprintColumnService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSprintBoardsColumn(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSprintBoardsColumnById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSprintBoardsColumns(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSprintBoardsColumns(schoolId, filters);
  }
  async createSprintBoardsColumn(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSprintBoardsColumn(schoolId, data);
  }
  async updateSprintBoardsColumn(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSprintBoardsColumnById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSprintBoardsColumn(schoolId, id, data);
  }
  async deleteSprintBoardsColumn(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSprintBoardsColumnById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSprintBoardsColumn(schoolId, id);
  }
  async countSprintBoardsColumns(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSprintBoardsColumns(schoolId, filters);
  }
}
