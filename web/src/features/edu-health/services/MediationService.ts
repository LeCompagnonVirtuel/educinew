import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface MediationSession {
  id: string;
  school_id: string;
  session_number: string;
  case_id: string;
  case_type: 'bullying' | 'harassment' | 'conflict' | 'other';
  mediator_id: string;
  party_a_id: string;
  party_b_id: string;
  status: 'scheduled' | 'in_progress' | 'agreement_reached' | 'no_agreement' | 'cancelled';
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  ground_rules: string[];
  party_a_statements: string[];
  party_b_statements: string[];
  common_ground: string[];
  agreement?: MediationAgreement;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface MediationAgreement {
  id: string;
  terms: string[];
  signed_by: string[];
  signed_date: string;
  review_date?: string;
}

export interface CreateMediationSession {
  case_id: string;
  case_type: 'bullying' | 'harassment' | 'conflict' | 'other';
  mediator_id: string;
  party_a_id: string;
  party_b_id: string;
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  ground_rules?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateMediationSession {
  status?: string;
  party_a_statements?: string[];
  party_b_statements?: string[];
  common_ground?: string[];
  agreement?: MediationAgreement;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class MediationService {
  private readonly TABLE = 'mediation_sessions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<MediationSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('scheduled_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<MediationSession | null> {
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

  async create(schoolId: string, session: CreateMediationSession): Promise<MediationSession> {
    const sessionNumber = `MED-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        session_number: sessionNumber,
        ...session,
        status: 'scheduled',
        ground_rules: session.ground_rules || [],
        party_a_statements: [],
        party_b_statements: [],
        common_ground: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, session: UpdateMediationSession): Promise<MediationSession> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...session, updated_at: new Date().toISOString() })
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

  async reachAgreement(schoolId: string, id: string, agreement: MediationAgreement): Promise<MediationSession> {
    return this.update(schoolId, id, {
      status: 'agreement_reached',
      agreement,
    });
  }

  async noAgreement(schoolId: string, id: string): Promise<MediationSession> {
    return this.update(schoolId, id, {
      status: 'no_agreement',
    });
  }

  async getByCase(schoolId: string, caseId: string): Promise<MediationSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('case_id', caseId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByMediator(schoolId: string, mediatorId: string): Promise<MediationSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('mediator_id', mediatorId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUpcoming(schoolId: string): Promise<MediationSession[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'scheduled')
      .gte('scheduled_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    scheduled: number;
    agreementReached: number;
    noAgreement: number;
    successRate: number;
  }> {
    const sessions = await this.getAll(schoolId);
    const completed = sessions.filter((s) => ['agreement_reached', 'no_agreement'].includes(s.status));
    const agreements = sessions.filter((s) => s.status === 'agreement_reached');

    return {
      total: sessions.length,
      scheduled: sessions.filter((s) => s.status === 'scheduled').length,
      agreementReached: agreements.length,
      noAgreement: sessions.filter((s) => s.status === 'no_agreement').length,
      successRate: completed.length > 0 ? (agreements.length / completed.length) * 100 : 0,
    };
  }
}
