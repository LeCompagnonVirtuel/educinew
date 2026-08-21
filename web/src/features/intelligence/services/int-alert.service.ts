// Intelligence Platform Service - AIAlert
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIAlert, AIAlertCreate } from '@educi/types';
import { IntAlertNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntAlertService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getAlert(schoolId: string, id: string): Promise<AIAlert> {
    const item = await this.repo.getAlert(id, schoolId);
    if (!item) throw new IntAlertNotFoundError(id);
    return item;
  }
  async listAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<AIAlert[]> {
    return this.repo.listAlerts(schoolId, filters);
  }
  async createAlert(schoolId: string, data: AIAlertCreate): Promise<AIAlert> {
    return this.repo.createAlert({ ...data, school_id: schoolId });
  }
  async updateAlert(schoolId: string, id: string, data: Partial<AIAlertCreate>): Promise<AIAlert> {
    const existing = await this.repo.getAlert(id, schoolId);
    if (!existing) throw new IntAlertNotFoundError(id);
    return this.repo.updateAlert(id, schoolId, data);
  }
  async deleteAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAlert(id, schoolId);
    if (!existing) throw new IntAlertNotFoundError(id);
    return this.repo.deleteAlert(id, schoolId);
  }
}
