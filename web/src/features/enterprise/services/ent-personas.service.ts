// Enterprise Platform Service - Personas
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPersonaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPersona(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPersonaById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPersonas(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPersonas(schoolId, filters);
  }
  async createPersona(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPersona(schoolId, data);
  }
  async updatePersona(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPersonaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePersona(schoolId, id, data);
  }
  async deletePersona(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPersonaById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePersona(schoolId, id);
  }
  async countPersonas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPersonas(schoolId, filters);
  }
}
