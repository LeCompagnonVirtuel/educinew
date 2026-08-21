// Intelligence Platform Service - IntelligenceMonitoring
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceMonitoring, IntelligenceMonitoringCreate } from '@educi/types';
import { IntMonitoringNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntMonitoringService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getMonitoring(schoolId: string, id: string): Promise<IntelligenceMonitoring> {
    const item = await this.repo.getMonitoring(id, schoolId);
    if (!item) throw new IntMonitoringNotFoundError(id);
    return item;
  }
  async listMonitoringItems(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceMonitoring[]> {
    return this.repo.listMonitorings(schoolId, filters);
  }
  async createMonitoring(schoolId: string, data: IntelligenceMonitoringCreate): Promise<IntelligenceMonitoring> {
    return this.repo.createMonitoring({ ...data, school_id: schoolId });
  }
  async updateMonitoring(schoolId: string, id: string, data: Partial<IntelligenceMonitoringCreate>): Promise<IntelligenceMonitoring> {
    const existing = await this.repo.getMonitoring(id, schoolId);
    if (!existing) throw new IntMonitoringNotFoundError(id);
    return this.repo.updateMonitoring(id, schoolId, data);
  }
  async deleteMonitoring(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMonitoring(id, schoolId);
    if (!existing) throw new IntMonitoringNotFoundError(id);
    return this.repo.deleteMonitoring(id, schoolId);
  }
}
