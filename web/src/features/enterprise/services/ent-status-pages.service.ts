// Enterprise Platform Service - StatusPages
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStatusPageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStatusPage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStatusPageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStatusPages(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStatusPages(schoolId, filters);
  }
  async createStatusPage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStatusPage(schoolId, data);
  }
  async updateStatusPage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStatusPageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStatusPage(schoolId, id, data);
  }
  async deleteStatusPage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStatusPageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStatusPage(schoolId, id);
  }
  async countStatusPages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStatusPages(schoolId, filters);
  }
}
