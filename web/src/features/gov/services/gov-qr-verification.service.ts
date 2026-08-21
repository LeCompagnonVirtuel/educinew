// Government & National Governance Service - QrVerification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { QrVerification, QrVerificationCreate } from '@educi/types';
import { GovQrVerificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovQrVerificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getQrVerification(schoolId: string, id: string): Promise<QrVerification> {
    const item = await this.repo.findQrVerificationById(schoolId, id);
    if (!item) throw new GovQrVerificationNotFoundError(id);
    return item;
  }

  async listQrVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<QrVerification[]> {
    return this.repo.findAllQrVerifications(schoolId, filters);
  }

  async createQrVerification(schoolId: string, data: QrVerificationCreate): Promise<QrVerification> {
    return this.repo.createQrVerification(schoolId, data);
  }

  async updateQrVerification(schoolId: string, id: string, data: Partial<QrVerificationCreate>): Promise<QrVerification> {
    const existing = await this.repo.findQrVerificationById(schoolId, id);
    if (!existing) throw new GovQrVerificationNotFoundError(id);
    return this.repo.updateQrVerification(schoolId, id, data);
  }

  async deleteQrVerification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQrVerificationById(schoolId, id);
    if (!existing) throw new GovQrVerificationNotFoundError(id);
    return this.repo.deleteQrVerification(schoolId, id);
  }

  async countQrVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQrVerifications(schoolId, filters);
  }
}
