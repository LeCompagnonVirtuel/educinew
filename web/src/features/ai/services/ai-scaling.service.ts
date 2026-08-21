import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiScaling, AiScalingQuery, AiScalingCreate, AiScalingUpdate } from '@educi/types';
import { AiScalingNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiScalingService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getScaling(schoolId: string, id: string): Promise<AiScaling> {
    const scaling = await this.repo.findById(schoolId, id);
    if (!scaling) throw new AiScalingNotFoundError(id);
    return scaling;
  }

  async listScaling(schoolId: string, query: AiScalingQuery): Promise<AiScaling[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createScaling(schoolId: string, data: AiScalingCreate): Promise<AiScaling> {
    return this.repo.create(schoolId, data);
  }

  async updateScaling(schoolId: string, id: string, data: AiScalingUpdate): Promise<AiScaling> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiScalingNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
