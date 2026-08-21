// Enterprise Platform Service - GdprRequests
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGdprRequestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGdprRequest(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findGdprRequestById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listGdprRequests(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllGdprRequests(schoolId, filters);
  }
  async createGdprRequest(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createGdprRequest(schoolId, data);
  }
  async updateGdprRequest(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findGdprRequestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateGdprRequest(schoolId, id, data);
  }
  async deleteGdprRequest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGdprRequestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteGdprRequest(schoolId, id);
  }
  async countGdprRequests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGdprRequests(schoolId, filters);
  }
}
