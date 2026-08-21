// Enterprise Platform Service - VendorAssessments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVendorAssessmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVendorAssessment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findVendorAssessmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listVendorAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllVendorAssessments(schoolId, filters);
  }
  async createVendorAssessment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createVendorAssessment(schoolId, data);
  }
  async updateVendorAssessment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findVendorAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateVendorAssessment(schoolId, id, data);
  }
  async deleteVendorAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVendorAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteVendorAssessment(schoolId, id);
  }
  async countVendorAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVendorAssessments(schoolId, filters);
  }
}
