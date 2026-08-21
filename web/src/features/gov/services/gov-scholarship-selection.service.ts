// Government & National Governance Service - ScholarshipSelection
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScholarshipSelection, ScholarshipSelectionCreate } from '@educi/types';
import { GovScholarshipSelectionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovScholarshipSelectionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getScholarshipSelection(schoolId: string, id: string): Promise<ScholarshipSelection> {
    const item = await this.repo.findScholarshipSelectionById(schoolId, id);
    if (!item) throw new GovScholarshipSelectionNotFoundError(id);
    return item;
  }

  async listScholarshipSelections(schoolId: string, filters?: Record<string, unknown>): Promise<ScholarshipSelection[]> {
    return this.repo.findAllScholarshipSelections(schoolId, filters);
  }

  async createScholarshipSelection(schoolId: string, data: ScholarshipSelectionCreate): Promise<ScholarshipSelection> {
    return this.repo.createScholarshipSelection(schoolId, data);
  }

  async updateScholarshipSelection(schoolId: string, id: string, data: Partial<ScholarshipSelectionCreate>): Promise<ScholarshipSelection> {
    const existing = await this.repo.findScholarshipSelectionById(schoolId, id);
    if (!existing) throw new GovScholarshipSelectionNotFoundError(id);
    return this.repo.updateScholarshipSelection(schoolId, id, data);
  }

  async deleteScholarshipSelection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findScholarshipSelectionById(schoolId, id);
    if (!existing) throw new GovScholarshipSelectionNotFoundError(id);
    return this.repo.deleteScholarshipSelection(schoolId, id);
  }

  async countScholarshipSelections(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countScholarshipSelections(schoolId, filters);
  }
}
