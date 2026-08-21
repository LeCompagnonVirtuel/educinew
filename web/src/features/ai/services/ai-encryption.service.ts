import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiEncryption, AiEncryptionQuery, AiEncryptionCreate, AiEncryptionUpdate } from '@educi/types';
import { AiEncryptionNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiEncryptionService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getEncryption(schoolId: string, id: string): Promise<AiEncryption> {
    const encryption = await this.repo.findById(schoolId, id);
    if (!encryption) throw new AiEncryptionNotFoundError(id);
    return encryption;
  }

  async listEncryptions(schoolId: string, query: AiEncryptionQuery): Promise<AiEncryption[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createEncryption(schoolId: string, data: AiEncryptionCreate): Promise<AiEncryption> {
    return this.repo.create(schoolId, data);
  }

  async updateEncryption(schoolId: string, id: string, data: AiEncryptionUpdate): Promise<AiEncryption> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiEncryptionNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
