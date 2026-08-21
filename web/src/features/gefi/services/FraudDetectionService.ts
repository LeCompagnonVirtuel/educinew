import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FraudRule {
  id: string;
  school_id: string;
  rule_code: string;
  name: string;
  description: string;
  rule_type: 'threshold' | 'pattern' | 'velocity' | 'anomaly' | 'custom';
  conditions: Record<string, unknown>;
  action: 'flag' | 'block' | 'alert' | 'investigate';
  severity: 'low' | 'medium' | 'high' | 'critical';
  is_active: boolean;
  trigger_count: number;
  last_triggered_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FraudAlert {
  id: string;
  school_id: string;
  alert_number: string;
  rule_id?: string;
  transaction_id?: string;
  alert_type: 'suspicious_pattern' | 'velocity' | 'threshold' | 'anomaly' | 'manual';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: Record<string, unknown>;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive' | 'confirmed';
  assigned_to?: string;
  assigned_at?: string;
  resolution?: string;
  resolved_by?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateFraudRule {
  name: string;
  description: string;
  rule_type: 'threshold' | 'pattern' | 'velocity' | 'anomaly' | 'custom';
  conditions: Record<string, unknown>;
  action: 'flag' | 'block' | 'alert' | 'investigate';
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, unknown>;
}

export interface UpdateFraudRule {
  name?: string;
  description?: string;
  conditions?: Record<string, unknown>;
  action?: string;
  severity?: string;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export class FraudDetectionService {
  private readonly RULES_TABLE = 'fraud_rules';
  private readonly ALERTS_TABLE = 'fraud_alerts';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllRules(schoolId: string): Promise<FraudRule[]> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getRuleById(schoolId: string, id: string): Promise<FraudRule | null> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createRule(schoolId: string, rule: CreateFraudRule): Promise<FraudRule> {
    const ruleCode = `FR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .insert({
        rule_code: ruleCode,
        ...rule,
        is_active: true,
        trigger_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateRule(schoolId: string, id: string, rule: UpdateFraudRule): Promise<FraudRule> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .update({ ...rule, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.RULES_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async getAllAlerts(schoolId: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.ALERTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getAlertById(schoolId: string, id: string): Promise<FraudAlert | null> {
    const { data, error } = await this.supabase
      .from(this.ALERTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createAlert(schoolId: string, alert: Omit<FraudAlert, 'id' | 'alert_number' | 'created_at' | 'updated_at' | 'school_id'>): Promise<FraudAlert> {
    const alertNumber = `FA-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.ALERTS_TABLE)
      .insert({
        ...alert,
        alert_number: alertNumber,
        status: 'open',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAlert(schoolId: string, id: string, updates: Partial<FraudAlert>): Promise<FraudAlert> {
    const { data, error } = await this.supabase
      .from(this.ALERTS_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.ALERTS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async resolveAlert(schoolId: string, id: string, resolution: string, resolvedBy: string): Promise<FraudAlert> {
    return this.updateAlert(schoolId, id, {
      status: 'resolved',
      resolution,
      resolved_by: resolvedBy,
      resolved_at: new Date().toISOString(),
    });
  }

  async markFalsePositive(schoolId: string, id: string, resolvedBy: string): Promise<FraudAlert> {
    return this.updateAlert(schoolId, id, {
      status: 'false_positive',
      resolved_by: resolvedBy,
      resolved_at: new Date().toISOString(),
    });
  }

  async getOpenAlerts(schoolId: string): Promise<FraudAlert[]> {
    const { data, error } = await this.supabase
      .from(this.ALERTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'open')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActiveRules(schoolId: string): Promise<FraudRule[]> {
    const { data, error } = await this.supabase
      .from(this.RULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getAlertStats(schoolId: string): Promise<{ total: number; open: number; resolved: number; falsePositives: number }> {
    const alerts = await this.getAllAlerts(schoolId);
    return {
      total: alerts.length,
      open: alerts.filter((a) => a.status === 'open').length,
      resolved: alerts.filter((a) => a.status === 'resolved').length,
      falsePositives: alerts.filter((a) => a.status === 'false_positive').length,
    };
  }
}
