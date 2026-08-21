import type { SupabaseClient } from '@supabase/supabase-js';
import type { ETLTransformation } from '@educi/types';
import { EduOSETLTransformationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSETLTransformationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getETLTransformation(schoolId: string, id: string): Promise<ETLTransformation> {
    const item = await this.repo.getETLTransformation(schoolId, id);
    if (!item) throw new EduOSETLTransformationError(id);
    return item;
  }
  async listETLTransformations(schoolId: string, filters?: Record<string, unknown>): Promise<ETLTransformation[]> {
    return this.repo.listETLTransformations(schoolId, filters);
  }
  async createETLTransformation(schoolId: string, data: Partial<ETLTransformation>): Promise<ETLTransformation> {
    return this.repo.createETLTransformation(schoolId, data as any);
  }
  async updateETLTransformation(schoolId: string, id: string, data: Partial<ETLTransformation>): Promise<ETLTransformation> {
    const existing = await this.repo.getETLTransformation(schoolId, id);
    if (!existing) throw new EduOSETLTransformationError(id);
    return this.repo.updateETLTransformation(schoolId, id, data as any);
  }
  async deleteETLTransformation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getETLTransformation(schoolId, id);
    if (!existing) throw new EduOSETLTransformationError(id);
    return this.repo.deleteETLTransformation(schoolId, id);
  }
}

