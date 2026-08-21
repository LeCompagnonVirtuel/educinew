// Government & National Governance Service - IdentityEnrollment
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityEnrollment, IdentityEnrollmentCreate } from '@educi/types';
import { GovIdentityEnrollmentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityEnrollmentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityEnrollment(schoolId: string, id: string): Promise<IdentityEnrollment> {
    const item = await this.repo.findIdentityEnrollmentById(schoolId, id);
    if (!item) throw new GovIdentityEnrollmentNotFoundError(id);
    return item;
  }

  async listIdentityEnrollments(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityEnrollment[]> {
    return this.repo.findAllIdentityEnrollments(schoolId, filters);
  }

  async createIdentityEnrollment(schoolId: string, data: IdentityEnrollmentCreate): Promise<IdentityEnrollment> {
    return this.repo.createIdentityEnrollment(schoolId, data);
  }

  async updateIdentityEnrollment(schoolId: string, id: string, data: Partial<IdentityEnrollmentCreate>): Promise<IdentityEnrollment> {
    const existing = await this.repo.findIdentityEnrollmentById(schoolId, id);
    if (!existing) throw new GovIdentityEnrollmentNotFoundError(id);
    return this.repo.updateIdentityEnrollment(schoolId, id, data);
  }

  async deleteIdentityEnrollment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityEnrollmentById(schoolId, id);
    if (!existing) throw new GovIdentityEnrollmentNotFoundError(id);
    return this.repo.deleteIdentityEnrollment(schoolId, id);
  }

  async countIdentityEnrollments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityEnrollments(schoolId, filters);
  }
}
