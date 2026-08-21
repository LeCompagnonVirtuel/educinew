import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface AuditLogEntry {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export class ScAuditService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async log(schoolId: string, entry: Omit<AuditLogEntry, 'id' | 'created_at'>): Promise<AuditLogEntry> {
    const { data, error } = await this.supabase
      .from('sc_audit_logs')
      .insert({
        school_id: schoolId,
        user_id: entry.user_id,
        action: entry.action,
        table_name: entry.table_name,
        record_id: entry.record_id,
        old_data: entry.old_data,
        new_data: entry.new_data,
        ip_address: entry.ip_address,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getLogs(schoolId: string, filters?: { userId?: string; tableName?: string; startDate?: string; endDate?: string }): Promise<AuditLogEntry[]> {
    let query = this.supabase
      .from('sc_audit_logs')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (filters?.userId) query = query.eq('user_id', filters.userId);
    if (filters?.tableName) query = query.eq('table_name', filters.tableName);
    if (filters?.startDate) query = query.gte('created_at', filters.startDate);
    if (filters?.endDate) query = query.lte('created_at', filters.endDate);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async getLogsByRecord(schoolId: string, tableName: string, recordId: string): Promise<AuditLogEntry[]> {
    const { data, error } = await this.supabase
      .from('sc_audit_logs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('table_name', tableName)
      .eq('record_id', recordId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async getLogsByUser(schoolId: string, userId: string, limit: number): Promise<AuditLogEntry[]> {
    const { data, error } = await this.supabase
      .from('sc_audit_logs')
      .select('*')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  }

  async getActionStats(schoolId: string, startDate: string, endDate: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from('sc_audit_logs')
      .select('action')
      .eq('school_id', schoolId)
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    if (error) throw error;
    const stats: Record<string, number> = {};
    for (const row of data ?? []) {
      stats[row.action] = (stats[row.action] ?? 0) + 1;
    }
    return stats;
  }

  async getRecentLogs(schoolId: string, limit: number): Promise<AuditLogEntry[]> {
    const { data, error } = await this.supabase
      .from('sc_audit_logs')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  }

  async deleteLogsOlderThan(schoolId: string, olderThanDate: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_audit_logs')
      .delete()
      .eq('school_id', schoolId)
      .lt('created_at', olderThanDate)
      .select();
    if (error) throw error;
    return data?.length ?? 0;
  }
}
