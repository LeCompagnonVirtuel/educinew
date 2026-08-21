import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIMonitoring } from '@educi/types';
import { EduOSAIMonitoringError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAIMonitoringService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAIMonitoring(schoolId: string, id: string): Promise<AIMonitoring> {
    const item = await this.repo.getAIMonitoring(schoolId, id);
    if (!item) throw new EduOSAIMonitoringError(id);
    return item;
  }
  async listAIMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<AIMonitoring[]> {
    return this.repo.listAIMonitorings(schoolId, filters);
  }
  async createAIMonitoring(schoolId: string, data: Partial<AIMonitoring>): Promise<AIMonitoring> {
    return this.repo.createAIMonitoring(schoolId, data as any);
  }
  async updateAIMonitoring(schoolId: string, id: string, data: Partial<AIMonitoring>): Promise<AIMonitoring> {
    const existing = await this.repo.getAIMonitoring(schoolId, id);
    if (!existing) throw new EduOSAIMonitoringError(id);
    return this.repo.updateAIMonitoring(schoolId, id, data as any);
  }
  async deleteAIMonitoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAIMonitoring(schoolId, id);
    if (!existing) throw new EduOSAIMonitoringError(id);
    return this.repo.deleteAIMonitoring(schoolId, id);
  }
}

