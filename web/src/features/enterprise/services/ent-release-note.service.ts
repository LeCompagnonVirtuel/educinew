// Enterprise Platform Service - ReleaseNote
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReleaseNote, ReleaseNoteCreate } from '@educi/types';
import { EntReleaseNoteNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReleaseNoteService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReleaseNote(schoolId: string, id: string): Promise<ReleaseNote> {
    const item = await this.repo.findReleaseNoteById(schoolId, id);
    if (!item) throw new EntReleaseNoteNotFoundError(id);
    return item;
  }
  async listReleaseNotes(schoolId: string, filters?: Record<string, unknown>): Promise<ReleaseNote[]> {
    return this.repo.findAllReleaseNotes(schoolId, filters);
  }
  async createReleaseNote(schoolId: string, data: ReleaseNoteCreate): Promise<ReleaseNote> {
    return this.repo.createReleaseNote(schoolId, data);
  }
  async updateReleaseNote(schoolId: string, id: string, data: Partial<ReleaseNoteCreate>): Promise<ReleaseNote> {
    const existing = await this.repo.findReleaseNoteById(schoolId, id);
    if (!existing) throw new EntReleaseNoteNotFoundError(id);
    return this.repo.updateReleaseNote(schoolId, id, data);
  }
  async deleteReleaseNote(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReleaseNoteById(schoolId, id);
    if (!existing) throw new EntReleaseNoteNotFoundError(id);
    return this.repo.deleteReleaseNote(schoolId, id);
  }
  async countReleaseNotes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReleaseNotes(schoolId, filters);
  }
}
