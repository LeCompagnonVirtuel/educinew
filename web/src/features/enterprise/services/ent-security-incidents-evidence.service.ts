// Enterprise Platform Service - SecurityIncidentsEvidence
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentEvidenceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityIncidentsEvidence(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecurityIncidentsEvidenceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecurityIncidentsEvidence(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecurityIncidentsEvidence(schoolId, filters);
  }
  async createSecurityIncidentsEvidence(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecurityIncidentsEvidence(schoolId, data);
  }
  async updateSecurityIncidentsEvidence(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecurityIncidentsEvidenceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecurityIncidentsEvidence(schoolId, id, data);
  }
  async deleteSecurityIncidentsEvidence(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityIncidentsEvidenceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecurityIncidentsEvidence(schoolId, id);
  }
  async countSecurityIncidentsEvidence(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityIncidentsEvidence(schoolId, filters);
  }
}
