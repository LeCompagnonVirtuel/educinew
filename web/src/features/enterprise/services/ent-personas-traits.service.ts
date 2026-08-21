// Enterprise Platform Service - PersonasTraits
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPersonaTraitService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPersonasTrait(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPersonasTraitById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPersonasTraits(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPersonasTraits(schoolId, filters);
  }
  async createPersonasTrait(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPersonasTrait(schoolId, data);
  }
  async updatePersonasTrait(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPersonasTraitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePersonasTrait(schoolId, id, data);
  }
  async deletePersonasTrait(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPersonasTraitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePersonasTrait(schoolId, id);
  }
  async countPersonasTraits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPersonasTraits(schoolId, filters);
  }
}
