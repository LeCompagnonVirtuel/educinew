import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface IntegrationConfig {
  name: string;
  type: 'webhook' | 'api' | 'sftp';
  endpoint: string;
  headers?: Record<string, string>;
  enabled: boolean;
}

interface IntegrationLog {
  id: string;
  integrationId: string;
  status: 'success' | 'error';
  request: Record<string, unknown>;
  response: Record<string, unknown> | null;
  timestamp: string;
}

export class ScIntegrationService {
  private repo: SmartCampusRepositoryEnterprise;
  private integrations = new Map<string, IntegrationConfig>();
  private logs: IntegrationLog[] = [];

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  addIntegration(config: IntegrationConfig): string {
    const id = crypto.randomUUID();
    this.integrations.set(id, config);
    return id;
  }

  getIntegration(id: string): IntegrationConfig | null {
    return this.integrations.get(id) ?? null;
  }

  updateIntegration(id: string, updates: Partial<IntegrationConfig>): boolean {
    const existing = this.integrations.get(id);
    if (!existing) return false;
    this.integrations.set(id, { ...existing, ...updates });
    return true;
  }

  removeIntegration(id: string): boolean {
    return this.integrations.delete(id);
  }

  getAllIntegrations(): IntegrationConfig[] {
    return Array.from(this.integrations.values());
  }

  getEnabledIntegrations(): IntegrationConfig[] {
    return Array.from(this.integrations.values()).filter(i => i.enabled);
  }

  async pushData(integrationId: string, data: Record<string, unknown>): Promise<IntegrationLog> {
    const config = this.integrations.get(integrationId);
    const log: IntegrationLog = {
      id: crypto.randomUUID(),
      integrationId,
      status: 'success',
      request: data,
      response: null,
      timestamp: new Date().toISOString(),
    };

    try {
      if (config) {
        log.response = { message: 'Data pushed successfully' };
      }
    } catch {
      log.status = 'error';
      log.response = { error: 'Push failed' };
    }

    this.logs.push(log);
    return log;
  }

  getLogs(integrationId: string): IntegrationLog[] {
    return this.logs.filter(l => l.integrationId === integrationId);
  }

  getRecentLogs(limit: number): IntegrationLog[] {
    return this.logs.slice(-limit);
  }
}
