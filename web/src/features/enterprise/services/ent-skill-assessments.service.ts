// Enterprise Platform Service - SkillAssessments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSkillAssessmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSkillAssessment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSkillAssessmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSkillAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSkillAssessments(schoolId, filters);
  }
  async createSkillAssessment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSkillAssessment(schoolId, data);
  }
  async updateSkillAssessment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSkillAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSkillAssessment(schoolId, id, data);
  }
  async deleteSkillAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSkillAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSkillAssessment(schoolId, id);
  }
  async countSkillAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSkillAssessments(schoolId, filters);
  }
}
