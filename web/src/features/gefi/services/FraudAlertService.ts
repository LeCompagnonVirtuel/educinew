import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FraudAlert {
  id: string;
  school_id: string;
  alert_number: string;
  transaction_id?: string;
  user_id?: string;
  alert_type: 'velocity' | 'amount' | 'location' | 'time' | 'pattern' | 'manual';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  evidence: Record<string, unknown>;
  risk_score: number;
  status: 'open' | 'acknowledged' | 'investigating' | 'resolved' | 'dismissed';
  assigned_to?: string;
  assigned_at?: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolution?: string;
  resolved_by?: string;
  resolved_at?: string;
  is_auto_generated: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateFraudAlert {
  transaction_id?: string;
  user_id?: string;
  alert_type: 'velocity' | 'amount' | 'location' | 'time' | 'pattern' | 'manual';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  evidence: Record<string, unknown>;
  risk_score: number;
  is_auto_generated?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateFraudAlert {
  status?: string;
  assigned_to?: string;
  acknowledged_by?: string;
  resolution?: string;
  resolved_by?: string;
  metadata?: Record<string, unknown>;
}

export class FraudAlertService {
  private readonly TABLE = 'fraud_alerts';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<FraudAlert | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, alert: CreateFraudAlert): Promise<FraudAlert> {
    const alertNumber = `FA-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        alert_number: alertNumber,
        ...alert,
        is_auto_generated: alert.is_auto_generated ?? false,
        status: 'open',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, alert: UpdateFraudAlert): Promise<FraudAlert> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...alert, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async acknowledge(schoolId: string, id: string, acknowledgedBy: string): Promise<FraudAlert> {
    return this.update(schoolId, id, {
      status: 'acknowledged',
      acknowledged_by: acknowledgedBy,
      acknowledged_at: new Date().toISOString(),
    });
  }

  async assign(schoolId: string, id: string, assignedTo: string): Promise<FraudAlert> {
    return this.update(schoolId, id, {
      status: 'investigating',
      assigned_to: assignedTo,
      assigned_at: new Date().toISOString(),
    });
  }

  async resolve(schoolId: string, id: string, resolution: string, resolvedBy: string): Promise<FraudAlert> {
    return this.update(schoolId, id, {
      status: 'resolved',
      resolution,
      resolved_by: resolvedBy,
      resolved_at: new Date().toISOString(),
    });
  }

  async dismiss(schoolId: string, id: string): Promise<FraudAlert> {
    return this.update(schoolId, id, { status: 'dismissed' });
  }

  async getByStatus(schoolId: string, status: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOpen(schoolId: string): Promise<FraudAlert[]> {
    return this.getByStatus(schoolId, 'open');
  }

  async getHighPriority(schoolId: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('severity', ['high', 'critical'])
      .in('status', ['open', 'acknowledged', 'investigating'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, alertType: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('alert_type', alertType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByUser(schoolId: string, userId: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{ total: number; open: number; resolved: number; criticalRate: number; averageRiskScore: number }> {
    const alerts = await this.getAll(schoolId);
    const open = alerts.filter((a) => ['open', 'acknowledged', 'investigating'].includes(a.status)).length;
    const resolved = alerts.filter((a) => a.status === 'resolved').length;
    const criticalRate = alerts.length > 0 ? (alerts.filter((a) => a.severity === 'critical').length / alerts.length) * 100 : 0;
    const averageRiskScore = alerts.length > 0 ? alerts.reduce((sum, a) => sum + a.risk_score, 0) / alerts.length : 0;

    return { total: alerts.length, open, resolved, criticalRate, averageRiskScore };
  }

  async getByDateRange(schoolId: string, startDate: string, endDate: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }
}
