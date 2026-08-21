// Enterprise Platform Service - Refunds
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRefundService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRefund(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRefundById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRefunds(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRefunds(schoolId, filters);
  }
  async createRefund(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRefund(schoolId, data);
  }
  async updateRefund(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRefundById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRefund(schoolId, id, data);
  }
  async deleteRefund(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRefundById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRefund(schoolId, id);
  }
  async countRefunds(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRefunds(schoolId, filters);
  }
}
