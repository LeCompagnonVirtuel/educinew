import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataStream } from '@educi/types';
import { EduOSDataStreamError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataStreamService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataStream(schoolId: string, id: string): Promise<DataStream> {
    const item = await this.repo.getDataStream(schoolId, id);
    if (!item) throw new EduOSDataStreamError(id);
    return item;
  }
  async listDataStreams(schoolId: string, filters?: Record<string, unknown>): Promise<DataStream[]> {
    return this.repo.listDataStreams(schoolId, filters);
  }
  async createDataStream(schoolId: string, data: Partial<DataStream>): Promise<DataStream> {
    return this.repo.createDataStream(schoolId, data as any);
  }
  async updateDataStream(schoolId: string, id: string, data: Partial<DataStream>): Promise<DataStream> {
    const existing = await this.repo.getDataStream(schoolId, id);
    if (!existing) throw new EduOSDataStreamError(id);
    return this.repo.updateDataStream(schoolId, id, data as any);
  }
  async deleteDataStream(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataStream(schoolId, id);
    if (!existing) throw new EduOSDataStreamError(id);
    return this.repo.deleteDataStream(schoolId, id);
  }
}

