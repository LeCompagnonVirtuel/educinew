// Government & National Governance Service - InterCampusCommunication
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InterCampusCommunication, InterCampusCommunicationCreate } from '@educi/types';
import { GovInterCampusCommunicationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInterCampusCommunicationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInterCampusCommunication(schoolId: string, id: string): Promise<InterCampusCommunication> {
    const item = await this.repo.findInterCampusCommunicationById(schoolId, id);
    if (!item) throw new GovInterCampusCommunicationNotFoundError(id);
    return item;
  }

  async listInterCampusCommunications(schoolId: string, filters?: Record<string, unknown>): Promise<InterCampusCommunication[]> {
    return this.repo.findAllInterCampusCommunications(schoolId, filters);
  }

  async createInterCampusCommunication(schoolId: string, data: InterCampusCommunicationCreate): Promise<InterCampusCommunication> {
    return this.repo.createInterCampusCommunication(schoolId, data);
  }

  async updateInterCampusCommunication(schoolId: string, id: string, data: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication> {
    const existing = await this.repo.findInterCampusCommunicationById(schoolId, id);
    if (!existing) throw new GovInterCampusCommunicationNotFoundError(id);
    return this.repo.updateInterCampusCommunication(schoolId, id, data);
  }

  async deleteInterCampusCommunication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInterCampusCommunicationById(schoolId, id);
    if (!existing) throw new GovInterCampusCommunicationNotFoundError(id);
    return this.repo.deleteInterCampusCommunication(schoolId, id);
  }

  async countInterCampusCommunications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInterCampusCommunications(schoolId, filters);
  }
}
