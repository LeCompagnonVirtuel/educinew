import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiStorage, AiStorageQuery, AiStorageCreate, AiStorageUpdate } from '@educi/types';
import { AiStorageNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiStorageService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getStorageItem(schoolId: string, id: string): Promise<AiStorage> {
    const item = await this.repo.findById(schoolId, id);
    if (!item) throw new AiStorageNotFoundError(id);
    return item;
  }

  async listStorageItems(schoolId: string, query: AiStorageQuery): Promise<AiStorage[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createStorageItem(schoolId: string, data: AiStorageCreate): Promise<AiStorage> {
    return this.repo.create(schoolId, data);
  }

  async updateStorageItem(schoolId: string, id: string, data: AiStorageUpdate): Promise<AiStorage> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiStorageNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteStorageItem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiStorageNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
