import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CaseAssignment {
  id: string;
  school_id: string;
  assignment_number: string;
  case_id: string;
  case_type: 'safeguarding' | 'child_protection' | 'counseling' | 'wellbeing' | 'disciplinary';
  assigned_to: string;
  assigned_by: string;
  role: 'lead' | 'support' | 'observer' | 'external';
  status: 'active' | 'completed' | 'reassigned' | 'withdrawn';
  assignment_date: string;
  completion_date?: string;
  workload_capacity: number;
  current_cases: number;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateCaseAssignment {
  case_id: string;
  case_type: 'safeguarding' | 'child_protection' | 'counseling' | 'wellbeing' | 'disciplinary';
  assigned_to: string;
  assigned_by: string;
  role: 'lead' | 'support' | 'observer' | 'external';
  workload_capacity?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCaseAssignment {
  status?: string;
  role?: string;
  workload_capacity?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class CaseAssignmentService {
  private readonly TABLE = 'case_assignments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CaseAssignment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CaseAssignment | null> {
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

  async create(schoolId: string, assignment: CreateCaseAssignment): Promise<CaseAssignment> {
    const assignmentNumber = `CA-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        assignment_number: assignmentNumber,
        ...assignment,
        status: 'active',
        assignment_date: new Date().toISOString(),
        workload_capacity: assignment.workload_capacity || 10,
        current_cases: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, assignment: UpdateCaseAssignment): Promise<CaseAssignment> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...assignment, updated_at: new Date().toISOString() })
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

  async reassign(schoolId: string, id: string, newAssignee: string): Promise<CaseAssignment> {
    return this.update(schoolId, id, {
      status: 'reassigned',
      assigned_to: newAssignee,
    });
  }

  async getByAssignee(schoolId: string, assigneeId: string): Promise<CaseAssignment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('assigned_to', assigneeId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActiveByAssignee(schoolId: string, assigneeId: string): Promise<CaseAssignment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('assigned_to', assigneeId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCase(schoolId: string, caseId: string): Promise<CaseAssignment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('case_id', caseId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getAvailableStaff(schoolId: string): Promise<{ staff_id: string; current_load: number; capacity: number; available: boolean }[]> {
    const assignments = await this.getAll(schoolId);
    const staffMap = new Map<string, { current_load: number; capacity: number }>();

    assignments
      .filter((a) => a.status === 'active')
      .forEach((a) => {
        const existing = staffMap.get(a.assigned_to) || { current_load: 0, capacity: a.workload_capacity };
        staffMap.set(a.assigned_to, { ...existing, current_load: existing.current_load + 1 });
      });

    return Array.from(staffMap.entries()).map(([staff_id, data]) => ({
      staff_id,
      current_load: data.current_load,
      capacity: data.capacity,
      available: data.current_load < data.capacity,
    }));
  }

  async getOverloaded(schoolId: string): Promise<CaseAssignment[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;

    const staffLoads = new Map<string, number>();
    (data || []).forEach((a) => {
      staffLoads.set(a.assigned_to, (staffLoads.get(a.assigned_to) || 0) + 1);
    });

    return (data || []).filter((a) => {
      const load = staffLoads.get(a.assigned_to) || 0;
      return load > a.workload_capacity;
    });
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    completed: number;
    reassigned: number;
    averageWorkload: number;
  }> {
    const assignments = await this.getAll(schoolId);
    const active = assignments.filter((a) => a.status === 'active');

    return {
      total: assignments.length,
      active: active.length,
      completed: assignments.filter((a) => a.status === 'completed').length,
      reassigned: assignments.filter((a) => a.status === 'reassigned').length,
      averageWorkload: active.length > 0
        ? active.reduce((sum, a) => sum + a.current_cases, 0) / active.length
        : 0,
    };
  }
}
