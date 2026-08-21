import type { SupabaseClient } from '@supabase/supabase-js';
import type { Audiobook, AudiobookCreate } from '@educi/types';
import { ScAudiobookNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAudiobookService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAudiobook(schoolId: string, id: string): Promise<Audiobook> {
    const audiobook = await this.repo.findAudiobookById(schoolId, id);
    if (!audiobook) throw new ScAudiobookNotFoundError(id);
    return audiobook;
  }

  async listAudiobooks(schoolId: string, filters?: Record<string, unknown>): Promise<Audiobook[]> {
    return this.repo.findAllAudiobooks(schoolId, filters);
  }

  async createAudiobook(schoolId: string, data: AudiobookCreate): Promise<Audiobook> {
    return this.repo.createAudiobook(schoolId, data);
  }

  async updateAudiobook(schoolId: string, id: string, data: Partial<AudiobookCreate>): Promise<Audiobook> {
    const existing = await this.repo.findAudiobookById(schoolId, id);
    if (!existing) throw new ScAudiobookNotFoundError(id);
    return this.repo.updateAudiobook(schoolId, id, data);
  }

  async deleteAudiobook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAudiobookById(schoolId, id);
    if (!existing) throw new ScAudiobookNotFoundError(id);
    return this.repo.deleteAudiobook(schoolId, id);
  }

  async countAudiobooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAudiobooks(schoolId, filters);
  }
}
