// Enterprise Platform Service - ErrorTrackingAssignments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntErrorAssignmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getErrorTrackingAssignment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findErrorTrackingAssignmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listErrorTrackingAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllErrorTrackingAssignments(schoolId, filters);
  }
  async createErrorTrackingAssignment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createErrorTrackingAssignment(schoolId, data);
  }
  async updateErrorTrackingAssignment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findErrorTrackingAssignmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateErrorTrackingAssignment(schoolId, id, data);
  }
  async deleteErrorTrackingAssignment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findErrorTrackingAssignmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteErrorTrackingAssignment(schoolId, id);
  }
  async countErrorTrackingAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countErrorTrackingAssignments(schoolId, filters);
  }
}
