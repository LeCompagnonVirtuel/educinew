import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface HealthSimulation {
  id: string;
  school_id: string;
  simulation_number: string;
  simulation_type: 'emergency_drill' | 'scenario' | 'stress_test' | 'what_if' | 'predictive';
  scenario: SimulationScenario;
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'cancelled';
  scheduled_date?: string;
  started_at?: string;
  completed_at?: string;
  participants: SimulationParticipant[];
  results?: SimulationResults;
  lessons_learned: string[];
  improvement_actions: string[];
  created_by: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SimulationScenario {
  name: string;
  description: string;
  type: string;
  parameters: Record<string, unknown>;
  duration_minutes: number;
  location?: string;
}

export interface SimulationParticipant {
  id: string;
  staff_id: string;
  name: string;
  role: string;
  response_time?: number;
  performance_score?: number;
  feedback?: string;
}

export interface SimulationResults {
  overall_score: number;
  response_time_average: number;
  tasks_completed: number;
  tasks_total: number;
  critical_gaps: string[];
  strengths: string[];
  recommendations: string[];
}

export interface CreateHealthSimulation {
  simulation_type: 'emergency_drill' | 'scenario' | 'stress_test' | 'what_if' | 'predictive';
  scenario: SimulationScenario;
  scheduled_date?: string;
  created_by: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateHealthSimulation {
  status?: string;
  scheduled_date?: string;
  started_at?: string;
  completed_at?: string;
  participants?: SimulationParticipant[];
  results?: SimulationResults;
  lessons_learned?: string[];
  improvement_actions?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SimulationService {
  private readonly TABLE = 'health_simulations';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<HealthSimulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<HealthSimulation | null> {
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

  async create(schoolId: string, simulation: CreateHealthSimulation): Promise<HealthSimulation> {
    const simulationNumber = `SIM-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        simulation_number: simulationNumber,
        ...simulation,
        status: 'draft',
        participants: [],
        lessons_learned: [],
        improvement_actions: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, simulation: UpdateHealthSimulation): Promise<HealthSimulation> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...simulation, updated_at: new Date().toISOString() })
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

  async start(schoolId: string, id: string): Promise<HealthSimulation> {
    return this.update(schoolId, id, {
      status: 'running',
      started_at: new Date().toISOString(),
    });
  }

  async complete(schoolId: string, id: string, results: SimulationResults, lessonsLearned: string[]): Promise<HealthSimulation> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      results,
      lessons_learned: lessonsLearned,
    });
  }

  async getByType(schoolId: string, simulationType: string): Promise<HealthSimulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('simulation_type', simulationType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getCompleted(schoolId: string): Promise<HealthSimulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUpcoming(schoolId: string): Promise<HealthSimulation[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['draft', 'scheduled'])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    completed: number;
    upcoming: number;
    averageScore: number;
    averageResponseTime: number;
    totalParticipants: number;
  }> {
    const simulations = await this.getAll(schoolId);
    const completed = simulations.filter((s) => s.status === 'completed' && s.results);

    return {
      total: simulations.length,
      completed: completed.length,
      upcoming: simulations.filter((s) => ['draft', 'scheduled'].includes(s.status)).length,
      averageScore: completed.length > 0
        ? completed.reduce((sum, s) => sum + (s.results?.overall_score || 0), 0) / completed.length
        : 0,
      averageResponseTime: completed.length > 0
        ? completed.reduce((sum, s) => sum + (s.results?.response_time_average || 0), 0) / completed.length
        : 0,
      totalParticipants: simulations.reduce((sum, s) => sum + s.participants.length, 0),
    };
  }
}
