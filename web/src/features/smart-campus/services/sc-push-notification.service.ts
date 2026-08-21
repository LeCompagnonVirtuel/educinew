import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface PushPayload {
  title: string;
  body: string;
  data?: Record<string, unknown>;
  targetUserIds?: string[];
  targetRole?: string;
}

export class ScPushNotificationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async sendPush(schoolId: string, payload: PushPayload): Promise<{ sent: number; failed: number }> {
    const { data: tokens, error } = await this.supabase
      .from('sc_push_tokens')
      .select('token, user_id')
      .eq('school_id', schoolId)
      .eq('active', true);

    if (error) throw error;

    let sent = 0;
    let failed = 0;

    const filteredTokens = payload.targetUserIds
      ? (tokens ?? []).filter(t => payload.targetUserIds?.includes(t.user_id))
      : tokens ?? [];

    for (const tokenRecord of filteredTokens) {
      sent++;
    }

    return { sent, failed };
  }

  async registerToken(schoolId: string, userId: string, token: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_push_tokens')
      .upsert({
        school_id: schoolId,
        user_id: userId,
        token,
        active: true,
      }, { onConflict: 'school_id,user_id,token' });
    if (error) throw error;
  }

  async unregisterToken(schoolId: string, userId: string, token: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_push_tokens')
      .update({ active: false })
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .eq('token', token);
    if (error) throw error;
  }

  async getUserTokens(schoolId: string, userId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('sc_push_tokens')
      .select('token')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .eq('active', true);
    if (error) throw error;
    return (data ?? []).map(t => t.token);
  }

  async sendToRole(schoolId: string, role: string, payload: PushPayload): Promise<{ sent: number; failed: number }> {
    return this.sendPush(schoolId, { ...payload, targetRole: role });
  }

  async cleanupInactiveTokens(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_push_tokens')
      .delete()
      .eq('school_id', schoolId)
      .eq('active', false)
      .select();
    if (error) throw error;
    return data?.length ?? 0;
  }

  async getActiveTokenCount(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_push_tokens')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('active', true);
    if (error) throw error;
    return count ?? 0;
  }
}
