// Enterprise Platform Service - SecurityIncidentsResponses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentResponseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecurityIncidentsResponse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecurityIncidentsResponseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecurityIncidentsResponses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecurityIncidentsResponses(schoolId, filters);
  }
  async createSecurityIncidentsResponse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecurityIncidentsResponse(schoolId, data);
  }
  async updateSecurityIncidentsResponse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecurityIncidentsResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecurityIncidentsResponse(schoolId, id, data);
  }
  async deleteSecurityIncidentsResponse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecurityIncidentsResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecurityIncidentsResponse(schoolId, id);
  }
  async countSecurityIncidentsResponses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecurityIncidentsResponses(schoolId, filters);
  }
}
