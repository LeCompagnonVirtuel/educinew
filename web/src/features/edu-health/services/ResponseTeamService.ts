import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ResponseTeam {
  id: string;
  school_id: string;
  team_name: string;
  team_type: 'safeguarding' | 'emergency' | 'wellbeing' | 'incident' | 'general';
  status: 'active' | 'inactive' | 'restructuring';
  lead_id: string;
  members: TeamMemberEntry[];
  contact_information: ContactInformation;
  meeting_schedule: string;
  last_meeting_date?: string;
  next_meeting_date?: string;
  protocols: string[];
  training_completed: boolean;
  last_training_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TeamMemberEntry {
  id: string;
  staff_id: string;
  name: string;
  role: string;
  responsibilities: string[];
  joined_date: string;
}

export interface ContactInformation {
  primary_phone: string;
  secondary_phone?: string;
  email: string;
  emergency_contact: string;
}

export interface CreateResponseTeam {
  team_name: string;
  team_type: 'safeguarding' | 'emergency' | 'wellbeing' | 'incident' | 'general';
  lead_id: string;
  members?: TeamMemberEntry[];
  contact_information: ContactInformation;
  meeting_schedule: string;
  protocols?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateResponseTeam {
  team_name?: string;
  status?: string;
  lead_id?: string;
  members?: TeamMemberEntry[];
  contact_information?: ContactInformation;
  meeting_schedule?: string;
  last_meeting_date?: string;
  next_meeting_date?: string;
  protocols?: string[];
  training_completed?: boolean;
  last_training_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ResponseTeamService {
  private readonly TABLE = 'response_teams';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ResponseTeam[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ResponseTeam | null> {
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

  async create(schoolId: string, team: CreateResponseTeam): Promise<ResponseTeam> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...team,
        status: 'active',
        members: team.members || [],
        protocols: team.protocols || [],
        training_completed: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, team: UpdateResponseTeam): Promise<ResponseTeam> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...team, updated_at: new Date().toISOString() })
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

  async addMember(schoolId: string, id: string, member: TeamMemberEntry): Promise<ResponseTeam> {
    const team = await this.getById(schoolId, id);
    if (!team) throw new Error('Team not found');

    return this.update(schoolId, id, {
      members: [...team.members, member],
    });
  }

  async removeMember(schoolId: string, id: string, memberId: string): Promise<ResponseTeam> {
    const team = await this.getById(schoolId, id);
    if (!team) throw new Error('Team not found');

    return this.update(schoolId, id, {
      members: team.members.filter((m) => m.id !== memberId),
    });
  }

  async getByType(schoolId: string, teamType: string): Promise<ResponseTeam[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('team_type', teamType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<ResponseTeam[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    totalMembers: number;
    trainingCompleted: number;
  }> {
    const teams = await this.getAll(schoolId);
    const active = teams.filter((t) => t.status === 'active');

    return {
      total: teams.length,
      active: active.length,
      totalMembers: teams.reduce((sum, t) => sum + t.members.length, 0),
      trainingCompleted: teams.filter((t) => t.training_completed).length,
    };
  }
}
