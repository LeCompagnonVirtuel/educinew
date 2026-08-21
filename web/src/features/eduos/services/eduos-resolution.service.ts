import type { SupabaseClient } from '@supabase/supabase-js';
import type { Resolution } from '@educi/types';
import { EduOSResolutionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSResolutionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getResolution(schoolId: string, id: string): Promise<Resolution> {
    const item = await this.repo.getResolution(schoolId, id);
    if (!item) throw new EduOSResolutionError(id);
    return item;
  }
  async listResolutions(schoolId: string, filters?: Record<string, unknown>): Promise<Resolution[]> {
    return this.repo.listResolutions(schoolId, filters);
  }
  async createResolution(schoolId: string, data: Partial<Resolution>): Promise<Resolution> {
    return this.repo.createResolution(schoolId, data as any);
  }
  async updateResolution(schoolId: string, id: string, data: Partial<Resolution>): Promise<Resolution> {
    const existing = await this.repo.getResolution(schoolId, id);
    if (!existing) throw new EduOSResolutionError(id);
    return this.repo.updateResolution(schoolId, id, data as any);
  }
  async deleteResolution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getResolution(schoolId, id);
    if (!existing) throw new EduOSResolutionError(id);
    return this.repo.deleteResolution(schoolId, id);
  }
}

