import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiLoadBalancer, AiLoadBalancerQuery, AiLoadBalancerCreate, AiLoadBalancerUpdate } from '@educi/types';
import { AiLoadBalancerNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiLoadBalancerService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getLoadBalancer(schoolId: string, id: string): Promise<AiLoadBalancer> {
    const loadBalancer = await this.repo.findById(schoolId, id);
    if (!loadBalancer) throw new AiLoadBalancerNotFoundError(id);
    return loadBalancer;
  }

  async listLoadBalancers(schoolId: string, query: AiLoadBalancerQuery): Promise<AiLoadBalancer[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createLoadBalancer(schoolId: string, data: AiLoadBalancerCreate): Promise<AiLoadBalancer> {
    return this.repo.create(schoolId, data);
  }

  async updateLoadBalancer(schoolId: string, id: string, data: AiLoadBalancerUpdate): Promise<AiLoadBalancer> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiLoadBalancerNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
