// Government & National Governance Service - SchoolRating
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolRating, SchoolRatingCreate } from '@educi/types';
import { GovSchoolRatingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSchoolRatingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSchoolRating(schoolId: string, id: string): Promise<SchoolRating> {
    const item = await this.repo.findSchoolRatingById(schoolId, id);
    if (!item) throw new GovSchoolRatingNotFoundError(id);
    return item;
  }

  async listSchoolRatings(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRating[]> {
    return this.repo.findAllSchoolRatings(schoolId, filters);
  }

  async createSchoolRating(schoolId: string, data: SchoolRatingCreate): Promise<SchoolRating> {
    return this.repo.createSchoolRating(schoolId, data);
  }

  async updateSchoolRating(schoolId: string, id: string, data: Partial<SchoolRatingCreate>): Promise<SchoolRating> {
    const existing = await this.repo.findSchoolRatingById(schoolId, id);
    if (!existing) throw new GovSchoolRatingNotFoundError(id);
    return this.repo.updateSchoolRating(schoolId, id, data);
  }

  async deleteSchoolRating(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolRatingById(schoolId, id);
    if (!existing) throw new GovSchoolRatingNotFoundError(id);
    return this.repo.deleteSchoolRating(schoolId, id);
  }

  async countSchoolRatings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolRatings(schoolId, filters);
  }
}
