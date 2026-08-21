import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafetyTwin {
  id: string;
  school_id: string;
  twin_name: string;
  scope: 'campus' | 'building' | 'zone';
  scope_id?: string;
  status: 'active' | 'inactive' | 'calibrating';
  last_sync_at: string;
  safety_state: SafetyState;
  risk_zones: RiskZone[];
  access_patterns: AccessPattern[];
  incidents_history: IncidentSnapshot[];
  alerts: SafetyTwinAlert[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SafetyState {
  overall_risk: number;
  access_control_score: number;
  incident_frequency: number;
  emergency_readiness: number;
  timestamp: string;
}

export interface RiskZone {
  id: string;
  zone_name: string;
  risk_level: 'low' | 'moderate' | 'high';
  risk_score: number;
  factors: string[];
}

export interface AccessPattern {
  id: string;
  time_range: string;
  entry_count: number;
  exit_count: number;
  anomalies: number;
}

export interface IncidentSnapshot {
  date: string;
  type: string;
  severity: number;
  resolved: boolean;
}

export interface SafetyTwinAlert {
  id: string;
  alert_type: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  message: string;
  zone?: string;
  created_at: string;
}

export interface CreateSafetyTwin {
  twin_name: string;
  scope: 'campus' | 'building' | 'zone';
  scope_id?: string;
  safety_state: SafetyState;
  metadata?: Record<string, unknown>;
}

export interface UpdateSafetyTwin {
  twin_name?: string;
  status?: string;
  last_sync_at?: string;
  safety_state?: SafetyState;
  risk_zones?: RiskZone[];
  access_patterns?: AccessPattern[];
  incidents_history?: IncidentSnapshot[];
  alerts?: SafetyTwinAlert[];
  metadata?: Record<string, unknown>;
}

export class SafetyTwinService {
  private readonly TABLE = 'safety_twins';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafetyTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafetyTwin | null> {
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

  async create(schoolId: string, twin: CreateSafetyTwin): Promise<SafetyTwin> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...twin,
        status: 'active',
        last_sync_at: new Date().toISOString(),
        risk_zones: [],
        access_patterns: [],
        incidents_history: [],
        alerts: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, twin: UpdateSafetyTwin): Promise<SafetyTwin> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...twin, updated_at: new Date().toISOString() })
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

  async sync(schoolId: string, id: string, state: SafetyState): Promise<SafetyTwin> {
    return this.update(schoolId, id, {
      safety_state: state,
      last_sync_at: new Date().toISOString(),
    });
  }

  async getByScope(schoolId: string, scope: string): Promise<SafetyTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('scope', scope)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHighRiskZones(schoolId: string): Promise<SafetyTwin[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;

    return (data || []).filter((t) =>
      t.risk_zones.some((z) => z.risk_level === 'high')
    );
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    withAlerts: number;
    highRiskZones: number;
    averageRiskScore: number;
  }> {
    const twins = await this.getAll(schoolId);
    const active = twins.filter((t) => t.status === 'active');
    const allRiskZones = twins.flatMap((t) => t.risk_zones);

    return {
      total: twins.length,
      active: active.length,
      withAlerts: twins.filter((t) => t.alerts.length > 0).length,
      highRiskZones: allRiskZones.filter((z) => z.risk_level === 'high').length,
      averageRiskScore: active.length > 0
        ? active.reduce((sum, t) => sum + t.safety_state.overall_risk, 0) / active.length
        : 0,
    };
  }
}
