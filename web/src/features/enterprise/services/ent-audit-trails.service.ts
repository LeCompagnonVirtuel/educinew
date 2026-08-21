// Enterprise Platform Service - AuditTrails
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAuditTrailService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAuditTrail(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAuditTrailById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAuditTrails(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAuditTrails(schoolId, filters);
  }
  async createAuditTrail(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAuditTrail(schoolId, data);
  }
  async updateAuditTrail(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAuditTrailById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAuditTrail(schoolId, id, data);
  }
  async deleteAuditTrail(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditTrailById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAuditTrail(schoolId, id);
  }
  async countAuditTrails(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuditTrails(schoolId, filters);
  }
}
