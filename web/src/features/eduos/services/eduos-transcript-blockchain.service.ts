import type { SupabaseClient } from '@supabase/supabase-js';
import type { TranscriptBlockchain } from '@educi/types';
import { EduOSTranscriptBlockchainError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSTranscriptBlockchainService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getTranscriptBlockchain(schoolId: string, id: string): Promise<TranscriptBlockchain> {
    const item = await this.repo.getTranscriptBlockchain(schoolId, id);
    if (!item) throw new EduOSTranscriptBlockchainError(id);
    return item;
  }
  async listTranscriptBlockchains(schoolId: string, filters?: Record<string, unknown>): Promise<TranscriptBlockchain[]> {
    return this.repo.listTranscriptBlockchains(schoolId, filters);
  }
  async createTranscriptBlockchain(schoolId: string, data: Partial<TranscriptBlockchain>): Promise<TranscriptBlockchain> {
    return this.repo.createTranscriptBlockchain(schoolId, data as any);
  }
  async updateTranscriptBlockchain(schoolId: string, id: string, data: Partial<TranscriptBlockchain>): Promise<TranscriptBlockchain> {
    const existing = await this.repo.getTranscriptBlockchain(schoolId, id);
    if (!existing) throw new EduOSTranscriptBlockchainError(id);
    return this.repo.updateTranscriptBlockchain(schoolId, id, data as any);
  }
  async deleteTranscriptBlockchain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTranscriptBlockchain(schoolId, id);
    if (!existing) throw new EduOSTranscriptBlockchainError(id);
    return this.repo.deleteTranscriptBlockchain(schoolId, id);
  }
}

