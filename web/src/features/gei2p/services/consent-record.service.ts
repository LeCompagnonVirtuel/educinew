import { SupabaseClient } from '@supabase/supabase-js';
import { ConsentService, Consent } from './gei2p-governance-consent.service';

export class InteroperabilityConsentRecordService {
  private readonly consentService: ConsentService;

  constructor(supabase: SupabaseClient) {
    this.consentService = new ConsentService(supabase);
  }

  async listConsentRecords(schoolId: string, filters?: Record<string, unknown>): Promise<Consent[]> {
    return this.consentService.listEntities(schoolId, filters as { status?: string; consent_type?: string; user_id?: string; limit?: number; offset?: number });
  }

  async getConsentRecord(schoolId: string, id: string): Promise<Consent | null> {
    const entity = await this.consentService.getEntity(id);
    if (entity && entity.school_id === schoolId) return entity;
    return null;
  }

  async createConsentRecord(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Consent | null> {
    return this.consentService.createEntity({ ...data, school_id: schoolId, user_id: userId } as Parameters<ConsentService['createEntity']>[0]);
  }

  async updateConsentRecord(schoolId: string, id: string, data: Record<string, unknown>): Promise<Consent | null> {
    const entity = await this.consentService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return null;
    return this.consentService.updateEntity(id, data as Parameters<ConsentService['updateEntity']>[1]);
  }

  async deleteConsentRecord(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.consentService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return false;
    return this.consentService.deleteEntity(id);
  }
}
