// Enterprise Platform Service - Branding
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBrandingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBranding(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBrandingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBranding(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBranding(schoolId, filters);
  }
  async createBranding(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBranding(schoolId, data);
  }
  async updateBranding(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBrandingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBranding(schoolId, id, data);
  }
  async deleteBranding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBrandingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBranding(schoolId, id);
  }
  async countBranding(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBranding(schoolId, filters);
  }
}
