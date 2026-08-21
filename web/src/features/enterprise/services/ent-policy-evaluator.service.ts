// Enterprise Platform Service - PolicyEvaluator
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PolicyEvaluator, PolicyEvaluatorCreate } from '@educi/types';
import { EntPolicyEvaluatorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPolicyEvaluatorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPolicyEvaluator(schoolId: string, id: string): Promise<PolicyEvaluator> {
    const item = await this.repo.findPolicyEvaluatorById(schoolId, id);
    if (!item) throw new EntPolicyEvaluatorNotFoundError(id);
    return item;
  }
  async listPolicyEvaluators(schoolId: string, filters?: Record<string, unknown>): Promise<PolicyEvaluator[]> {
    return this.repo.findAllPolicyEvaluators(schoolId, filters);
  }
  async createPolicyEvaluator(schoolId: string, data: PolicyEvaluatorCreate): Promise<PolicyEvaluator> {
    return this.repo.createPolicyEvaluator(schoolId, data);
  }
  async updatePolicyEvaluator(schoolId: string, id: string, data: Partial<PolicyEvaluatorCreate>): Promise<PolicyEvaluator> {
    const existing = await this.repo.findPolicyEvaluatorById(schoolId, id);
    if (!existing) throw new EntPolicyEvaluatorNotFoundError(id);
    return this.repo.updatePolicyEvaluator(schoolId, id, data);
  }
  async deletePolicyEvaluator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPolicyEvaluatorById(schoolId, id);
    if (!existing) throw new EntPolicyEvaluatorNotFoundError(id);
    return this.repo.deletePolicyEvaluator(schoolId, id);
  }
  async countPolicyEvaluators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPolicyEvaluators(schoolId, filters);
  }
}
