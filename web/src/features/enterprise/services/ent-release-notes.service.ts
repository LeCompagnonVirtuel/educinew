// Enterprise Platform Service - ReleaseNotes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReleaseNoteService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReleaseNote(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReleaseNoteById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReleaseNotes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReleaseNotes(schoolId, filters);
  }
  async createReleaseNote(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReleaseNote(schoolId, data);
  }
  async updateReleaseNote(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReleaseNoteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReleaseNote(schoolId, id, data);
  }
  async deleteReleaseNote(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReleaseNoteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReleaseNote(schoolId, id);
  }
  async countReleaseNotes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReleaseNotes(schoolId, filters);
  }
}
