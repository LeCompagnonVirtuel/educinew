// Government & National Governance Service - SmsService
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SmsService, SmsServiceCreate } from '@educi/types';
import { GovSmsServiceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSmsServiceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSmsService(schoolId: string, id: string): Promise<SmsService> {
    const item = await this.repo.findSmsServiceById(schoolId, id);
    if (!item) throw new GovSmsServiceNotFoundError(id);
    return item;
  }

  async listSmsServices(schoolId: string, filters?: Record<string, unknown>): Promise<SmsService[]> {
    return this.repo.findAllSmsServices(schoolId, filters);
  }

  async createSmsService(schoolId: string, data: SmsServiceCreate): Promise<SmsService> {
    return this.repo.createSmsService(schoolId, data);
  }

  async updateSmsService(schoolId: string, id: string, data: Partial<SmsServiceCreate>): Promise<SmsService> {
    const existing = await this.repo.findSmsServiceById(schoolId, id);
    if (!existing) throw new GovSmsServiceNotFoundError(id);
    return this.repo.updateSmsService(schoolId, id, data);
  }

  async deleteSmsService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSmsServiceById(schoolId, id);
    if (!existing) throw new GovSmsServiceNotFoundError(id);
    return this.repo.deleteSmsService(schoolId, id);
  }

  async countSmsServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSmsServices(schoolId, filters);
  }
}
