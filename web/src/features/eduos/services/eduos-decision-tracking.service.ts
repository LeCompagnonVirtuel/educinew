import type { SupabaseClient } from '@supabase/supabase-js';
import type { DecisionTracking } from '@educi/types';
import { EduOSDecisionTrackingError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDecisionTrackingService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDecisionTracking(schoolId: string, id: string): Promise<DecisionTracking> {
    const item = await this.repo.getDecisionTracking(schoolId, id);
    if (!item) throw new EduOSDecisionTrackingError(id);
    return item;
  }
  async listDecisionTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<DecisionTracking[]> {
    return this.repo.listDecisionTrackings(schoolId, filters);
  }
  async createDecisionTracking(schoolId: string, data: Partial<DecisionTracking>): Promise<DecisionTracking> {
    return this.repo.createDecisionTracking(schoolId, data as any);
  }
  async updateDecisionTracking(schoolId: string, id: string, data: Partial<DecisionTracking>): Promise<DecisionTracking> {
    const existing = await this.repo.getDecisionTracking(schoolId, id);
    if (!existing) throw new EduOSDecisionTrackingError(id);
    return this.repo.updateDecisionTracking(schoolId, id, data as any);
  }
  async deleteDecisionTracking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDecisionTracking(schoolId, id);
    if (!existing) throw new EduOSDecisionTrackingError(id);
    return this.repo.deleteDecisionTracking(schoolId, id);
  }
}

