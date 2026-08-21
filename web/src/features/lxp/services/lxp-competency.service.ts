import type { SupabaseClient } from '@supabase/supabase-js';
import type { Competency } from '@educi/types';
import { LxpCompetencyNotFoundError, LxpCompetencyCreateError, LxpCompetencyAssessError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCompetencyService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getCompetency(schoolId: string, id: string): Promise<Competency> {
    const competency = await this.repo.findCompetencyById(schoolId, id);
    if (!competency) throw new LxpCompetencyNotFoundError(id);
    return competency;
  }

  async listCompetencies(schoolId: string): Promise<readonly Competency[]> {
    return this.repo.findCompetencies(schoolId);
  }

  async createCompetency(data: Omit<Competency, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>): Promise<Competency> {
    const created = await this.repo.createCompetency(data);
    if (!created) throw new LxpCompetencyCreateError();
    return created;
  }

  async assessCompetency(schoolId: string, id: string, userId: string, score: number): Promise<boolean> {
    const existing = await this.repo.findCompetencyById(schoolId, id);
    if (!existing) throw new LxpCompetencyNotFoundError(id);
    const result = await this.repo.assessUserCompetency(id, userId, score);
    if (!result) throw new LxpCompetencyAssessError();
    return result;
  }

  async deleteCompetency(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCompetencyById(schoolId, id);
    if (!existing) throw new LxpCompetencyNotFoundError(id);
    await this.repo.deleteCompetency(id);
  }
}
