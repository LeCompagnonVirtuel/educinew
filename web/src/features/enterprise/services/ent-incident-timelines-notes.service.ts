// Enterprise Platform Service - IncidentTimelinesNotes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentNoteService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIncidentTimelinesNote(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIncidentTimelinesNoteById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIncidentTimelinesNotes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIncidentTimelinesNotes(schoolId, filters);
  }
  async createIncidentTimelinesNote(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIncidentTimelinesNote(schoolId, data);
  }
  async updateIncidentTimelinesNote(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIncidentTimelinesNoteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIncidentTimelinesNote(schoolId, id, data);
  }
  async deleteIncidentTimelinesNote(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIncidentTimelinesNoteById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIncidentTimelinesNote(schoolId, id);
  }
  async countIncidentTimelinesNotes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIncidentTimelinesNotes(schoolId, filters);
  }
}
