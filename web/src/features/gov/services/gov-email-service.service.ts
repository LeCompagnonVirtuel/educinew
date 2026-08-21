// Government & National Governance Service - EmailService
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmailService, EmailServiceCreate } from '@educi/types';
import { GovEmailServiceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmailServiceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEmailService(schoolId: string, id: string): Promise<EmailService> {
    const item = await this.repo.findEmailServiceById(schoolId, id);
    if (!item) throw new GovEmailServiceNotFoundError(id);
    return item;
  }

  async listEmailServices(schoolId: string, filters?: Record<string, unknown>): Promise<EmailService[]> {
    return this.repo.findAllEmailServices(schoolId, filters);
  }

  async createEmailService(schoolId: string, data: EmailServiceCreate): Promise<EmailService> {
    return this.repo.createEmailService(schoolId, data);
  }

  async updateEmailService(schoolId: string, id: string, data: Partial<EmailServiceCreate>): Promise<EmailService> {
    const existing = await this.repo.findEmailServiceById(schoolId, id);
    if (!existing) throw new GovEmailServiceNotFoundError(id);
    return this.repo.updateEmailService(schoolId, id, data);
  }

  async deleteEmailService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEmailServiceById(schoolId, id);
    if (!existing) throw new GovEmailServiceNotFoundError(id);
    return this.repo.deleteEmailService(schoolId, id);
  }

  async countEmailServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEmailServices(schoolId, filters);
  }
}
