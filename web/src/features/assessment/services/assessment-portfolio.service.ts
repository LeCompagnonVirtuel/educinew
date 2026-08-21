import type { SupabaseClient } from '@supabase/supabase-js';
import type { Portfolio, PortfolioCreate } from '@educi/types';
import { AssessmentPortfolioError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentPortfolioService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getPortfolio(schoolId: string, id: string): Promise<Portfolio> {
    const item = await this.repo.getPortfolio(id, schoolId);
    if (!item) throw new AssessmentPortfolioError(id);
    return item;
  }
  async listPortfolios(schoolId: string, filters?: Record<string, unknown>): Promise<Portfolio[]> {
    return this.repo.listPortfolios(schoolId, filters);
  }
  async createPortfolio(schoolId: string, data: PortfolioCreate): Promise<Portfolio> {
    return this.repo.createPortfolio({ ...data, school_id: schoolId } as any);
  }
  async updatePortfolio(schoolId: string, id: string, data: Partial<PortfolioCreate>): Promise<Portfolio> {
    const existing = await this.repo.getPortfolio(id, schoolId);
    if (!existing) throw new AssessmentPortfolioError(id);
    return this.repo.updatePortfolio(id, schoolId, data as any);
  }
  async deletePortfolio(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPortfolio(id, schoolId);
    if (!existing) throw new AssessmentPortfolioError(id);
    return this.repo.deletePortfolio(id, schoolId);
  }
}
