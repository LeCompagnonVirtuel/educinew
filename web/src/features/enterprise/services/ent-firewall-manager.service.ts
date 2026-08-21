// Enterprise Platform Service - FirewallManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FirewallManager, FirewallManagerCreate } from '@educi/types';
import { EntFirewallManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFirewallManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFirewallManager(schoolId: string, id: string): Promise<FirewallManager> {
    const item = await this.repo.findFirewallManagerById(schoolId, id);
    if (!item) throw new EntFirewallManagerNotFoundError(id);
    return item;
  }
  async listFirewallManagers(schoolId: string, filters?: Record<string, unknown>): Promise<FirewallManager[]> {
    return this.repo.findAllFirewallManagers(schoolId, filters);
  }
  async createFirewallManager(schoolId: string, data: FirewallManagerCreate): Promise<FirewallManager> {
    return this.repo.createFirewallManager(schoolId, data);
  }
  async updateFirewallManager(schoolId: string, id: string, data: Partial<FirewallManagerCreate>): Promise<FirewallManager> {
    const existing = await this.repo.findFirewallManagerById(schoolId, id);
    if (!existing) throw new EntFirewallManagerNotFoundError(id);
    return this.repo.updateFirewallManager(schoolId, id, data);
  }
  async deleteFirewallManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFirewallManagerById(schoolId, id);
    if (!existing) throw new EntFirewallManagerNotFoundError(id);
    return this.repo.deleteFirewallManager(schoolId, id);
  }
  async countFirewallManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFirewallManagers(schoolId, filters);
  }
}
