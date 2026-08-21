// Enterprise Platform Service - PolicyEvaluation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PolicyEvaluation, PolicyEvaluationCreate } from '@educi/types';
import { EntPolicyEvaluationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPolicyEvaluationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPolicyEvaluation(schoolId: string, id: string): Promise<PolicyEvaluation> {
    const item = await this.repo.findPolicyEvaluationById(schoolId, id);
    if (!item) throw new EntPolicyEvaluationNotFoundError(id);
    return item;
  }
  async listPolicyEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<PolicyEvaluation[]> {
    return this.repo.findAllPolicyEvaluations(schoolId, filters);
  }
  async createPolicyEvaluation(schoolId: string, data: PolicyEvaluationCreate): Promise<PolicyEvaluation> {
    return this.repo.createPolicyEvaluation(schoolId, data);
  }
  async updatePolicyEvaluation(schoolId: string, id: string, data: Partial<PolicyEvaluationCreate>): Promise<PolicyEvaluation> {
    const existing = await this.repo.findPolicyEvaluationById(schoolId, id);
    if (!existing) throw new EntPolicyEvaluationNotFoundError(id);
    return this.repo.updatePolicyEvaluation(schoolId, id, data);
  }
  async deletePolicyEvaluation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPolicyEvaluationById(schoolId, id);
    if (!existing) throw new EntPolicyEvaluationNotFoundError(id);
    return this.repo.deletePolicyEvaluation(schoolId, id);
  }
  async countPolicyEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPolicyEvaluations(schoolId, filters);
  }
}
