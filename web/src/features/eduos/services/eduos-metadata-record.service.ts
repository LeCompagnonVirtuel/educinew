import type { SupabaseClient } from '@supabase/supabase-js';
import type { MetadataRecord } from '@educi/types';
import { EduOSMetadataRecordError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMetadataRecordService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMetadataRecord(schoolId: string, id: string): Promise<MetadataRecord> {
    const item = await this.repo.getMetadataRecord(schoolId, id);
    if (!item) throw new EduOSMetadataRecordError(id);
    return item;
  }
  async listMetadataRecords(schoolId: string, filters?: Record<string, unknown>): Promise<MetadataRecord[]> {
    return this.repo.listMetadataRecords(schoolId, filters);
  }
  async createMetadataRecord(schoolId: string, data: Partial<MetadataRecord>): Promise<MetadataRecord> {
    return this.repo.createMetadataRecord(schoolId, data as any);
  }
  async updateMetadataRecord(schoolId: string, id: string, data: Partial<MetadataRecord>): Promise<MetadataRecord> {
    const existing = await this.repo.getMetadataRecord(schoolId, id);
    if (!existing) throw new EduOSMetadataRecordError(id);
    return this.repo.updateMetadataRecord(schoolId, id, data as any);
  }
  async deleteMetadataRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMetadataRecord(schoolId, id);
    if (!existing) throw new EduOSMetadataRecordError(id);
    return this.repo.deleteMetadataRecord(schoolId, id);
  }
}

