// Enterprise Platform Service - AlertEscalation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertEscalation, AlertEscalationCreate } from '@educi/types';
import { EntAlertEscalationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAlertEscalationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAlertEscalation(schoolId: string, id: string): Promise<AlertEscalation> {
    const item = await this.repo.findAlertEscalationById(schoolId, id);
    if (!item) throw new EntAlertEscalationNotFoundError(id);
    return item;
  }
  async listAlertEscalations(schoolId: string, filters?: Record<string, unknown>): Promise<AlertEscalation[]> {
    return this.repo.findAllAlertEscalations(schoolId, filters);
  }
  async createAlertEscalation(schoolId: string, data: AlertEscalationCreate): Promise<AlertEscalation> {
    return this.repo.createAlertEscalation(schoolId, data);
  }
  async updateAlertEscalation(schoolId: string, id: string, data: Partial<AlertEscalationCreate>): Promise<AlertEscalation> {
    const existing = await this.repo.findAlertEscalationById(schoolId, id);
    if (!existing) throw new EntAlertEscalationNotFoundError(id);
    return this.repo.updateAlertEscalation(schoolId, id, data);
  }
  async deleteAlertEscalation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAlertEscalationById(schoolId, id);
    if (!existing) throw new EntAlertEscalationNotFoundError(id);
    return this.repo.deleteAlertEscalation(schoolId, id);
  }
  async countAlertEscalations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAlertEscalations(schoolId, filters);
  }
}
