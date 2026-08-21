// Government & National Governance Service - Academy
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Academy, AcademyCreate } from '@educi/types';
import { GovAcademyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAcademyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAcademy(schoolId: string, id: string): Promise<Academy> {
    const item = await this.repo.findAcademyById(schoolId, id);
    if (!item) throw new GovAcademyNotFoundError(id);
    return item;
  }

  async listAcademies(schoolId: string, filters?: Record<string, unknown>): Promise<Academy[]> {
    return this.repo.findAllAcademies(schoolId, filters);
  }

  async createAcademy(schoolId: string, data: AcademyCreate): Promise<Academy> {
    return this.repo.createAcademy(schoolId, data);
  }

  async updateAcademy(schoolId: string, id: string, data: Partial<AcademyCreate>): Promise<Academy> {
    const existing = await this.repo.findAcademyById(schoolId, id);
    if (!existing) throw new GovAcademyNotFoundError(id);
    return this.repo.updateAcademy(schoolId, id, data);
  }

  async deleteAcademy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAcademyById(schoolId, id);
    if (!existing) throw new GovAcademyNotFoundError(id);
    return this.repo.deleteAcademy(schoolId, id);
  }

  async countAcademies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAcademies(schoolId, filters);
  }
}
