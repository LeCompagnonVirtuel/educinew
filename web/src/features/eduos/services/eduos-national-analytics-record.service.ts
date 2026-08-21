import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalAnalyticsRecord } from '@educi/types';
import { EduOSNationalAnalyticsRecordError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSNationalAnalyticsRecordService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getNationalAnalyticsRecord(schoolId: string, id: string): Promise<NationalAnalyticsRecord> {
    const item = await this.repo.getNationalAnalyticsRecord(schoolId, id);
    if (!item) throw new EduOSNationalAnalyticsRecordError(id);
    return item;
  }
  async listNationalAnalyticsRecords(schoolId: string, filters?: Record<string, unknown>): Promise<NationalAnalyticsRecord[]> {
    return this.repo.listNationalAnalyticsRecords(schoolId, filters);
  }
  async createNationalAnalyticsRecord(schoolId: string, data: Partial<NationalAnalyticsRecord>): Promise<NationalAnalyticsRecord> {
    return this.repo.createNationalAnalyticsRecord(schoolId, data as any);
  }
  async updateNationalAnalyticsRecord(schoolId: string, id: string, data: Partial<NationalAnalyticsRecord>): Promise<NationalAnalyticsRecord> {
    const existing = await this.repo.getNationalAnalyticsRecord(schoolId, id);
    if (!existing) throw new EduOSNationalAnalyticsRecordError(id);
    return this.repo.updateNationalAnalyticsRecord(schoolId, id, data as any);
  }
  async deleteNationalAnalyticsRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNationalAnalyticsRecord(schoolId, id);
    if (!existing) throw new EduOSNationalAnalyticsRecordError(id);
    return this.repo.deleteNationalAnalyticsRecord(schoolId, id);
  }
}

