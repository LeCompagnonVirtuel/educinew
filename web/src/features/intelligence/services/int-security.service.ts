// Intelligence Platform Service - IntelligenceSecurity
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceSecurity, IntelligenceSecurityCreate } from '@educi/types';
import { IntSecurityNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntSecurityService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getSecurity(schoolId: string, id: string): Promise<IntelligenceSecurity> {
    const item = await this.repo.getSecurity(id, schoolId);
    if (!item) throw new IntSecurityNotFoundError(id);
    return item;
  }
  async listSecurityItems(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceSecurity[]> {
    return this.repo.listSecurities(schoolId, filters);
  }
  async createSecurity(schoolId: string, data: IntelligenceSecurityCreate): Promise<IntelligenceSecurity> {
    return this.repo.createSecurity({ ...data, school_id: schoolId });
  }
  async updateSecurity(schoolId: string, id: string, data: Partial<IntelligenceSecurityCreate>): Promise<IntelligenceSecurity> {
    const existing = await this.repo.getSecurity(id, schoolId);
    if (!existing) throw new IntSecurityNotFoundError(id);
    return this.repo.updateSecurity(id, schoolId, data);
  }
  async deleteSecurity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecurity(id, schoolId);
    if (!existing) throw new IntSecurityNotFoundError(id);
    return this.repo.deleteSecurity(id, schoolId);
  }
}
