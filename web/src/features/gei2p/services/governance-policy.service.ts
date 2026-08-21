import { SupabaseClient } from '@supabase/supabase-js';
import { PolicyService } from './gei2p-governance-policy.service';

export interface GovernancePolicy {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityGovernancePolicyService {
  private readonly policyService: PolicyService;

  constructor(supabase: SupabaseClient) {
    this.policyService = new PolicyService(supabase);
  }

  async listGovernancePolicies(schoolId: string, filters?: Record<string, unknown>): Promise<GovernancePolicy[]> {
    return this.policyService.listEntities(schoolId, filters) as Promise<GovernancePolicy[]>;
  }

  async getGovernancePolicy(schoolId: string, id: string): Promise<GovernancePolicy | null> {
    const entity = await this.policyService.getEntity(id);
    if (entity && (entity as GovernancePolicy).school_id === schoolId) return entity as GovernancePolicy;
    return null;
  }

  async createGovernancePolicy(schoolId: string, userId: string, data: Record<string, unknown>): Promise<GovernancePolicy | null> {
    return this.policyService.createEntity({ ...data, school_id: schoolId } as Parameters<PolicyService['createEntity']>[0]) as Promise<GovernancePolicy | null>;
  }

  async updateGovernancePolicy(schoolId: string, id: string, data: Record<string, unknown>): Promise<GovernancePolicy | null> {
    const entity = await this.policyService.getEntity(id);
    if (!entity || (entity as GovernancePolicy).school_id !== schoolId) return null;
    return this.policyService.updateEntity(id, data as Parameters<PolicyService['updateEntity']>[1]) as Promise<GovernancePolicy | null>;
  }

  async deleteGovernancePolicy(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.policyService.getEntity(id);
    if (!entity || (entity as GovernancePolicy).school_id !== schoolId) return false;
    return this.policyService.deleteEntity(id);
  }
}
